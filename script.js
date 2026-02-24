// ============================================================
// CAMPAMENTO BALCARCE — script.js
// WhatsApp: +54 9 2494240181
// ============================================================

const WA_NUMBER = '5492494240181';

// ── Build WhatsApp URL ──
function buildWaUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

function openWhatsApp(message) {
  window.open(buildWaUrl(message), '_blank', 'noopener,noreferrer');
}

// ── CART STATE ──
let cart = [];

// ── DOM ELEMENTS ──
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalOptions = document.getElementById('modal-options');
const modalQty = document.getElementById('modal-qty');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const modalAddBtn = document.getElementById('modal-add-btn');

const cartSidebar = document.getElementById('cart-sidebar');
const cartFab = document.getElementById('cart-fab');
const cartBadge = document.getElementById('cart-badge');
const cartClose = document.getElementById('cart-close');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items');
const cartCheckoutBtn = document.getElementById('cart-checkout-btn');

let currentProduct = null;

// ── GENERAL CTAS ──
function setupGeneralButtons() {
  const ctaBtn = document.getElementById('cta-wsp-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp('¡Hola! Estuve viendo la página de Jóvenes La Roca y me gustaría hacerles una consulta general.');
    });
  }
}

// ── PRODUCT MODAL LOGIC ──
function openModal(card) {
  const name = card.querySelector('.product-card__name').textContent;
  const desc = card.querySelector('.product-card__desc').textContent;
  const price = card.querySelector('.product-card__price').textContent;

  // Try to find image
  const imgEl = card.querySelector('img.product-card__img');
  let imgSrc = '';
  if (imgEl) {
    imgSrc = imgEl.src;
  } else {
    // Transparent pixel if no image
    imgSrc = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  }

  currentProduct = {
    name,
    price,
    img: imgSrc,
    // Identify remera purely by name
    isRemera: name.toLowerCase().includes('remera')
  };

  modalTitle.textContent = name;
  modalDesc.textContent = desc;
  modalPrice.textContent = price;
  modalImg.src = imgSrc;
  modalQty.value = 1;

  // Build options if it's a Remera
  modalOptions.innerHTML = '';
  if (currentProduct.isRemera) {
    modalOptions.innerHTML = `
      <select id="modal-size" class="modal__select">
        <option value="" disabled selected>Seleccioná tu talle</option>
        <option value="S">Talle S</option>
        <option value="M">Talle M</option>
        <option value="L">Talle L</option>
        <option value="XL">Talle XL</option>
        <option value="XXL">Talle XXL</option>
      </select>
      <select id="modal-color" class="modal__select">
        <option value="" disabled selected>Seleccioná el color</option>
        <option value="Negro">Negro</option>
        <option value="Blanco">Blanco</option>
        <option value="Beige">Beige</option>
        <option value="Gris">Gris</option>
      </select>
    `;
  }

  modal.classList.add('is-active');
}

function closeModal() {
  modal.classList.remove('is-active');
  currentProduct = null;
}

function setupModal() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Qty controls
  if (qtyMinus) qtyMinus.addEventListener('click', () => {
    let val = parseInt(modalQty.value) || 1;
    if (val > 1) modalQty.value = val - 1;
  });

  if (qtyPlus) qtyPlus.addEventListener('click', () => {
    let val = parseInt(modalQty.value) || 1;
    if (val < 99) modalQty.value = val + 1;
  });

  // Add to cart
  if (modalAddBtn) modalAddBtn.addEventListener('click', () => {
    if (!currentProduct) return;

    let optionsText = '';
    if (currentProduct.isRemera) {
      const sizeList = document.getElementById('modal-size');
      const colorList = document.getElementById('modal-color');

      const size = sizeList ? sizeList.value : '';
      const color = colorList ? colorList.value : '';

      if (!size || !color) {
        alert('Por favor, seleccioná talla y color para continuar.');
        return;
      }
      optionsText = `Talle: ${size} | Color: ${color}`;
    }

    const qty = parseInt(modalQty.value) || 1;

    cart.push({
      id: Date.now(),
      name: currentProduct.name,
      price: currentProduct.price,
      img: currentProduct.img,
      qty: qty,
      options: optionsText
    });

    updateCartUI();
    closeModal();
    openCart(); // Show cart when item added
  });
}

