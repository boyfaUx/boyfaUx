/* ==========================================================================
   PORTFOLIO BOYLINE FALL - MAIN JAVASCRIPT LOGIC
   Reference Design Behavior: Smooth scroll, active navbar state, mobile menu toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScrollSpy();
  initMobileMenu();
  initContactForm();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. Navbar Active Link & Scroll Spy
   -------------------------------------------------------------------------- */
function initNavbarScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let ticking = false;

  function updateActiveLink() {
    ticking = false;
    const scrollPosition = window.scrollY + 140;
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (!currentSectionId && window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) currentSectionId = lastSection.getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  });

  updateActiveLink();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggleBtn || !navMenu) return;

  navToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = navToggleBtn.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = navToggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

/* --------------------------------------------------------------------------
   3. Contact Form Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showFormMessage(formMessage, 'Veuillez remplir tous les champs.', 'error');
      return;
    }

    showFormMessage(formMessage, `Merci ${name} ! Votre message a bien été transmis.`, 'success');
    contactForm.reset();
  });
}

function showFormMessage(element, text, type) {
  if (!element) return;
  element.textContent = text;
  element.className = `form-message ${type}`;
  element.hidden = false;
}

/* --------------------------------------------------------------------------
   4. Dynamic Year
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
