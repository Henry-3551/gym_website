// Shared functionality for all pages

document.addEventListener('DOMContentLoaded', () => {
  // Menu Toggle
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuPanel = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const yearEl = document.getElementById('year');
  const desktopQuery = window.matchMedia('(min-width: 768px)');
  const backToTopBtn = document.querySelector('[data-back-to-top]');

  const setMenuState = (open) => {
    if (!menuToggle || !menuPanel) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuPanel.classList.toggle('hidden', !open);
    menuToggle.classList.toggle('is-open', open);
  };

  if (menuToggle && menuPanel) {
    menuToggle.addEventListener('click', () => {
      const open = menuPanel.classList.contains('hidden');
      setMenuState(open);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!desktopQuery.matches) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  // Back to Top Button
  const updateBackToTop = () => {
    if (!backToTopBtn) return;
    const isMobileViewport = window.innerWidth < 768;
    const shouldShow = isMobileViewport && window.scrollY > 120;
    backToTopBtn.classList.toggle('hidden', !shouldShow);
    backToTopBtn.classList.toggle('flex', shouldShow);
  };

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  window.addEventListener('resize', updateBackToTop);
  updateBackToTop();

  // Sync Menu for Responsive Design
  const syncMenu = () => {
    if (!menuPanel) return;
    if (desktopQuery.matches) {
      menuPanel.classList.remove('hidden');
      menuToggle?.setAttribute('aria-expanded', 'true');
      menuToggle?.classList.add('is-open');
    } else {
      menuPanel.classList.add('hidden');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.classList.remove('is-open');
    }
  };

  syncMenu();
  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', syncMenu);
  } else if (typeof desktopQuery.addListener === 'function') {
    desktopQuery.addListener(syncMenu);
  }

  // Update Year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Scroll Reveal for Sections
  const revealSections = document.querySelectorAll('main > section:not(:first-of-type)');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    revealSections.forEach((section) => sectionObserver.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add('is-visible'));
  }
});
