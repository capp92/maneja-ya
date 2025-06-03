document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Función para manejar la expansión/colapso
    const toggleAccordion = () => {
      const isActive = item.classList.contains('active');
      
      // Cerrar todos los items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Si el item clickeado no estaba activo, lo activamos
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    };

    // Click event
    question.addEventListener('click', toggleAccordion);

    // Keyboard event
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion();
      }
    });
  });

  // Hamburger Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');
  const body = document.body;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    body.style.overflow = isExpanded ? '' : 'hidden';
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // Cerrar menú al redimensionar la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      toggleMenu();
    }
  });
}); 