// =========================
// GSAP Animations
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // GSAP/ScrollTrigger が読み込まれているか確認
  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Animation (onload)
  const heroTl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1.2 }
  });

  heroTl
    .from('[data-gsap="hero-text"]', {
      y: 30,
      opacity: 0,
      stagger: 0.3,
      delay: 0.2
    })
    .from('.p-hero__imageBox', {
      scale: 1.05,
      opacity: 0,
      duration: 1.5
    }, "-=0.8")
    .from('.p-hero__circle', {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 2
    }, "-=1");

  // 2. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('[data-gsap="reveal-up"]');
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });

  // 3. Hover Micro-interactions
  const cards = document.querySelectorAll(".c-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  });

  // Decorative circle movement on scroll
  gsap.to(".p-hero__circle--1", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: 100,
    x: 50
  });
  gsap.to(".p-hero__circle--2", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: -50,
    x: -30
  });
});

// =========================
// Accordion helper
// =========================
document.querySelectorAll('[data-accordion]').forEach((wrap) => {
  // detailsタグはネイティブで動くけど、「同時に1つだけ開く」をやるならこれ
  const items = wrap.querySelectorAll('details');
  items.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      items.forEach((other) => {
        if (other !== d) other.open = false;
      });
    });
  });
});

// =========================
// Services filter (optional)
// =========================
document.querySelectorAll(".p-services__filters").forEach((wrap) => {
  const buttons = wrap.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".p-services__item[data-tags]");

  if (!buttons.length || !cards.length) return;

  const setActive = (activeBtn) => {
    buttons.forEach((b) => {
      const isActive = b === activeBtn;
      b.classList.toggle("is-active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  const apply = (key) => {
    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "")
        .split(/\s+/)
        .filter(Boolean);
      const show = key === "all" ? true : tags.includes(key);
      card.style.display = show ? "" : "none";
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-filter");
      setActive(btn);
      apply(key);
    });
  });

  // init
  const initBtn =
    wrap.querySelector(".is-active[data-filter]") || wrap.querySelector("[data-filter]");
  if (initBtn) apply(initBtn.getAttribute("data-filter"));
});

// =========================
// Form helper: textarea count + invalid focus
// =========================
(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const ta = form.querySelector('textarea[name="message"]');
  const counter = form.querySelector("[data-count]");
  const MAX = 800;

  if (ta && counter) {
    const update = () => {
      const len = (ta.value || "").length;
      counter.textContent = `${len} / ${MAX}`;
      if (len > MAX) {
        counter.style.color = "crimson";
        ta.setCustomValidity(`ご相談内容は${MAX}文字以内で入力してください。`);
      } else {
        counter.style.color = "";
        ta.setCustomValidity("");
      }
    };
    ta.addEventListener("input", update);
    update();
  }

  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      const first = form.querySelector(":invalid");
      if (first) first.focus();
      form.classList.add("is-invalid");
    }
  });
})();
