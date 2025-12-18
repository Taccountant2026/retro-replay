// /site.js (global)
// Requires pages to have: <div id="siteHeader"></div> and <div id="siteFooter"></div>

async function inject(id, url) {
  const el = document.getElementById(id);
  if (!el) return false;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    el.innerHTML = await res.text();
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function initCart() {
  if (window.RetroCart && typeof window.RetroCart.loadCart === "function") {
    window.RetroCart.loadCart();
  }
}

function initMobileNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primaryNav") || document.querySelector(".main-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

function initCookieBanner() {
  const COOKIE_KEY = "rr_cookie_consent"; // accepted | rejected
  const banner = document.getElementById("rrCookie");
  const accept = document.getElementById("rrCookieAccept");
  const reject = document.getElementById("rrCookieReject");
  if (!banner) return;

  const saved = localStorage.getItem(COOKIE_KEY);
  banner.classList.toggle("is-hidden", !!saved);

  accept?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    banner.classList.add("is-hidden");
  });

  reject?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    banner.classList.add("is-hidden");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // Inject partials first, so elements exist before wiring listeners
  await inject("siteHeader", "/partials/header.html");
  await inject("siteFooter", "/partials/footer.html");

  setYear();
  initCart();
  initMobileNav();
  initCookieBanner();
});
