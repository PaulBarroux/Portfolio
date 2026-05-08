/* ============================================
   Paul Barroux — Portfolio
   Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* -----------------------------------------
     NAVBAR — Hide on scroll down, show on scroll up
     ----------------------------------------- */
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  const scrollThreshold = 10;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      navbar.classList.remove('hidden');
      lastScrollY = currentScrollY;
      return;
    }

    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      navbar.classList.add('hidden');
    } else {
      // Scrolling up
      navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* -----------------------------------------
     MOBILE MENU — Hamburger toggle
     ----------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* -----------------------------------------
     SCROLL REVEAL — IntersectionObserver
     ----------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Apply stagger delay if data attribute is present
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -----------------------------------------
     LANGUAGE TOGGLE — EN / 中文
     CSS already hides the inactive language via [data-lang] rules.
     This controls: <html lang>, button active state, persisted choice,
     typing animation prefix + phrases, and document title.
     ----------------------------------------- */
  var STORAGE_KEY = 'pb_lang';
  var TITLES = {
    en: { home: "Paul Barroux · UX/UI Designer", about: "About Paul Barroux", project: null },
    zh: { home: "Paul Barroux · UX/UI 设计师", about: "关于 Paul Barroux", project: null }
  };

  var TYPING = {
    en: { prefix: 'I craft ', phrases: ['meaningful experiences', 'thoughtful interfaces', 'user-centered solutions'] },
    zh: { prefix: '我创造', phrases: ['有意义的体验', '用心设计的界面', '以用户为中心的解决方案'] }
  };

  function detectInitialLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') return stored;
    } catch (e) { /* localStorage may be blocked */ }
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  var currentLang = detectInitialLang();

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    // Toggle active state on every lang-toggle button on the page
    var btns = document.querySelectorAll('.lang-toggle__btn');
    btns.forEach(function (b) {
      b.classList.toggle('active', b.dataset.setLang === lang);
    });

    // Update document title if a translation exists for this page
    var pageKey = document.body.dataset.page; // 'home' | 'about' | 'project'
    if (pageKey && TITLES[lang] && TITLES[lang][pageKey]) {
      document.title = TITLES[lang][pageKey];
    }

    // Restart typing animation in the right language
    restartTyping();
  }

  // Wire up every toggle button (works on both navbar and mobile menu)
  document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.dataset.setLang);
    });
  });

  /* -----------------------------------------
     TYPING EFFECT — bilingual, restartable
     ----------------------------------------- */
  var typingEl = document.getElementById('typing-text');
  var typingPrefixEl = document.getElementById('typing-prefix');
  var typingTimer = null;
  var typingState = { phraseIndex: 0, charIndex: 0, isDeleting: false };
  var typeSpeed = 80;
  var deleteSpeed = 40;
  var pauseAfterType = 2000;
  var pauseAfterDelete = 500;

  function typeStep() {
    if (!typingEl) return;
    var data = TYPING[currentLang];
    var current = data.phrases[typingState.phraseIndex % data.phrases.length];

    if (!typingState.isDeleting) {
      typingEl.textContent = current.substring(0, typingState.charIndex + 1);
      typingState.charIndex++;
      if (typingState.charIndex === current.length) {
        typingTimer = setTimeout(function () {
          typingState.isDeleting = true;
          typeStep();
        }, pauseAfterType);
        return;
      }
      typingTimer = setTimeout(typeStep, typeSpeed);
    } else {
      typingEl.textContent = current.substring(0, typingState.charIndex - 1);
      typingState.charIndex--;
      if (typingState.charIndex === 0) {
        typingState.isDeleting = false;
        typingState.phraseIndex = (typingState.phraseIndex + 1) % data.phrases.length;
        typingTimer = setTimeout(typeStep, pauseAfterDelete);
        return;
      }
      typingTimer = setTimeout(typeStep, deleteSpeed);
    }
  }

  function restartTyping() {
    if (!typingEl) return;
    if (typingTimer) clearTimeout(typingTimer);
    if (typingPrefixEl) typingPrefixEl.textContent = TYPING[currentLang].prefix;
    typingEl.textContent = '';
    typingState = { phraseIndex: 0, charIndex: 0, isDeleting: false };
    typingTimer = setTimeout(typeStep, 500);
  }

  // Apply initial language now that all handlers exist (this also kicks off typing)
  applyLang(currentLang);

  /* -----------------------------------------
     SCROLL-LOCKED PROJECT CAROUSEL
     ----------------------------------------- */
  var projectsWrapper = document.getElementById('projects-wrapper');
  var slides = document.querySelectorAll('.projects__slide');
  var listItems = document.querySelectorAll('.projects__list-item');
  var totalSlides = slides.length;
  var currentSlide = 0;

  function setActiveSlide(index) {
    if (index === currentSlide) return;
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlide].classList.remove('active');
    listItems[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    listItems[currentSlide].classList.add('active');
  }

  // Desktop only: scroll-position-based switching
  if (projectsWrapper && totalSlides > 0) {
    var isMobile = window.matchMedia('(max-width: 767px)');

    function handleCarouselScroll() {
      if (isMobile.matches) return;

      var rect = projectsWrapper.getBoundingClientRect();
      var wrapperHeight = projectsWrapper.offsetHeight;
      var scrolled = -rect.top; // How far into the wrapper we've scrolled
      var scrollRange = wrapperHeight - window.innerHeight;

      if (scrolled < 0 || scrollRange <= 0) return;

      var progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);
      // Map progress 0-1 to slide indices 0 to (totalSlides - 1)
      var slideIndex = Math.min(
        Math.floor(progress * totalSlides),
        totalSlides - 1
      );

      setActiveSlide(slideIndex);
    }

    window.addEventListener('scroll', handleCarouselScroll, { passive: true });

    // Sidebar hover and click
    listItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        var idx = parseInt(this.dataset.index, 10);
        setActiveSlide(idx);
      });

      item.addEventListener('click', function () {
        window.location.href = this.dataset.href;
      });
    });
  }

  /* -----------------------------------------
     SMOOTH SCROLL for anchor links
     ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
})();
