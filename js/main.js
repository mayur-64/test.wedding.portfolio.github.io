/**
 * Rohan Shinde Photography & Films (RSP)
 * Cinematic Editorial Motion & Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. Sticky Header & Announcement Bar ---
  const header = document.querySelector('.site-header');
  const announceBar = document.querySelector('.announcement-bar');
  const announceCloseBtn = document.querySelector('.announcement-close-btn');

  announceCloseBtn?.addEventListener('click', () => {
    announceBar?.classList.add('dismissed');
  });

  // --- 2. Mobile Bottom Sticky CTA Bar ---
  const mobileBottomCta = document.querySelector('.mobile-sticky-cta-bar');
  const heroSection = document.getElementById('hero');
  const finalCtaSection = document.getElementById('final-cta');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (mobileBottomCta && heroSection && finalCtaSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const finalCtaTop = finalCtaSection.offsetTop - window.innerHeight;

      if (scrollY > heroBottom && scrollY < finalCtaTop) {
        mobileBottomCta.classList.add('visible');
        mobileBottomCta.classList.remove('hidden-bottom');
      } else if (scrollY >= finalCtaTop) {
        mobileBottomCta.classList.add('hidden-bottom');
      } else {
        mobileBottomCta.classList.remove('visible');
      }
    }
  }, { passive: true });

  // --- 3. Mobile Hamburger & Fullscreen Accordion Drawer ---
  const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');

  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
    if (isOpen) {
      hamburgerBtn?.classList.add('open');
      mobileDrawer?.classList.add('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      hamburgerBtn?.classList.remove('open');
      mobileDrawer?.classList.remove('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());

  document.querySelectorAll('.mobile-submenu-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      panel?.classList.toggle('open');
      btn.setAttribute('aria-expanded', panel?.classList.contains('open') ? 'true' : 'false');
    });
  });

  document.querySelectorAll('.mobile-menu-drawer a:not(.mobile-submenu-trigger)').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Focus trap for mobile drawer
  mobileDrawer?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(mobileDrawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el => el.offsetParent !== null || el === document.activeElement);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });

  // --- 4. Rotating Hero Word ---
  const words = ['story', 'film', 'heirloom', 'memory'];
  const rotatingWordElem = document.getElementById('rotating-word');
  let currentWordIdx = 0;

  if (rotatingWordElem && !isReducedMotion) {
    setInterval(() => {
      currentWordIdx = (currentWordIdx + 1) % words.length;
      rotatingWordElem.textContent = words[currentWordIdx];
    }, 2800);
  }

  // --- 5. Hero Background Video Controls ---
  const heroVideo = document.getElementById('hero-bg-video');
  const heroVideoBtn = document.getElementById('hero-video-toggle');

  heroVideoBtn?.addEventListener('click', () => {
    if (!heroVideo) return;
    if (heroVideo.paused) {
      heroVideo.play();
      heroVideoBtn.setAttribute('aria-pressed', 'false');
      heroVideoBtn.innerHTML = `<span>Pause video</span>`;
    } else {
      heroVideo.pause();
      heroVideoBtn.setAttribute('aria-pressed', 'true');
      heroVideoBtn.innerHTML = `<span>Play video</span>`;
    }
  });

  // --- 6. Angled 5-Card Carousel with Custom Cursor & Touch ---
  const angledCards = Array.from(document.querySelectorAll('.angled-card'));
  const carouselContainer = document.querySelector('.hero-carousel-container');
  const cursorFollow = document.getElementById('cursor-follow');
  const carouselPauseBtn = document.getElementById('hero-carousel-pause-btn');

  let activeCardIndex = 2; // Center card (0 to 4)
  let isCarouselPaused = false;
  let carouselAutoTimer = null;

  const positions = ['pos-far-left', 'pos-left', 'pos-center', 'pos-right', 'pos-far-right'];

  const updateCardPositions = () => {
    const total = angledCards.length;
    angledCards.forEach((card, idx) => {
      card.className = 'angled-card';
      const offset = (idx - activeCardIndex + total) % total;
      if (offset === 0) card.classList.add('pos-center');
      else if (offset === 1) card.classList.add('pos-right');
      else if (offset === 2) card.classList.add('pos-far-right');
      else if (offset === total - 1) card.classList.add('pos-left');
      else card.classList.add('pos-far-left');
    });
  };

  const nextAngledCard = () => {
    activeCardIndex = (activeCardIndex + 1) % angledCards.length;
    updateCardPositions();
  };

  const prevAngledCard = () => {
    activeCardIndex = (activeCardIndex - 1 + angledCards.length) % angledCards.length;
    updateCardPositions();
  };

  const startCarouselAuto = () => {
    if (isReducedMotion || isCarouselPaused) return;
    clearInterval(carouselAutoTimer);
    carouselAutoTimer = setInterval(nextAngledCard, 5000);
  };

  if (angledCards.length > 0) {
    updateCardPositions();
    startCarouselAuto();

    carouselPauseBtn?.addEventListener('click', () => {
      isCarouselPaused = !isCarouselPaused;
      carouselPauseBtn.setAttribute('aria-pressed', isCarouselPaused ? 'true' : 'false');
      carouselPauseBtn.textContent = isCarouselPaused ? 'Play' : 'Pause';
      if (isCarouselPaused) clearInterval(carouselAutoTimer);
      else startCarouselAuto();
    });

    // Custom Cursor follower inside carousel
    carouselContainer?.addEventListener('mousemove', (e) => {
      if (!cursorFollow || isReducedMotion) return;
      const rect = carouselContainer.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const isLeft = (x - rect.left) < rect.width / 2;

      cursorFollow.style.left = `${x}px`;
      cursorFollow.style.top = `${y}px`;
      cursorFollow.textContent = isLeft ? 'Prev' : 'Next';
      cursorFollow.classList.add('active');
    });

    carouselContainer?.addEventListener('mouseleave', () => {
      cursorFollow?.classList.remove('active');
    });

    carouselContainer?.addEventListener('click', (e) => {
      if (e.target.closest('.carousel-pause-btn')) return;
      const rect = carouselContainer.getBoundingClientRect();
      const isLeft = (e.clientX - rect.left) < rect.width / 2;
      if (isLeft) prevAngledCard();
      else nextAngledCard();
      startCarouselAuto();
    });

    // Touch Swipe
    let touchStartX = 0;
    carouselContainer?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer?.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) nextAngledCard();
      if (touchEndX > touchStartX + 40) prevAngledCard();
      startCarouselAuto();
    }, { passive: true });
  }

  // --- 7. Rolling Digits Animation ---
  const statsStrip = document.getElementById('stats-strip');
  let statsAnimated = false;

  const animateRollingDigits = () => {
    if (statsAnimated || isReducedMotion) return;
    statsAnimated = true;

    document.querySelectorAll('.digit-column').forEach(col => {
      const target = parseInt(col.getAttribute('data-target') || '0', 10);
      col.style.transform = `translateY(-${target * 75}px)`;
    });
  };

  if (statsStrip) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateRollingDigits();
        statsObserver.disconnect();
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statsStrip);
  }

  // --- 8. Infinite King-Carousel ---
  const kingCards = Array.from(document.querySelectorAll('.king-card'));
  const kingPills = Array.from(document.querySelectorAll('[data-king-tab]'));
  const kingDots = Array.from(document.querySelectorAll('.paging-dot'));
  const kingPauseBtn = document.getElementById('king-pause-btn');

  let activeKingIdx = 0;
  let isKingPaused = false;
  let kingAutoTimer = null;

  const setKingSlide = (index) => {
    activeKingIdx = index;
    kingCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === activeKingIdx);
      card.setAttribute('aria-hidden', idx === activeKingIdx ? 'false' : 'true');
    });
    kingPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === activeKingIdx);
    });
    kingDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeKingIdx);
    });
  };

  const startKingAuto = () => {
    if (isReducedMotion || isKingPaused) return;
    clearInterval(kingAutoTimer);
    kingAutoTimer = setInterval(() => {
      setKingSlide((activeKingIdx + 1) % kingCards.length);
    }, 6000);
  };

  if (kingCards.length > 0) {
    setKingSlide(0);
    startKingAuto();

    kingPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        setKingSlide(idx);
        startKingAuto();
      });
    });

    kingDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        setKingSlide(idx);
        startKingAuto();
      });
    });

    kingPauseBtn?.addEventListener('click', () => {
      isKingPaused = !isKingPaused;
      kingPauseBtn.setAttribute('aria-pressed', isKingPaused ? 'true' : 'false');
      kingPauseBtn.textContent = isKingPaused ? 'Play' : 'Pause';
      if (isKingPaused) clearInterval(kingAutoTimer);
      else startKingAuto();
    });
  }

  // --- 9. Horizontal Experience Carousel Navigation ---
  const expTrack = document.getElementById('experience-track');
  const expPrevBtn = document.getElementById('exp-prev-btn');
  const expNextBtn = document.getElementById('exp-next-btn');

  expPrevBtn?.addEventListener('click', () => {
    expTrack?.scrollBy({ left: -320, behavior: 'smooth' });
  });

  expNextBtn?.addEventListener('click', () => {
    expTrack?.scrollBy({ left: 320, behavior: 'smooth' });
  });

  expTrack?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      expTrack.scrollBy({ left: -320, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      expTrack.scrollBy({ left: 320, behavior: 'smooth' });
    }
  });

  // --- 10. Choose Your Style Selection ---
  const styleCards = document.querySelectorAll('.style-scroll-card');
  const styleCta = document.getElementById('start-style-cta');
  let selectedStyle = 'Timeless';

  styleCards.forEach(card => {
    card.addEventListener('click', () => {
      styleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedStyle = card.getAttribute('data-style') || 'Timeless';
      if (styleCta) {
        styleCta.textContent = `Start with ${selectedStyle} Style →`;
      }
    });
  });

  styleCta?.addEventListener('click', () => {
    const locInput = document.getElementById('inq-location');
    if (locInput) locInput.value = `${selectedStyle} Style preferred`;
    document.getElementById('check-date')?.scrollIntoView({ behavior: 'smooth' });
  });

  // --- 11. Date Checker Form (WhatsApp Direct Linking) ---
  const dateForm = document.getElementById('date-checker-form');
  dateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateVal = document.getElementById('inq-date')?.value || '';
    const locVal = document.getElementById('inq-location')?.value || '';

    const text = encodeURIComponent(
      `Hello Rohan! We would like to check availability for our wedding on ${dateVal} in ${locVal}.`
    );
    window.open(`https://wa.me/919820012345?text=${text}`, '_blank');
  });

  // --- 12. Pointer Tilt on "Made of moments" Mosaic ---
  const mosaicSection = document.querySelector('.mosaic-section');
  const mosaicTilt = document.querySelector('.mosaic-tilt-container');

  if (mosaicSection && mosaicTilt && !isReducedMotion) {
    mosaicSection.addEventListener('mousemove', (e) => {
      const rect = mosaicSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      mosaicTilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    mosaicSection.addEventListener('mouseleave', () => {
      mosaicTilt.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // --- 13. Accordions (45deg +/× rotating, smooth height) ---
  document.querySelectorAll('.accordion-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item?.classList.contains('open');

      // Close siblings within the same group
      const group = item?.parentElement;
      group?.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 14. Video & Photo Modals ---
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('lightbox-iframe');
  const videoTitle = document.getElementById('lightbox-video-title');
  const videoMeta = document.getElementById('lightbox-video-meta');
  const videoCloseBtn = document.getElementById('lightbox-close-btn');

  const photoModal = document.getElementById('photo-modal');
  const photoImg = document.getElementById('photo-lightbox-img');
  const photoCaptionTitle = document.getElementById('photo-lightbox-title');
  const photoCaptionSub = document.getElementById('photo-lightbox-sub');
  const photoCloseBtn = document.getElementById('photo-close-btn');

  const openVideoModal = (youtubeId, title, meta) => {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    if (videoTitle) videoTitle.textContent = title;
    if (videoMeta) videoMeta.textContent = meta;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove('active');
    videoIframe.src = '';
    document.body.style.overflow = '';
  };

  videoCloseBtn?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  const openPhotoModal = (src, title, caption) => {
    if (!photoModal || !photoImg) return;
    photoImg.src = src;
    photoImg.alt = title;
    if (photoCaptionTitle) photoCaptionTitle.textContent = title;
    if (photoCaptionSub) photoCaptionSub.textContent = caption;
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closePhotoModal = () => {
    if (!photoModal) return;
    photoModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  photoCloseBtn?.addEventListener('click', closePhotoModal);
  photoModal?.addEventListener('click', (e) => {
    if (e.target === photoModal) closePhotoModal();
  });

  // Bind video trigger elements
  document.querySelectorAll('[data-youtube-id]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const yId = elem.getAttribute('data-youtube-id');
      const title = elem.getAttribute('data-video-title') || 'Wedding Film';
      const meta = elem.getAttribute('data-video-meta') || 'RSP Cinema';
      openVideoModal(yId, title, meta);
    });
  });

  // Bind photo trigger elements
  document.querySelectorAll('[data-photo-src]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const src = elem.getAttribute('data-photo-src');
      const title = elem.getAttribute('data-photo-title') || 'Wedding Moment';
      const caption = elem.getAttribute('data-photo-caption') || '';
      openPhotoModal(src, title, caption);
    });
  });

  // Escape key global listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closePhotoModal();
      toggleMobileMenu(false);
    }
  });

  // --- 15. Intersection Observer Reveal Blocks ---
  const revealElements = document.querySelectorAll('.reveal-block, .reveal-stagger');
  if (!isReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
