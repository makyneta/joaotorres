/* ============================================
   JOÃO TORRES — Professional Athletics Site
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     UTILITIES
     ------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /* ------------------------------------------
     NAVIGATION
     ------------------------------------------ */
  function initNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile');
    const backdrop = document.querySelector('.nav__backdrop');
    const closeBtn = document.querySelector('.nav__close');
    const mobileLinks = mobileMenu?.querySelectorAll('.nav__mobile-link');
    const allLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    let ticking = false;
    let isOpen = false;

    function onScroll() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lastScrollY > 50) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    }

    let lastScrollY = 0;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function updateActiveLink() {
      let current = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.getAttribute('id');
        }
      });

      allLinks.forEach((link) => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('nav__link--active');
        }
      });
    }

    function openMenu() {
      isOpen = true;
      toggle.classList.add('nav__toggle--open');
      mobileMenu.classList.add('nav__mobile--open');
      backdrop?.classList.add('nav__backdrop--visible');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (mobileLinks?.length) {
        mobileLinks.forEach((link) => {
          link.style.opacity = '';
          link.style.transform = '';
        });
      }
    }

    function closeMenu() {
      isOpen = false;
      toggle.classList.remove('nav__toggle--open');
      mobileMenu.classList.remove('nav__mobile--open');
      backdrop?.classList.remove('nav__backdrop--visible');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (toggle && mobileMenu) {
      toggle.addEventListener('click', () => {
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      closeBtn?.addEventListener('click', closeMenu);
      backdrop?.addEventListener('click', closeMenu);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
          closeMenu();
          toggle.focus();
        }
      });

      mobileLinks?.forEach((link) => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });
    }

    allLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offsetTop, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          }
        }
      });
    });
  }

  /* ------------------------------------------
     FOOTER
     ------------------------------------------ */
  function initFooter() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* ------------------------------------------
     HERO ANIMATIONS
     ------------------------------------------ */
  function initHero() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.hero__name-char, .hero__top, .hero__subtitle, .hero__divider, .hero__stats, .hero__scroll').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const chars = document.querySelectorAll('.hero__name-char');
    const top = document.querySelector('.hero__top');
    const subtitle = document.querySelector('.hero__subtitle');
    const divider = document.querySelector('.hero__divider');
    const stats = document.querySelector('.hero__stats');
    const scrollIndicator = document.querySelector('.hero__scroll');

    setTimeout(() => {
      if (top) {
        top.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        top.style.opacity = '1';
        top.style.transform = 'translateY(0)';
      }
    }, 200);

    setTimeout(() => {
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          char.style.opacity = '1';
          char.style.transform = 'translateY(0)';
        }, i * 60);
      });
    }, 400);

    const charsEnd = 400 + chars.length * 60 + 200;

    setTimeout(() => {
      if (subtitle) {
        subtitle.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }
    }, charsEnd);

    setTimeout(() => {
      if (divider) {
        divider.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        divider.style.opacity = '1';
        divider.style.transform = 'scaleX(1)';
      }
    }, charsEnd + 250);

    setTimeout(() => {
      if (stats) {
        stats.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        stats.style.opacity = '1';
        stats.style.transform = 'translateY(0)';
      }
    }, charsEnd + 450);

    setTimeout(() => {
      if (scrollIndicator) {
        scrollIndicator.style.transition = 'opacity 0.8s ease';
        scrollIndicator.style.opacity = '1';
      }
    }, charsEnd + 800);
  }

  /* ------------------------------------------
     HERO PARALLAX
     ------------------------------------------ */
  function initParallax() {
    if (prefersReducedMotion) return;

    const heroBg = document.querySelector('.hero__bg img');
    if (!heroBg) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

          if (scrolled < heroHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------
     SCROLL REVEAL — IntersectionObserver
     ------------------------------------------ */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('reveal--visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
      observer.observe(el);
    });
  }

  /* ------------------------------------------
     COUNT-UP ANIMATION
     ------------------------------------------ */
  function initCounters() {
    const counterEls = document.querySelectorAll('.counter, .about__stat-number');

    if (prefersReducedMotion) {
      counterEls.forEach((el) => {
        const target = parseFloat(el.dataset.target || el.dataset.count);
        const decimals = parseInt(el.dataset.decimals) || 0;
        el.textContent = target.toFixed(decimals);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.dataset.count);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 1800;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = easedProgress * target;

      el.textContent = current.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }

    requestAnimationFrame(tick);
  }

  /* ------------------------------------------
     SCOREBOARD CATEGORY FILTER
     ------------------------------------------ */
  function initScoreboardFilter() {
    const buttons = document.querySelectorAll('.scoreboard__cat-btn');
    const cards = document.querySelectorAll('.scorecard');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        buttons.forEach((b) => {
          b.classList.remove('scoreboard__cat-btn--active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('scoreboard__cat-btn--active');
        btn.setAttribute('aria-selected', 'true');

        cards.forEach((card) => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ------------------------------------------
     TIMELINE LINE FILL
     ------------------------------------------ */
  function initTimelineFill() {
    if (prefersReducedMotion) return;

    const track = document.querySelector('.timeline__track');
    const lineFill = document.querySelector('.timeline__line-fill');
    if (!track || !lineFill) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = track.getBoundingClientRect();
          const trackTop = rect.top;
          const trackHeight = rect.height;
          const windowHeight = window.innerHeight;

          const start = windowHeight * 0.8;
          const progress = clamp((start - trackTop) / trackHeight, 0, 1);

          lineFill.style.height = `${progress * 100}%`;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------
     LIGHTBOX
     ------------------------------------------ */
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var items = document.querySelectorAll('.photography__item');
    var currentIndex = 0;
    var sources = [];

    items.forEach(function (item, i) {
      var img = item.querySelector('img');
      if (img) sources.push({ src: img.src, alt: img.alt });

      item.addEventListener('click', function () {
        openLightbox(i);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });
    });

    function openLightbox(index) {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('is-active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function updateLightbox() {
      var item = sources[currentIndex];
      if (item) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
      }
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + sources.length) % sources.length;
      updateLightbox();
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % sources.length;
      updateLightbox();
    }

    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prevImage);
    lightbox.querySelector('.lightbox__next').addEventListener('click', nextImage);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }

  /* ------------------------------------------
     INITIALIZE
     ------------------------------------------ */
  function init() {
    initNav();
    initFooter();
    initHero();
    initParallax();
    initScrollReveal();
    initCounters();
    initScoreboardFilter();
    initTimelineFill();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
