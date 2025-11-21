// Retro Gaming Particle System - Floating particles with retro aesthetic
(function() {
  const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899'];
  const retroEmojis = ['🎮', '⭐', '◆', '◇', '▪', '▫', '●', '○', '✕', '✦'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 2;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = Math.random() * 0.5 + 0.3;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = Math.random() > 0.7 ? retroEmojis[Math.floor(Math.random() * retroEmojis.length)] : null;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 4;
      this.element = document.createElement('div');
      this.element.className = 'retro-particle';
      this.element.style.cssText = `
        position: fixed;
        left: ${this.x}px;
        top: ${this.y}px;
        width: ${this.size * 2}px;
        height: ${this.size * 2}px;
        background-color: ${this.color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        opacity: ${this.opacity};
        z-index: 1;
        font-size: ${this.size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform;
      `;
      if(this.shape) {
        this.element.textContent = this.shape;
        this.element.style.background = 'transparent';
      }
      document.body.appendChild(this.element);
    }

    update() {
      this.x += this.speedX;
      this.y -= this.speedY;
      this.opacity -= 0.004;
      this.rotation += this.rotationSpeed;
      
      this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg)`;
      this.element.style.opacity = this.opacity;
      
      return this.opacity > 0;
    }

    destroy() {
      if(this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }

  class ParticleSystem {
    constructor() {
      this.particles = [];
      this.active = true;
      this.emissionRate = 0.5;
      this.lastEmission = 0;
      this.init();
    }

    init() {
      // Emit particles on mouse movement
      document.addEventListener('mousemove', (e) => this.emitParticles(e.clientX, e.clientY));
      
      // Emit particles on click
      document.addEventListener('click', (e) => {
        for(let i = 0; i < 6; i++) {
          this.particles.push(new Particle(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20));
        }
      });

      // Emit particles on scroll
      window.addEventListener('scroll', () => {
        const x = Math.random() * window.innerWidth;
        const y = window.scrollY + Math.random() * 100;
        this.emitParticles(x, y);
      });

      this.animate();
    }

    emitParticles(x, y) {
      const now = Date.now();
      if(now - this.lastEmission > 50) {
        for(let i = 0; i < 2; i++) {
          const offsetX = (Math.random() - 0.5) * 30;
          const offsetY = (Math.random() - 0.5) * 30;
          this.particles.push(new Particle(x + offsetX, y + offsetY));
        }
        this.lastEmission = now;
      }
    }

    animate() {
      this.particles = this.particles.filter(p => p.update());
      if(this.active) {
        requestAnimationFrame(() => this.animate());
      }
    }

    destroy() {
      this.active = false;
      this.particles.forEach(p => p.destroy());
    }
  }

  // Initialize when DOM is ready
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.retroParticleSystem = new ParticleSystem();
    });
  } else {
    window.retroParticleSystem = new ParticleSystem();
  }
})();
