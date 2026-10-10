/**
 * Rohan Shinde Photography & Films (RSP)
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- State & DOM References ---
  let portfolioData = null;
  let activeFilmCategory = 'all';
  let activePhotoCategory = 'all';
  let currentPhotoIndex = 0;
  let filteredPhotosList = [];

  // DOM Elements
  const header = document.querySelector('.site-header');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const filmsContainer = document.getElementById('films-grid-container');
  const photosContainer = document.getElementById('photos-grid-container');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  // Video Lightbox Elements
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('lightbox-iframe');
  const videoTitle = document.getElementById('lightbox-video-title');
  const videoMeta = document.getElementById('lightbox-video-meta');
  const videoCloseBtn = document.getElementById('lightbox-close-btn');

  // Photo Lightbox Elements
  const photoModal = document.getElementById('photo-modal');
  const photoImg = document.getElementById('photo-lightbox-img');
  const photoCaptionTitle = document.getElementById('photo-lightbox-title');
  const photoCaptionSub = document.getElementById('photo-lightbox-sub');
  const photoPrevBtn = document.getElementById('photo-prev-btn');
  const photoNextBtn = document.getElementById('photo-next-btn');
  const photoCloseBtn = document.getElementById('photo-close-btn');

  // Form Elements
  const inquiryForm = document.getElementById('wedding-inquiry-form');
  const formStatus = document.getElementById('form-status-alert');
  const whatsappCta = document.getElementById('whatsapp-direct-link');

  // --- Theme Management ---
  const savedTheme = localStorage.getItem('rsp-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('rsp-theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light Ivory' : 'Dark Luxe'} Mode`);
    themeToggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  // --- Sticky Header & Back To Top ---
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Mobile Navigation Overlay ---
  if (mobileToggleBtn && mobileOverlay) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeOverlay = () => {
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileCloseBtn?.addEventListener('click', closeOverlay);
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeOverlay);
    });
  }

  // --- Fetch / Initialize Data ---
  if (window.EMBEDDED_PORTFOLIO_DATA) {
    portfolioData = window.EMBEDDED_PORTFOLIO_DATA;
    renderFilms();
    renderPhotos();
    initFilters();
    initFAQ();
  } else {
    fetch('data/portfolio_data.json')
      .then(res => {
        if (!res.ok) throw new Error('Network error loading data');
        return res.json();
      })
      .then(data => {
        portfolioData = data;
        renderFilms();
        renderPhotos();
        initFilters();
        initFAQ();
      })
      .catch(err => {
        console.warn('Fallback data loading error:', err);
      });
  }

  // --- Render Wedding Films Grid ---
  function renderFilms() {
    if (!filmsContainer || !portfolioData) return;
    const { films } = portfolioData;
    const filtered = activeFilmCategory === 'all'
      ? films
      : films.filter(f => f.category === activeFilmCategory);

    filmsContainer.innerHTML = '';

    filtered.forEach(film => {
      const card = document.createElement('article');
      card.className = 'film-card';
      card.setAttribute('data-id', film.id);
      card.setAttribute('data-youtube', film.youtubeId);

      card.innerHTML = `
        <div class="film-thumbnail-wrapper" role="button" tabindex="0" aria-label="Watch ${film.title}">
          <img class="film-thumbnail-img" src="${film.thumbnail}" alt="${film.title}" loading="lazy">
          <div class="film-overlay-gradient"></div>
          <span class="film-badge-category">${film.categoryLabel}</span>
          <span class="film-badge-duration">${film.duration}</span>
          <div class="film-play-trigger">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
        <div class="film-info-body">
          <div class="film-location-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${film.location}</span>
          </div>
          <h3 class="film-title-heading">${film.title}</h3>
          <p class="film-description-text">${film.description}</p>
          <div class="film-card-footer">
            <span class="film-watch-link">
              <span>Play Cinema Film</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </div>
        </div>
      `;

      // Trigger video modal on click or Enter key
      const thumb = card.querySelector('.film-thumbnail-wrapper');
      const watchLink = card.querySelector('.film-watch-link');
      const openAction = () => openVideoLightbox(film);

      thumb.addEventListener('click', openAction);
      watchLink.addEventListener('click', openAction);
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAction();
        }
      });

      filmsContainer.appendChild(card);
    });
  }

  // --- Video Modal Controls ---
  function openVideoLightbox(film) {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = `https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
    videoTitle.textContent = film.title;
    videoMeta.textContent = `${film.categoryLabel} • ${film.location} • Runtime: ${film.duration}`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    videoCloseBtn?.focus();
  }

  function closeVideoLightbox() {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove('active');
    videoIframe.src = '';
    document.body.style.overflow = '';
  }

  videoCloseBtn?.addEventListener('click', closeVideoLightbox);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoLightbox();
  });

  // --- Render Photography Portfolio Grid ---
  function renderPhotos() {
    if (!photosContainer || !portfolioData) return;
    const { photos } = portfolioData;
    filteredPhotosList = activePhotoCategory === 'all'
      ? photos
      : photos.filter(p => p.category === activePhotoCategory);

    photosContainer.innerHTML = '';

    filteredPhotosList.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${photo.title}`);

      card.innerHTML = `
        <img class="photo-card-img" src="${photo.src}" alt="${photo.title}" loading="lazy">
        <div class="photo-overlay">
          <span class="photo-overlay-tag">${photo.categoryLabel}</span>
          <h4 class="photo-overlay-title">${photo.title}</h4>
          <span class="photo-overlay-location">${photo.location}</span>
        </div>
      `;

      const openPhoto = () => openPhotoLightbox(idx);
      card.addEventListener('click', openPhoto);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPhoto();
        }
      });

      photosContainer.appendChild(card);
    });
  }

  // --- Photo Lightbox Controls ---
  function openPhotoLightbox(index) {
    if (!photoModal || !filteredPhotosList.length) return;
    currentPhotoIndex = index;
    updatePhotoLightboxContent();
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updatePhotoLightboxContent() {
    const item = filteredPhotosList[currentPhotoIndex];
    if (!item) return;
    photoImg.src = item.src;
    photoImg.alt = item.title;
    photoCaptionTitle.textContent = item.title;
    photoCaptionSub.textContent = `${item.categoryLabel} • ${item.location} — "${item.caption}"`;
  }

  function closePhotoLightbox() {
    if (!photoModal) return;
    photoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  photoPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotosList.length) % filteredPhotosList.length;
    updatePhotoLightboxContent();
  });

  photoNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotosList.length;
    updatePhotoLightboxContent();
  });

  photoCloseBtn?.addEventListener('click', closePhotoLightbox);
  photoModal?.addEventListener('click', (e) => {
    if (e.target === photoModal) closePhotoLightbox();
  });

  // Keyboard navigation for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal?.classList.contains('active')) closeVideoLightbox();
      if (photoModal?.classList.contains('active')) closePhotoLightbox();
    }
    if (photoModal?.classList.contains('active')) {
      if (e.key === 'ArrowLeft') photoPrevBtn?.click();
      if (e.key === 'ArrowRight') photoNextBtn?.click();
    }
  });

  // --- Filter Bar Initialization ---
  function initFilters() {
    // Film Filters
    document.querySelectorAll('[data-film-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-film-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilmCategory = btn.getAttribute('data-film-filter');
        renderFilms();
      });
    });

    // Photo Filters
    document.querySelectorAll('[data-photo-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-photo-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePhotoCategory = btn.getAttribute('data-photo-filter');
        renderPhotos();
      });
    });
  }

  // --- FAQ Accordion ---
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      btn?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // --- Wedding Inquiry Form & WhatsApp Generator ---
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const coupleNames = document.getElementById('inq-names')?.value || '';
      const weddingDate = document.getElementById('inq-date')?.value || '';
      const venueCity = document.getElementById('inq-city')?.value || '';
      const service = document.getElementById('inq-service')?.value || 'Full Photo & Cinema';
      const guestCount = document.getElementById('inq-guests')?.value || '';
      const phone = document.getElementById('inq-phone')?.value || '';
      const message = document.getElementById('inq-message')?.value || '';

      // Construct WhatsApp Direct Message
      const waText = encodeURIComponent(
        `Hello Rohan! We would love to check availability for our wedding.\n\n` +
        `• Couple: ${coupleNames}\n` +
        `• Date: ${weddingDate}\n` +
        `• Venue / City: ${venueCity}\n` +
        `• Services: ${service}\n` +
        `• Est. Guests: ${guestCount}\n` +
        `• Contact: ${phone}\n` +
        `• Notes: ${message}`
      );

      const waUrl = `https://wa.me/919820012345?text=${waText}`;

      if (formStatus) {
        formStatus.className = 'form-status-alert success';
        formStatus.innerHTML = `
          <strong>Thank you, ${coupleNames}!</strong> Your wedding inquiry has been received.<br>
          We will review our calendar and reply within 24 hours. You can also chat directly with Rohan:
          <div style="margin-top: 0.75rem;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn whatsapp-direct-btn" style="padding: 0.5rem 1.2rem; font-size: 0.82rem;">
              Open Inquiry in WhatsApp
            </a>
          </div>
        `;
        formStatus.style.display = 'block';
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Update whatsapp CTA link
      if (whatsappCta) {
        whatsappCta.href = waUrl;
      }

      inquiryForm.reset();
    });
  }
});
