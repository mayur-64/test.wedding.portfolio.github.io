/**
 * Robin Goodlad Photography - Dorset Wedding Photographer
 * Main Interactive Script for branch sample2
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initActiveNavSpy();
  initGalleryFilter();
  initLightbox();
  initEnquiryForm();
});

/* ==========================================================================
   1. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('masthead');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer when any mobile nav link is clicked
  const mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. Active Navigation Spy
   ========================================================================== */
function initActiveNavSpy() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Observation Gallery Filter
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const cards = document.querySelectorAll('.observation-grid .obs-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const captionWrap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const backdrop = document.getElementById('lightbox-backdrop');

  const cards = Array.from(document.querySelectorAll('.observation-grid .obs-card'));
  if (!modal || !modalImg || !cards.length) return;

  let currentIndex = 0;

  const getVisibleCards = () => {
    return cards.filter(card => card.style.display !== 'none');
  };

  const showImageAtIndex = (idx) => {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;

    if (idx < 0) idx = visibleCards.length - 1;
    if (idx >= visibleCards.length) idx = 0;
    currentIndex = idx;

    const card = visibleCards[currentIndex];
    const imgEl = card.querySelector('.obs-img');
    const titleEl = card.querySelector('.obs-item-title');
    const venueEl = card.querySelector('.obs-venue');
    const noteEl = card.querySelector('.obs-note');

    modalImg.src = imgEl.src;
    modalImg.alt = imgEl.alt;

    captionWrap.innerHTML = `
      <h3>${titleEl ? titleEl.textContent : ''}</h3>
      <p><strong>${venueEl ? venueEl.textContent : ''}</strong> &bull; ${noteEl ? noteEl.textContent : ''}</p>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Card click & keyboard trigger
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const visible = getVisibleCards();
      const idx = visible.indexOf(card);
      showImageAtIndex(idx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const visible = getVisibleCards();
        const idx = visible.indexOf(card);
        showImageAtIndex(idx);
      }
    });
  });

  // Modal controls
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImageAtIndex(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImageAtIndex(currentIndex + 1);
    });
  }

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showImageAtIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') showImageAtIndex(currentIndex + 1);
  });
}

/* ==========================================================================
   6. Interactive Enquiry Form
   ========================================================================== */
function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  const successMsg = document.getElementById('form-success-message');
  const submitBtn = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      input.classList.remove('invalid');
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('invalid');
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        isValid = false;
        input.classList.add('invalid');
      }
    });

    if (!isValid) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Simulate sending enquiry
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Enquiry...</span>';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Wedding Enquiry</span>';
      }

      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'flex';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
  });
}
