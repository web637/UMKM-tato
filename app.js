/* ============================================================
   MAGIC INK — Premium JS 2026
   ============================================================ */

// ===== CUSTOM CURSOR (Desktop only) =====
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
const cursorGlow = document.getElementById('cursorGlow');

if (cursor && window.innerWidth > 768) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;

    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';

    cursorGlow.style.left = mx + 'px';
    cursorGlow.style.top  = my + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states
  document.querySelectorAll('a, button, .gallery-item, .price-box, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width  = '60px';
      cursorRing.style.height = '60px';
      cursorRing.style.borderColor = 'rgba(236,72,153,0.6)';
      cursor.style.background = '#ec4899';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width  = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'rgba(6,182,212,0.5)';
      cursor.style.background = '#06b6d4';
    });
  });
}

// ===== LOADER =====
let loadVal = 0;
const fill  = document.getElementById('loadFill');
const loader = document.getElementById('loader');

const loadInterval = setInterval(() => {
  loadVal += Math.random() * 4 + 1;
  if (loadVal >= 100) {
    loadVal = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        window.scrollTo(0, 0);
      }, 600);
    }, 300);
  }
  if (fill) fill.style.width = loadVal + '%';
}, 35);

// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(count) + suffix;
  }, 25);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el     = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || (target === 100 ? '%' : target <= 3 ? 'x' : '+');
      animateCounter(el, target, suffix === '%' ? '%' : suffix === 'x' ? 'x' : '+');
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObs.observe(el));

// ===== BEFORE AFTER SLIDER =====
const slider  = document.getElementById('slider');
const afterEl = document.getElementById('afterImg');

if (slider && afterEl) {
  const update = () => {
    afterEl.style.width = slider.value + '%';
  };
  slider.addEventListener('input', update);
  update();
}

// ===== GALLERY FILTER =====
function filterGallery(type, e) {
  const items   = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.filter-buttons button');

  buttons.forEach(btn => btn.classList.remove('active'));
  if (e && e.target) e.target.classList.add('active');

  items.forEach((item, i) => {
    const show = type === 'all' || item.classList.contains(type);
    item.style.display = show ? 'block' : 'none';
    if (show) {
      item.style.animation = 'none';
      item.offsetHeight; // reflow
      item.style.animation = `fadeIn 0.5s ${i * 0.04}s forwards`;
    }
  });
}

// ===== LIGHTBOX =====
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lbClose     = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

if (lightbox)  lightbox.addEventListener('click', closeLightbox);
if (lbClose)   lbClose.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== RIPPLE EFFECT =====
document.querySelectorAll('.fx').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + 'px';
    ripple.style.top  = e.clientY - rect.top  + 'px';
    ripple.style.width = ripple.style.height = '10px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ===== BOOKING =====
function scrollBooking() {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function kirim() {
  const nama   = document.getElementById('nama').value.trim();
  const desain = document.getElementById('desain').value.trim();
  const jenis  = document.getElementById('jenis').value;

  if (!nama || !desain) {
    // Shake animation on empty
    const form = document.querySelector('.booking');
    form.style.animation = 'shake 0.4s ease';
    setTimeout(() => form.style.animation = '', 500);
    return;
  }

  const text = `Halo Magic Ink 🖤\n\nNama: ${nama}\nDesain: ${desain}\nJenis: ${jenis}\n\nSaya ingin booking tattoo temporary 🎨`;
  window.open('https://wa.me/628881190614?text=' + encodeURIComponent(text));
}

// Shake keyframes via JS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}`;
document.head.appendChild(shakeStyle);

// ===== SCROLL TO PORTFOLIO =====
function scrollPortfolio() {
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
}

// ===== SOCIAL LINKS =====
function wa()     { window.open('https://wa.me/628881190614', '_blank'); }
function ig()     { window.open('https://instagram.com/magicinktattootemporary', '_blank'); }
function tiktok() { window.open('https://tiktok.com/@magicinktattootemporary', '_blank'); }
function openIg() { window.open('https://instagram.com/benyoriki', '_blank'); }

// ===== PARALLAX HERO VIDEO =====
const heroVideo = document.querySelector('.hero video');
window.addEventListener('scroll', () => {
  if (!heroVideo) return;
  const scroll = window.scrollY;
  heroVideo.style.transform = `scale(1.05) translateY(${scroll * 0.25}px)`;
}, { passive: true });

// ===== MAGNETIC BUTTONS =====
if (window.innerWidth > 768) {
  document.querySelectorAll('.btn, .social-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      this.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// ===== GALLERY ITEM TILT =====
if (window.innerWidth > 768) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top ) / rect.height - 0.5;
      this.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.03)`;
    });
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px; width: 0%;
  background: linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899);
  z-index: 99999; transition: width 0.1s linear; pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const h   = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });