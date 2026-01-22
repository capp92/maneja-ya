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
  
      // Si pasa a mobile, mostrar todos los paneles (vertical)
      if (window.innerWidth <= 768) {
        enableMobilePanels();
      }
    });
  
    /* ===========================
       TABS DE MODELOS
       =========================== */
  
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
  
    const isMobile = () => window.innerWidth <= 768;
  
    const setActiveButton = (activeBtn) => {
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-selected", "true");
    };
  
    const enableMobilePanels = () => {
      // En mobile: se ven TODAS las cards verticalmente (no se ocultan)
      tabPanels.forEach((panel) => {
        panel.classList.add("active");
        panel.removeAttribute("hidden");
      });
    };
  
    // Inicialización mobile
    if (isMobile()) {
      enableMobilePanels();
    }
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const targetPanel = document.getElementById(targetId);
  
        // En mobile: solo anclar/scroll; NO ocultar panels
        if (isMobile()) {
          setActiveButton(button);
          if (targetPanel) {
            targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          return;
        }
  
        // Desktop: comportamiento normal de tabs (mostrar uno, ocultar otros)
        setActiveButton(button);
  
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
  