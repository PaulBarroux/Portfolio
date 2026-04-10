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
     TYPING EFFECT — Hero rotating words
     ----------------------------------------- */
  var typingEl = document.getElementById('typing-text');

  if (typingEl) {
    var phrases = [
      'meaningful experiences',
      'thoughtful interfaces',
      'user-centered solutions',
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;
    var deleteSpeed = 40;
    var pauseAfterType = 2000;
    var pauseAfterDelete = 500;

    function typeEffect() {
      var current = phrases[phraseIndex];

      if (!isDeleting) {
        // Typing
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          // Finished typing — pause then start deleting
          setTimeout(function () {
            isDeleting = true;
            typeEffect();
          }, pauseAfterType);
          return;
        }
        setTimeout(typeEffect, typeSpeed);
      } else {
        // Deleting
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting — move to next phrase
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeEffect, pauseAfterDelete);
          return;
        }
        setTimeout(typeEffect, deleteSpeed);
      }
    }

    // Start typing after 500ms delay
    setTimeout(typeEffect, 500);
  }

  /* -----------------------------------------
     PROJECT SHOWCASE — Featured card + sidebar
     ----------------------------------------- */
  var featuredLink = document.getElementById('featured-project');
  var featuredImage = document.getElementById('featured-image');
  var featuredTitle = document.getElementById('featured-title');
  var featuredTags = document.getElementById('featured-tags');
  var listItems = document.querySelectorAll('.projects__list-item');

  if (listItems.length > 0 && featuredLink) {
    listItems.forEach(function (item) {
      // On hover: update the featured card
      item.addEventListener('mouseenter', function () {
        var href = this.dataset.href;
        var title = this.dataset.title;
        var tags = this.dataset.tags.split(',');

        // Update active state
        listItems.forEach(function (li) {
          li.classList.remove('active');
        });
        this.classList.add('active');

        // Update featured card
        featuredLink.href = href;
        featuredTitle.textContent = title;

        // Update tags
        featuredTags.innerHTML = '';
        tags.forEach(function (tag) {
          var span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tag.trim();
          featuredTags.appendChild(span);
        });
      });

      // On click: navigate to the project page
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
