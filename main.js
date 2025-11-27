// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
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

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .anti-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== PROCESS STEPS SEQUENTIAL ACTIVATION ====================
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 400); // Activación secuencial cada 400ms
            });
            processObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const processSection = document.querySelector('.process-timeline');
if (processSection) {
    processObserver.observe(processSection);
}

// ==================== PROCESS STEPS HOVER EFFECT ====================
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', () => {
        // Añadir efecto de brillo a los pasos anteriores
        processSteps.forEach((s, i) => {
            if (i <= index) {
                s.querySelector('.process-number').style.borderColor = 'var(--color-primary)';
            }
        });
    });
    
    step.addEventListener('mouseleave', () => {
        // Restaurar estados
        processSteps.forEach((s, i) => {
            if (!s.classList.contains('active')) {
                s.querySelector('.process-number').style.borderColor = '#e5e7eb';
            }
        });
    });
});

// ==================== PARALLAX EFFECT FOR HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelector('.hero-shapes');
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroShapes && scrolled < window.innerHeight) {
        heroShapes.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroGradient && scrolled < window.innerHeight) {
        heroGradient.style.transform = `rotate(-15deg) translateY(${scrolled * 0.1}px)`;
    }
});

// ==================== MOBILE MENU TOGGLE ====================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ==================== FORM HANDLING ====================
const ctaForm = document.querySelector('.cta-form');

if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message (you can customize this)
        alert('¡Gracias por contactarnos! Te responderemos en menos de 24 horas.');
        
        // Reset form
        e.target.reset();
    });
}