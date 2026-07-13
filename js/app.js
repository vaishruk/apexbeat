/* ============================================================
   ApexBeat — shared interactions
   Theme, nav, mobile menu, scroll reveals (GSAP), depth toggles,
   filters, tabs, guideline search, board review, case stacking.
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.remove("no-js");
  if (prefersReduced) document.documentElement.classList.add("no-motion");

  /* ---------- theme ---------- */
  const THEME_KEY = "cardiolumen-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(THEME_KEY);
  root.setAttribute("data-theme", saved || "light"); // default to the light (white) theme
  function toggleTheme() {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-theme-toggle]")) toggleTheme();
  });

  /* ---------- reliable in-page anchor scrolling ----------
     Intercept same-page hash links and jump precisely to the target,
     offset for the fixed nav. Native CSS smooth-scroll is deliberately
     NOT used: on this long, dynamic page it overshoots. We attempt a
     smooth animation, but always guarantee the exact final position. */
  function smoothScrollTo(targetY) {
    targetY = Math.max(0, Math.round(targetY));
    // Try native smooth (nice on capable browsers); guarantee the landing.
    try { window.scrollTo({ top: targetY, behavior: prefersReduced ? "auto" : "smooth" }); }
    catch (e) { /* older browsers */ }
    // Hard-set the final position on the next tick so it always lands exactly,
    // even if smooth scrolling is unavailable or interrupted.
    setTimeout(() => { if (Math.abs(window.scrollY - targetY) > 4) window.scrollTo(0, targetY); }, 520);
  }
  function anchorOffset(target) {
    const navH = parseInt(getComputedStyle(root).getPropertyValue("--nav-h"), 10) || 68;
    return target.getBoundingClientRect().top + window.scrollY - navH - 14;
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    const hi = href.indexOf("#");
    const hash = href.slice(hi);
    if (hash.length < 2) return;
    const path = href.slice(0, hi);
    const samePage = !path || path === "index.html" || location.pathname.endsWith(path);
    if (!samePage) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(anchorOffset(target));
    history.pushState(null, "", hash);
  });
  window.__clScrollTo = smoothScrollTo;
  window.__clAnchorOffset = anchorOffset;

  /* ---------- nav scroll state ---------- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- active section highlight in nav ---------- */
  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (sectionLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    sectionLinks.forEach((l) => {
      const id = l.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, l);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            sectionLinks.forEach((l) => l.classList.remove("active"));
            map.get(en.target)?.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, sec) => io.observe(sec));
  }

  /* ---------- GSAP scroll reveals ---------- */
  function initReveals() {
    const els = [...document.querySelectorAll(".gs-reveal")];
    if (!els.length) return;
    if (prefersReduced || !window.gsap) {
      els.forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    els.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0);
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.85, delay, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    /* case stacking scale */
    document.querySelectorAll(".case-card").forEach((card, i, arr) => {
      gsap.to(card, {
        scale: 1 - (arr.length - 1 - i) * 0.025,
        scrollTrigger: {
          trigger: card.closest(".case-card-wrap"),
          start: "top " + (90 + i * 6) + "px",
          endTrigger: ".cases-stack",
          end: "bottom 60%",
          scrub: true,
        },
      });
    });
  }
  if (document.readyState !== "loading") initReveals();
  else document.addEventListener("DOMContentLoaded", initReveals);
  window.addEventListener("load", () => window.ScrollTrigger && ScrollTrigger.refresh());

  /* ---------- curriculum + guideline filters ---------- */
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const targetSel = group.dataset.filterTarget;
    group.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        document.querySelectorAll(targetSel).forEach((card) => {
          const level = card.dataset.level || "";
          const cat = card.dataset.cat || "";
          const show = f === "all" || level === f || cat === f;
          card.classList.toggle("hidden", !show);
        });
      });
    });
  });

  /* ---------- guideline search ---------- */
  const gInput = document.querySelector("#guideSearch");
  if (gInput) {
    gInput.addEventListener("input", () => {
      const q = gInput.value.trim().toLowerCase();
      document.querySelectorAll(".guide-card").forEach((c) => {
        const hit = c.textContent.toLowerCase().includes(q);
        c.classList.toggle("hidden", q && !hit);
      });
    });
  }

  /* ---------- generic tabs (labs, etc.) ---------- */
  document.querySelectorAll("[data-tabs]").forEach((tabset) => {
    const tabs = [...tabset.querySelectorAll(".lab-tab")];
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const panelId = tab.dataset.tab;
        tabset.parentElement.querySelectorAll(".lab-panel").forEach((p) =>
          p.classList.toggle("active", p.dataset.panel === panelId)
        );
        window.dispatchEvent(new CustomEvent("tabchange", { detail: panelId }));
      });
    });
  });

  /* ---------- reveal buttons (labs, QOTD, cases) ---------- */
  document.addEventListener("click", (e) => {
    const rb = e.target.closest("[data-reveal]");
    if (rb) {
      const target = document.querySelector(rb.dataset.reveal);
      if (target) {
        target.classList.add("shown");
        rb.style.display = "none";
      }
    }
  });

  /* ---------- dynamic UI — bound at load AND re-bound after a module
       renders asynchronously (cl:module-rendered). Guards with data-bound
       so nothing double-binds. ---------- */
  const BM_KEY = "cardiolumen-bookmarks";
  const bookmarks = new Set(JSON.parse(localStorage.getItem(BM_KEY) || "[]"));

  function bindDynamic() {
    // knowledge-check / QOTD answers
    document.querySelectorAll("[data-quiz]:not([data-bound])").forEach((quiz) => {
      quiz.setAttribute("data-bound", "1");
      const correct = quiz.dataset.quiz;
      const expl = quiz.querySelector(".qotd-expl");
      quiz.querySelectorAll(".qotd-opt").forEach((opt) => {
        opt.addEventListener("click", () => {
          if (quiz.dataset.answered) return;
          quiz.dataset.answered = "1";
          quiz.querySelectorAll(".qotd-opt").forEach((o) => {
            if (o.dataset.key === correct) o.classList.add("correct");
            else if (o === opt) o.classList.add("wrong");
          });
          if (expl) expl.classList.add("shown");
        });
      });
    });

    // depth toggle (Resident / Advanced / Fellowship)
    const depthToggle = document.querySelector(".depth-toggle:not([data-bound])");
    if (depthToggle) {
      depthToggle.setAttribute("data-bound", "1");
      const scope = document.querySelector("[data-depth-scope]") || document.body;
      depthToggle.querySelectorAll(".depth-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          depthToggle.querySelectorAll(".depth-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          scope.classList.remove("depth-1", "depth-2", "depth-3");
          scope.classList.add("depth-" + btn.dataset.depth);
        });
      });
    }

    // module TOC scrollspy
    const tocLinks = [...document.querySelectorAll(".module-toc a:not([data-bound])")];
    if (tocLinks.length && "IntersectionObserver" in window) {
      const secMap = new Map();
      tocLinks.forEach((l) => {
        l.setAttribute("data-bound", "1");
        const sec = document.querySelector(l.getAttribute("href"));
        if (sec) secMap.set(sec, l);
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              document.querySelectorAll(".module-toc a").forEach((l) => l.classList.remove("active"));
              const link = secMap.get(en.target);
              if (link) link.classList.add("active");
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      secMap.forEach((_, sec) => io.observe(sec));
    }

    // bookmark buttons (local only)
    document.querySelectorAll("[data-bookmark]:not([data-bound])").forEach((b) => {
      b.setAttribute("data-bound", "1");
      const id = b.dataset.bookmark;
      if (bookmarks.has(id)) b.classList.add("on");
      b.addEventListener("click", (e) => {
        e.preventDefault();
        if (bookmarks.has(id)) { bookmarks.delete(id); b.classList.remove("on"); }
        else { bookmarks.add(id); b.classList.add("on"); }
        localStorage.setItem(BM_KEY, JSON.stringify([...bookmarks]));
      });
    });
  }
  bindDynamic();
  window.addEventListener("cl:module-rendered", bindDynamic);
})();
