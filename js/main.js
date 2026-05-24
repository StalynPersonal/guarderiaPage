// ── Menú móvil ──────────────────────────────────────────────────────────────
const btnMenu   = document.getElementById("btn-menu");
const menuMovil = document.getElementById("menu-movil");

if (btnMenu && menuMovil) {
    btnMenu.addEventListener("click", () => {
        const abierto = menuMovil.classList.toggle("hidden");
        btnMenu.setAttribute("aria-expanded", String(!abierto));
    });

    // Cerrar el menú al hacer clic en un enlace
    menuMovil.querySelectorAll("a").forEach(enlace => {
        enlace.addEventListener("click", () => menuMovil.classList.add("hidden"));
    });
}

// ── Navbar: agregar sombra al hacer scroll ───────────────────────────────────
const navbar = document.getElementById("navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("shadow-md", window.scrollY > 10);
    });
}

// ── Scroll suave para enlaces ancla ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener("click", e => {
        const destino = document.querySelector(enlace.getAttribute("href"));
        if (destino) {
            e.preventDefault();
            destino.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ── Animación de entrada al hacer scroll (Intersection Observer) ─────────────
const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("opacity-100", "translate-y-0");
                entrada.target.classList.remove("opacity-0", "translate-y-8");
                observador.unobserve(entrada.target); // animar solo una vez
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".animar-entrada").forEach(el => {
    el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
    observador.observe(el);
});

// ── Carrusel del hero ────────────────────────────────────────────────────────
(function iniciarCarrusel() {
    const contenedor = document.getElementById("hero-carousel");
    if (!contenedor) return;

    const slides     = Array.from(contenedor.querySelectorAll(".slide"));
    const dots       = Array.from(contenedor.querySelectorAll(".dot"));
    const btnPrev    = document.getElementById("carousel-prev");
    const btnNext    = document.getElementById("carousel-next");
    const INTERVALO  = 4500;  // ms entre cambios automáticos
    let   actual     = 0;
    let   temporizador;

    // ── Activa el slide indicado ─────────────────────────────────────────
    function irA(n) {
        // ocultar slide actual
        slides[actual].classList.remove("opacity-100");
        slides[actual].classList.add("opacity-0");

        // dot actual → inactivo
        dots[actual].classList.remove("w-6", "bg-white");
        dots[actual].classList.add("w-2", "bg-white/40");

        // nuevo índice (circular)
        actual = (n + slides.length) % slides.length;

        // mostrar nuevo slide
        slides[actual].classList.remove("opacity-0");
        slides[actual].classList.add("opacity-100");

        // dot nuevo → activo
        dots[actual].classList.remove("w-2", "bg-white/40");
        dots[actual].classList.add("w-6", "bg-white");
    }

    // ── Auto-play ────────────────────────────────────────────────────────
    function iniciar() {
        temporizador = setInterval(() => irA(actual + 1), INTERVALO);
    }

    function detener() {
        clearInterval(temporizador);
    }

    // ── Inicializar primer slide ─────────────────────────────────────────
    slides[0].classList.add("opacity-100");
    slides[0].classList.remove("opacity-0");
    dots[0].classList.add("w-6", "bg-white");
    dots[0].classList.remove("w-2", "bg-white/40");

    // ── Controles de flechas ─────────────────────────────────────────────
    btnPrev?.addEventListener("click", () => {
        detener();
        irA(actual - 1);
        iniciar();
    });

    btnNext?.addEventListener("click", () => {
        detener();
        irA(actual + 1);
        iniciar();
    });

    // ── Dots: clic directo ───────────────────────────────────────────────
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            detener();
            irA(i);
            iniciar();
        });
    });

    // ── Pausar al pasar el mouse sobre el carrusel ───────────────────────
    contenedor.addEventListener("mouseenter", detener);
    contenedor.addEventListener("mouseleave", iniciar);

    // ── Soporte swipe (táctil) ───────────────────────────────────────────
    let touchX = 0;
    contenedor.addEventListener("touchstart", e => {
        touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    contenedor.addEventListener("touchend", e => {
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {           // umbral: 40px
            detener();
            irA(diff > 0 ? actual + 1 : actual - 1);
            iniciar();
        }
    }, { passive: true });

    iniciar();
})();