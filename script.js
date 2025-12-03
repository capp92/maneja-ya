/* ======================================================
   SCRIPT.JS – Interacciones de la Landing Maneja Ya
   ====================================================== */

/* ===========================
   MENÚ HAMBURGUESA
   =========================== */

   document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    const body = document.body;
  
    const toggleMenu = () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
      body.style.overflow = expanded ? "auto" : "hidden";
    };
  
    menuToggle.addEventListener("click", toggleMenu);
  
    // Cerrar menú al hacer clic en un link (solo mobile)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) toggleMenu();
      });
    });
  
    // Cerrar menú al redimensionar (si pasa a desktop)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "auto";
      }
    });
  
    /* ===========================
       TABS DE MODELOS
       =========================== */
  
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
  
        // Desactivar todos los tabs
        tabButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        });
  
        // Activar tab clickeado
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
  
        // Mostrar panel correspondiente
        tabPanels.forEach((panel) => {
          if (panel.id === targetId) {
            panel.classList.add("active");
            panel.removeAttribute("hidden");
          } else {
            panel.classList.remove("active");
            panel.setAttribute("hidden", "true");
          }
        });
      });
    });
  });
  