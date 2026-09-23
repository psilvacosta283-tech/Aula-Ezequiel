/* ============================================================
   PEDRO HENRIQUE — PORTFÓLIO
   Efeitos de scroll, parallax, contadores e tilt 3D
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. Título do hero: dividir em letras (animação keynote)
  --------------------------------------------------------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    let letterIndex = 0;
    el.textContent = "";
    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      [...word].forEach((ch) => {
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = ch;
        letter.style.setProperty("--i", letterIndex++);
        wordSpan.appendChild(letter);
      });
      el.appendChild(wordSpan);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });

  /* ---------------------------------------------------------
     2. Barra de progresso de scroll + navbar
  --------------------------------------------------------- */
  const progressBar = document.getElementById("progressBar");
  const nav = document.getElementById("nav");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
    nav.classList.toggle("scrolled", scrollTop > 40);

    // Parallax dos orbes de fundo (efeito de profundidade)
    if (!prefersReducedMotion) {
      document.querySelectorAll(".orb").forEach((orb) => {
        const speed = parseFloat(orb.dataset.speed || 0);
        const y = scrollTop * speed;
        orb.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    }

    // Destaque do link ativo no menu
    highlightActive();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------
     3. Link ativo conforme a seção visível
  --------------------------------------------------------- */
  const sections = [...document.querySelectorAll("section[id], header[id]")];
  const navAnchors = [...document.querySelectorAll(".nav-links a")];

  function highlightActive() {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let currentId = sections[0]?.id;
    sections.forEach((s) => {
      if (s.offsetTop <= pos) currentId = s.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
  }

  /* ---------------------------------------------------------
     4. Reveal ao rolar (fade + slide + DESFOQUE -> nitidez)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  revealEls.forEach((el) => {
    const delay = el.dataset.delay || 0;
    el.style.setProperty("--reveal-delay", delay + "ms");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------------
     5. Contadores animados (estatísticas)
  --------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll(".count").forEach((el) =>
    counterObserver.observe(el)
  );

  /* ---------------------------------------------------------
     6. Barras de habilidade animadas
  --------------------------------------------------------- */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.level + "%";
          barObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".bar span").forEach((bar) =>
    barObserver.observe(bar)
  );

  /* ---------------------------------------------------------
     7. Tilt 3D nos cards (segue o mouse) + brilho no card
  --------------------------------------------------------- */
  if (!prefersReducedMotion && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
      const strength = 6;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * strength * 2;
        const rotateX = -((y / rect.height) - 0.5) * strength * 2;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;

        // Posição do brilho radial (variáveis usadas no CSS ::after)
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
      });
    });
  }

  /* ---------------------------------------------------------
     8. Menu mobile
  --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  /* ---------------------------------------------------------
     9. Ano no rodapé
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* Estado inicial */
  onScroll();
})();
