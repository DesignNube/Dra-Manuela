/* =========================================================================
   Dra. Manuela Murillo H — script.js
   Vanilla JS · menú móvil, acordeón FAQ, galería y animaciones de scroll
   ========================================================================= */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. Galería de casos (Antes / Después) — generada dinámicamente
     ---------------------------------------------------------------------- */
  var CASES = [
    { n: "Caso 1", desc: "Diseño de Sonrisa · vista frontal", img: "caso-1.jpg" },
    { n: "Caso 2", desc: "Carillas en porcelana",          img: "caso-2.jpg" },
    { n: "Caso 3", desc: "Rehabilitación estética",         img: "caso3.jpeg" },
    { n: "Caso 4", desc: "Diseño armónico · vistas laterales", img: "caso-4.jpg" },
    { n: "Caso 5", desc: "Sonrisa natural y funcional",     img: "caso5.JPEG" },
    { n: "Caso 6", desc: "Transformación integral",         img: "caso6.JPEG" }
  ];

  var grid = document.getElementById("casesGrid");
  if (grid) {
    CASES.forEach(function (c) {
      var card = document.createElement("article");
      card.className = "case-card reveal";
      card.innerHTML =
        '<div class="case-img">' +
          '<span class="case-tag duo">Antes / Después</span>' +
          '<figure class="ph"><img src="images/' + c.img + '" alt="Antes y después — ' + c.desc + '" loading="lazy"></figure>' +
        '</div>' +
        '<div class="case-foot"><h3>' + c.n + '</h3><span>' + c.desc + '</span></div>';
      grid.appendChild(card);
    });
  }

  /* ----------------------------------------------------------------------
     2. Menú móvil (hamburguesa)
     ---------------------------------------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    // Cierra el menú al pulsar un enlace
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------------------
     3. Acordeón de Preguntas Frecuentes
     ---------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      // Cierra todos (comportamiento de un solo panel abierto)
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      // Abre el seleccionado si estaba cerrado
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ----------------------------------------------------------------------
     4. Animaciones de aparición al hacer scroll
     ---------------------------------------------------------------------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    // Marca como "reveal" los bloques destacados
    var revealEls = document.querySelectorAll(
      ".feature-card, .step-card, .price-card, .about-media, .about-copy, " +
      ".contact-card, .contact-map, .faq-item, .section-title, .section-lead"
    );
    revealEls.forEach(function (el) { el.classList.add("reveal"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ----------------------------------------------------------------------
     5. Sombra del header al hacer scroll
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 12 ? "0 6px 24px rgba(95,72,30,.08)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