// ── CART LOGIC ──
function openCart() {
  if (cartSidebar) cartSidebar.classList.add('is-active');
}

function closeCart() {
  if (cartSidebar) cartSidebar.classList.remove('is-active');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  // Update badge
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  if (cartBadge) cartBadge.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
    return;
  }

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item__img" />
      <div class="cart-item__info">
        <h4 class="cart-item__name">${item.name}</h4>
        ${item.options ? `<span class="cart-item__opts">${item.options}</span>` : ''}
        <span class="cart-item__qty-price">${item.qty} x ${item.price}</span>
        <button class="cart-item__remove" onclick="removeFromCart(${item.id})">Eliminar</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });
}

function setupCart() {
  if (cartFab) cartFab.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  if (cartCheckoutBtn) cartCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    let msg = '¡Hola! Quiero hacer el siguiente pedido en Jóvenes La Roca:\n\n';
    cart.forEach(item => {
      msg += `▪️ ${item.qty}x *${item.name}*\n`;
      if (item.options) {
        msg += `   (${item.options})\n`;
      }
    });
    msg += '\n¡Aguardá su respuesta para confirmar!';
    openWhatsApp(msg);
  });
}

// ── Reveal on scroll ──
function setupReveal() {
  const elements = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Si JS funciona, los escondemos preparándolos para la animación
  elements.forEach(el => el.classList.add('js-reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    observer.observe(el);
  });
}

// ── Header state on scroll ──
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      header.classList.remove('header--scrolled');
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// ── Smooth scroll for anchor links ──
function setupSmoothScroll() { // Smooth scroll
  const navMenu = document.getElementById('main-nav'); // Assuming main-nav is the navigation menu
  const navToggle = document.getElementById('nav-toggle'); // Assuming nav-toggle is the hamburger button

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        if (navMenu) navMenu.classList.remove('is-open'); // Changed from is-active to is-open based on setupHamburger
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        if (navToggle) navToggle.classList.remove('is-open'); // Close hamburger icon too

        const headerOffset = 80; // Offset for header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setupImageModal() {
  const images = document.querySelectorAll('.js-image-modal');
  if (images.length === 0) return;

  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal js-modal-gallery';
  modalContainer.innerHTML = `
    <div class="modal__backdrop js-gallery-close"></div>
    <div class="modal__content image-modal-content" style="flex-direction: column; gap: 20px;">
      <button class="modal__close js-gallery-close" style="top: 10px; right: 10px; z-index: 10;">&times;</button>
      <img src="" class="image-modal-img" id="gallery-expanded-img" alt="Vista expandida" />
      <button id="gallery-wsp-btn" class="btn btn--primary" style="margin-top: 10px; width: auto; padding: 10px 24px;">Pedir por WhatsApp</button>
    </div>
  `;
  document.body.appendChild(modalContainer);

  const imgEl = document.getElementById('gallery-expanded-img');
  const closers = modalContainer.querySelectorAll('.js-gallery-close');
  const wspBtn = document.getElementById('gallery-wsp-btn');

  images.forEach(img => {
    img.addEventListener('click', () => {
      imgEl.src = img.src;
      modalContainer.classList.add('is-active');
    });
  });

  closers.forEach(closer => {
    closer.addEventListener('click', () => {
      modalContainer.classList.remove('is-active');
    });
  });

  // Close when clicking the content area outside the image
  const contentArea = modalContainer.querySelector('.image-modal-content');
  contentArea.addEventListener('click', (e) => {
    if (e.target === contentArea) {
      modalContainer.classList.remove('is-active');
    }
  });

  // WhatsApp button redirect
  wspBtn.addEventListener('click', () => {
    const msg = '¡Hola! Quiero pedir el libro "Permanecer" que vi en la galería.';
    openWhatsApp(msg);
  });
}

// ── Hamburger menu toggle ──
function setupHamburger() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Esc Key global listener ──
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCart();
  }
});

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  setupGeneralButtons();
  setupModal();
  setupCart();
  setupReveal();
  setupHeaderScroll();
  setupSmoothScroll();
  setupHamburger();
  setupImageModal();

  window.removeFromCart = removeFromCart;
});
