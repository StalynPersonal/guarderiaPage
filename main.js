/* =====================================================
   Creceré — main.js
   ===================================================== */

/* ── Navbar: sombra al hacer scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadow-md', window.scrollY > 10);
});

/* ── Menú móvil ── */
const btnMenu   = document.getElementById('btn-menu');
const menuMovil = document.getElementById('menu-movil');

btnMenu.addEventListener('click', () => {
  const abierto = menuMovil.classList.toggle('hidden') === false;
  btnMenu.setAttribute('aria-expanded', abierto);
});

// Cerrar menú al hacer clic en un enlace
menuMovil.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuMovil.classList.add('hidden');
    btnMenu.setAttribute('aria-expanded', false);
  });
});

/* ── Carrusel hero ── */
(function () {
  const slides = document.querySelectorAll('#hero-carousel .slide');
  const dots   = document.querySelectorAll('#hero-carousel .dot');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('opacity-100');
    slides[current].classList.add('opacity-0');
    dots[current].classList.remove('w-6', 'bg-white');
    dots[current].classList.add('w-2', 'bg-white/40');

    current = (index + slides.length) % slides.length;

    slides[current].classList.remove('opacity-0');
    slides[current].classList.add('opacity-100');
    dots[current].classList.remove('w-2', 'bg-white/40');
    dots[current].classList.add('w-6', 'bg-white');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4000);
  }

  // Inicializar
  goTo(0);
  resetTimer();

  btnNext.addEventListener('click', () => { next(); resetTimer(); });
  btnPrev.addEventListener('click', () => { prev(); resetTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  });
})();

/* ── Animación de entrada al hacer scroll ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animar-entrada').forEach(el => observer.observe(el));
