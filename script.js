// ============================================================
// CAMPAMENTO BALCARCE — script.js
// WhatsApp: 2494240181
// ============================================================

const WA_NUMBER = '542494240181'; // Argentina (+54) + número sin 0 ni 15

// ── Build WhatsApp URL ──
function buildWaUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

// ── Open WhatsApp ──
function openWhatsApp(message) {
  window.open(buildWaUrl(message), '_blank', 'noopener,noreferrer');
}

// ── Hero / Nav / CTA general buttons ──
const generalMessage = '¡Hola! Vi su catálogo de gorras y remeras en Campamento Balcarce y me gustaría consultar sobre los productos disponibles.';

function setupGeneralButtons() {
  const ids = ['hero-wsp-btn', 'cta-wsp-btn', 'nav-wsp', 'wsp-fab'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp(generalMessage);
      });
    }
  });
}

// ── Product "Pedir" buttons ──
function setupProductButtons() {
  document.querySelectorAll('.btn--card[data-product]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = btn.getAttribute('data-product');
      const msg = `¡Hola! Me interesa el/la *${product}* que vi en Campamento Balcarce. ¿Podría darme más información sobre precio y disponibilidad?`;
      openWhatsApp(msg);
    });
  });

  // Clicking the card itself also opens WhatsApp
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productBtn = card.querySelector('.btn--card[data-product]');
      if (productBtn) {
        const product = productBtn.getAttribute('data-product');
        const msg = `¡Hola! Me interesa el/la *${product}* que vi en Campamento Balcarce. ¿Podría darme más información sobre precio y disponibilidad?`;
        openWhatsApp(msg);
      }
    });
  });
}

// ── Reveal on scroll (Intersection Observer) ──
function setupReveal() {
  const elements = document.querySelectorAll('.reveal');

  // Check if reduced motion is preferred
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
  );

  elements.forEach((el, i) => {
    // Staggered delay for siblings inside same parent
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    observer.observe(el);
  });
}

// ── Header shadow on scroll ──
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// ── Smooth scroll for anchor links ──
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  setupGeneralButtons();
  setupProductButtons();
  setupReveal();
  setupHeaderScroll();
  setupSmoothScroll();
});
