// Hero Carousel for Index Page

document.addEventListener('DOMContentLoaded', () => {
  const heroSlides = [
    {
      src: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=900',
      alt: 'Black female athlete throwing punches at a heavy bag',
      label: 'Fight club',
      subtitle: 'Lekki boxing conditioning',
    },
    {
      src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
      alt: 'Two Black coaches guiding a barbell complex',
      label: 'Coach Ife + Dayo',
      subtitle: 'Victoria Island tactical lifts',
    },
    {
      src: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=900&q=80',
      alt: 'Black women hitting synchronized battle-rope intervals',
      label: 'Women who lift',
      subtitle: 'Ikoyi battle-rope nights',
    },
    {
      src: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=900',
      alt: 'Black accountability partners stretching after HIIT',
      label: 'Recovery circle',
      subtitle: 'Abuja Wuse II cool-down',
    },
  ];

  const heroImage = document.querySelector('[data-hero-image]');
  const heroLabel = document.querySelector('[data-hero-label]');
  const heroSubtitle = document.querySelector('[data-hero-subtitle]');
  const heroPrev = document.querySelector('[data-hero-prev]');
  const heroNext = document.querySelector('[data-hero-next]');
  const heroDotsContainer = document.querySelector('[data-hero-dots]');
  const reduceMotionQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let heroDots = [];
  let heroIndex = 0;
  let heroTimer;

  const shouldAutoplayHero = () => !reduceMotionQuery?.matches;

  const stopHeroAutoplay = () => {
    clearInterval(heroTimer);
    heroTimer = undefined;
  };

  const updateHeroSlide = (index) => {
    if (!heroImage || !heroLabel || !heroSubtitle) return;
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[heroIndex];
    heroImage.src = slide.src;
    heroImage.alt = slide.alt;
    heroLabel.textContent = slide.label;
    heroSubtitle.textContent = slide.subtitle;
    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('opacity-100', dotIndex === heroIndex);
      dot.classList.toggle('opacity-40', dotIndex !== heroIndex);
    });
  };

  const startHeroAutoplay = () => {
    stopHeroAutoplay();
    if (!shouldAutoplayHero()) return;
    heroTimer = window.setInterval(() => {
      updateHeroSlide(heroIndex + 1);
    }, 8000);
  };

  if (reduceMotionQuery?.addEventListener) {
    reduceMotionQuery.addEventListener('change', () => {
      if (shouldAutoplayHero()) {
        startHeroAutoplay();
      } else {
        stopHeroAutoplay();
      }
    });
  } else if (reduceMotionQuery?.addListener) {
    reduceMotionQuery.addListener(() => {
      if (shouldAutoplayHero()) {
        startHeroAutoplay();
      } else {
        stopHeroAutoplay();
      }
    });
  }

  if (heroImage && heroLabel && heroSubtitle) {
    if (heroDotsContainer) {
      heroDots = heroSlides.map((slide, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'h-2.5 w-2.5 rounded-full border border-white/70 bg-white/60 opacity-40 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
        dot.setAttribute('aria-label', `View slide ${idx + 1}: ${slide.subtitle}`);
        dot.addEventListener('click', () => {
          updateHeroSlide(idx);
          startHeroAutoplay();
        });
        heroDotsContainer.appendChild(dot);
        return dot;
      });
    }

    heroPrev?.addEventListener('click', () => {
      updateHeroSlide(heroIndex - 1);
      startHeroAutoplay();
    });
    heroNext?.addEventListener('click', () => {
      updateHeroSlide(heroIndex + 1);
      startHeroAutoplay();
    });

    updateHeroSlide(0);
    startHeroAutoplay();
  }
});
