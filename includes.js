async function inject(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(url, { cache: "no-store" });
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await inject("siteHeader", "/partials/header.html");
  await inject("siteFooter", "/partials/footer.html");

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Cart safe init
  if (window.RetroCart && typeof window.RetroCart.loadCart === "function") {
    window.RetroCart.loadCart();
  }

  // Mobile nav toggle (works with your CSS: .main-nav.is-open)
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primaryNav") || document.querySelector(".main-nav");
  if (btn && nav) {
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

  // Cookie banner (optional global)
  const COOKIE_KEY = "rr_cookie_consent";
  const banner = document.getElementById("rrCookie");
  const accept = document.getElementById("rrCookieAccept");
  const reject = document.getElementById("rrCookieReject");
  if (banner) {
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
});
