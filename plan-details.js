// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== GET PLAN FROM URL & UPDATE PAGE ====================
function updatePlanInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');

    if (plan) {
        const planNames = {
            'despegue': 'Plan Despegue',
            'orbita': 'Plan Órbita',
            'constelacion': 'Plan Constelación'
        };

        const planName = planNames[plan] || 'Plan Seleccionado';

        // Update badge
        const planBadge = document.getElementById('planBadge');
        if (planBadge) {
            planBadge.textContent = planName;
        }

        // Update page title
        document.title = `${planName} - Cotiza tu Plan | VULIX`;

        // Pre-select the plan in the form
        const planSelect = document.getElementById('selectedPlan');
        if (planSelect) {
            planSelect.value = plan;
        }
    }
}

// Run on page load
updatePlanInfo();

// ==================== FORM HANDLING ====================
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Here you would typically send the data to your server
        console.log('Quote form submitted:', data);

        // Show success message
        alert('¡Gracias! Hemos recibido tu solicitud de cotización. Te contactaremos en menos de 24 horas para darte los siguientes pasos.');

        // Optionally redirect or reset form
        // e.target.reset();
        // window.location.href = 'gracias.html';
    });
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top with animation
    scrollToTopBtn.addEventListener('click', () => {
        scrollToTopBtn.classList.add('launching');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            scrollToTopBtn.classList.remove('launching');
        }, 1000);
    });
}

// ==================== EFECTO PARALLAX ESPACIAL ====================
// Parallax suave que sigue el movimiento del mouse

const quoteSection = document.getElementById('quoteSection');
const spaceLayers = document.querySelectorAll('.space-layer');

// Detectar si es dispositivo móvil
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (quoteSection && spaceLayers.length > 0 && !isMobile) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Escuchar movimiento del mouse
    quoteSection.addEventListener('mousemove', (e) => {
        const rect = quoteSection.getBoundingClientRect();

        // Calcular posición del mouse relativa al centro (valores entre -1 y 1)
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    // Animación suave con requestAnimationFrame
    function animateParallax() {
        // Interpolación suave (easing)
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        // Aplicar transformación a cada capa según su velocidad
        spaceLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
            const moveX = currentX * 50 * speed; // Máximo 50px de movimiento
            const moveY = currentY * 50 * speed;

            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });

        requestAnimationFrame(animateParallax);
    }

    // Iniciar animación
    animateParallax();
}

// ==================== GLOW QUE SIGUE AL MOUSE ====================
// Doble halo de luz interactivo que persigue el cursor

const formGlowContainer = document.getElementById('formGlowContainer');

if (formGlowContainer) {
    // Variables para suavizar el movimiento del glow
    let glowX = 0;
    let glowY = 0;
    let targetX = 0;
    let targetY = 0;

    formGlowContainer.addEventListener('mousemove', (e) => {
        const rect = formGlowContainer.getBoundingClientRect();

        // Calcular posición objetivo del mouse
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    });

    // Animar el glow con suavizado (easing)
    function animateGlow() {
        // Interpolación suave para efecto fluido
        glowX += (targetX - glowX) * 0.15;
        glowY += (targetY - glowY) * 0.15;

        // Actualizar variables CSS para ambos halos
        formGlowContainer.style.setProperty('--x', `${glowX}px`);
        formGlowContainer.style.setProperty('--y', `${glowY}px`);

        requestAnimationFrame(animateGlow);
    }

    // Iniciar animación del glow
    animateGlow();
}
