// Retro Gaming Particle System - Mobile-friendly + performance safe
(function () {
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899'];
  const EMOJIS = ['🎮', '⭐', '◆', '◇', '▪', '▫', '●', '○', '✕', '✦'];

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Heuristic: reduce effects on mobile/low-power devices
  const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  const isLowPower = (navigator && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || false;

  const PERF_MODE = prefersReducedMotion ? 'off' : (isCoarsePointer || isSmallScreen || isLowPower ? 'low' : 'full');

  // Tunables
  const SETTINGS = {
    off: {
      enabled: false
    },
    low: {
      enabled: true,
      maxParticles: 40,
      emitIntervalMs: 140,
      emitPerBurst: 1,
      clickBurst: 4,
      lifeMs: 1200
    },
    full: {
      enabled: true,
      maxParticles: 120,
      emitIntervalMs: 60,
      emitPerBurst: 2,
      clickBurst: 8,
      lifeMs: 1600
    }
  }[PERF_MODE];

  if (!SETTINGS.enabled) return;

  // Create a dedicated overlay layer (keeps DOM clean & z-index predictable)
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(layer);
  });

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }

  class Particle {
    constructor(x, y) {
      // Use fixed coordinates in viewport space
      this.x = x;
      this.y = y;

      this.size = rand(6, PERF_MODE === 'low' ? 10 : 14);
      this.vx = rand(-0.6, 0.6);
      this.vy = rand(-1.2, -0.4);
      this.opacity = rand(0.5, 0.95);
      this.rotation = rand(0, 360);
      this.rotationSpeed = rand(-2.5, 2.5);

      this.color = pick(COLORS);
      this.useEmoji = Math.random() > 0.78;
      this.emoji = this.useEmoji ? pick(EMOJIS) : null;

      this.birth = performance.now();
      this.life = SETTINGS.lifeMs;

      this.el = document.createElement('div');
      this.el.className = 'retro-particle';

      // Important: do NOT set left/top to x/y AND translate by x/y again.
      // We anchor at (0,0) and translate to particle position.
      this.el.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: ${this.size}px;
        height: ${this.size}px;
        border-radius: ${Math.random() > 0.5 ? '999px' : '3px'};
        background: ${this.useEmoji ? 'transparent' : this.color};
        color: ${this.color};
        opacity: ${this.opacity};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${Math.max(10, this.size)}px;
        line-height: 1;
        will-change: transform, opacity;
        transform: translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg);
      `;

      if (this.useEmoji) {
        this.el.textContent = this.emoji;
      }

      layer.appendChild(this.el);
    }

    update(now) {
      const age = now - this.birth;
      const t = Math.min(1, age / this.life);

      this.x += this.vx;
      this.y += this.vy;

      // float + slight drift
      this.vx *= 0.995;
      this.vy *= 0.998;

      // fade out
      const fade = 1 - t;
      const op = Math.max(0, this.opacity * fade);

      this.rotation += this.rotationSpeed;

      this.el.style.opacity = op.toFixed(3);
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;

      // remove when dead or off-screen
      if (t >= 1) return false;
      if (this.y < -40 || this.x < -40 || this.x > window.innerWidth + 40) return false;

      return true;
    }

    destroy() {
      if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }
  }

  class ParticleSystem {
    constructor() {
      this.particles = [];
      this.active = true;
      this.lastEmit = 0;
      this.lastMove = 0;

      // Bound handlers so destroy() can remove listeners
      this.onMove = this.onMove.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onScroll = this.onScroll.bind(this);

      this.init();
    }

    init() {
      // Mouse movement: only on fine pointer devices
      if (!isCoarsePointer) document.addEventListener('mousemove', this.onMove, { passive: true });

      // Click burst (works everywhere)
      document.addEventListener('click', this.onClick, { passive: true });

      // Scroll emission: very light, and using viewport coordinates (fixed layer)
      window.addEventListener('scroll', this.onScroll, { passive: true });

      this.animate();
    }

    emit(x, y, count) {
      // cap total particles
      const space = SETTINGS.maxParticles - this.particles.length;
      if (space <= 0) return;

      const n = Math.min(space, count);

      for (let i = 0; i < n; i++) {
        const ox = rand(-18, 18);
        const oy = rand(-18, 18);
        this.particles.push(new Particle(x + ox, y + oy));
      }
    }

    onMove(e) {
      const now = performance.now();

      // Extra throttle for fast movement
      if (now - this.lastMove < SETTINGS.emitIntervalMs) return;
      this.lastMove = now;

      this.emit(e.clientX, e.clientY, SETTINGS.emitPerBurst);
    }

    onClick(e) {
      this.emit(e.clientX, e.clientY, SETTINGS.clickBurst);
    }

    onScroll() {
      const now = performance.now();
      if (now - this.lastEmit < SETTINGS.emitIntervalMs * 2) return;
      this.lastEmit = now;

      // emit near bottom-right-ish so it feels ambient
      const x = window.innerWidth * rand(0.2, 0.9);
      const y = window.innerHeight * rand(0.2, 0.9);
      this.emit(x, y, 1);
    }

    animate() {
      if (!this.active) return;

      const now = performance.now();
      this.particles = this.particles.filter(p => p.update(now));

      requestAnimationFrame(() => this.animate());
    }

    destroy() {
      this.active = false;
      document.removeEventListener('mousemove', this.onMove);
      document.removeEventListener('click', this.onClick);
      window.removeEventListener('scroll', this.onScroll);

      this.particles.forEach(p => p.destroy());
      this.particles = [];
      if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
    }
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.retroParticleSystem = new ParticleSystem();
    });
  } else {
    window.retroParticleSystem = new ParticleSystem();
  }
})();
