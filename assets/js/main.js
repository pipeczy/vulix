// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.getElementById('header');

    // Crear overlay si no existe
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }

    if (menuToggle && navMenu) {
        console.log('✅ Menu elements found');
        
        // Función para abrir menú
        function openMenu() {
            console.log('🔵 Opening menu...');
            menuToggle.classList.add('active');
            navMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            
            // Force reflow para asegurar la transición
            void navMenu.offsetWidth;
            
            console.log('✅ Menu OPENED');
        }
        
        // Función para cerrar menú
        function closeMenu() {
            console.log('🔴 Closing menu...');
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('✅ Menu CLOSED');
        }
        
        // Toggle al hacer clic en hamburguesa
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = navMenu.classList.contains('active');
            console.log('🍔 Menu toggle clicked. Current state:', isOpen ? 'OPEN' : 'CLOSED');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Cerrar al hacer clic en un link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                console.log('🔗 Link clicked:', this.textContent);
                // Pequeño delay para que se vea la selección
                setTimeout(function() {
                    closeMenu();
                }, 100);
            });
        });
        
        // Cerrar al hacer clic en el overlay
        menuOverlay.addEventListener('click', function() {
            console.log('⬛ Overlay clicked');
            closeMenu();
        });
        
        // Cerrar al hacer clic en el área vacía del menú (no en los links)
        navMenu.addEventListener('click', function(e) {
            // Si el clic es directamente en el navMenu (no en sus hijos como links o botones)
            if (e.target === navMenu) {
                console.log('📋 Menu background clicked');
                closeMenu();
            }
        });
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                console.log('⌨️ ESC pressed');
                closeMenu();
            }
        });
        
        console.log('✅ Menu initialized successfully');
        console.log('📱 Menu element:', navMenu);
        console.log('🍔 Toggle element:', menuToggle);
        console.log('⬛ Overlay element:', menuOverlay);
    } else {
        console.error('❌ Menu elements not found!');
    }
});

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

        // Hide custom service field when form is reset
        const customServiceGroup = document.getElementById('customServiceGroup');
        if (customServiceGroup) {
            customServiceGroup.style.display = 'none';
        }
    });
}

// ==================== CUSTOM SERVICE TOGGLE ====================
const serviceSelect = document.getElementById('serviceSelect');
const customServiceGroup = document.getElementById('customServiceGroup');
const customServiceInput = document.getElementById('customServiceInput');

if (serviceSelect && customServiceGroup) {
    serviceSelect.addEventListener('change', (e) => {
        if (e.target.value === 'personalizado') {
            customServiceGroup.style.display = 'block';
            customServiceInput.setAttribute('required', 'required');
        } else {
            customServiceGroup.style.display = 'none';
            customServiceInput.removeAttribute('required');
            customServiceInput.value = '';
        }
    });
}

// ==================== PARALLAX STARS EFFECT ====================
let ticking = false;

function updateParallaxStars() {
    const impulsaSection = document.querySelector('.impulsa-section');
    if (!impulsaSection) return;

    const stars = document.querySelectorAll('.parallax-star');
    const scrolled = window.pageYOffset;

    // Obtener la posición de la sección impulsa
    const sectionTop = impulsaSection.offsetTop;

    // Calcular el scroll relativo a la sección (cuánto has scrolleado desde que empieza)
    const relativeScroll = scrolled - sectionTop;

    stars.forEach((star, index) => {
        // Diferentes velocidades para cada estrella (efecto parallax más notorio)
        // Cada estrella tiene una velocidad única basada en su índice
        const speedVariation = (index % 7) + 1; // Números del 1 al 7
        const speed = speedVariation * 0.5; // Velocidades entre 0.5 y 3.5

        // Movimiento inverso al scroll: cuando bajas, las estrellas suben (negativo)
        const yOffset = -relativeScroll * speed;

        // Aplicar transformación
        star.style.transform = `translateY(${yOffset}px)`;
    });

    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallaxStars);
        ticking = true;
    }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', requestParallaxTick, { passive: true });

// Ejecutar una vez al cargar para inicializar
updateParallaxStars();

// ==================== ANIMATED COUNTER FOR METRICS ====================
function animateCounter(element, target, duration = 1500, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            // Format numbers based on type
            if (suffix === '%') {
                element.textContent = '+' + Math.floor(current) + suffix;
            } else if (suffix === 'K') {
                element.textContent = current.toFixed(1) + suffix;
            } else if (suffix === 'x') {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }
    }, 16);
}

// Observer for metric cards animation
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricCards = entry.target.querySelectorAll('.metric-card');

            // Animate each metric value
            if (metricCards[0]) {
                const conversionValue = metricCards[0].querySelector('.metric-value');
                animateCounter(conversionValue, 45, 1500, '%');
            }

            if (metricCards[1]) {
                const trafficValue = metricCards[1].querySelector('.metric-value');
                animateCounter(trafficValue, 8.2, 1500, 'K');
            }

            if (metricCards[2]) {
                const roiValue = metricCards[2].querySelector('.metric-value');
                animateCounter(roiValue, 3.8, 1500, 'x');
            }

            // Unobserve after animation
            metricsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe the mockup dashboard
const mockupDashboard = document.querySelector('.mockup-dashboard');
if (mockupDashboard) {
    metricsObserver.observe(mockupDashboard);
}


// Scroll to Top Button
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
        // Add launching animation
        scrollToTopBtn.classList.add('launching');

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Remove animation after completion
        setTimeout(() => {
            scrollToTopBtn.classList.remove('launching');
        }, 1000);
    });

    // Optional: Add particle effect on hover
    scrollToTopBtn.addEventListener('mouseenter', () => {
        createStarParticles(scrollToTopBtn);
    });
}

function createStarParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
                box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
            `;
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 3;
            const distance = 40;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }, i * 100);
    }
}

// ==================== BUTTON ROCKET LAUNCH ====================
const btnDespegue = document.getElementById('btnDespegue');

if (btnDespegue) {
    btnDespegue.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get button position
        const btnRect = btnDespegue.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        // Create rocket element
        const rocket = document.createElement('div');
        rocket.className = 'btn-rocket';
        rocket.innerHTML = `
            <div class="btn-rocket-body">
                <div class="btn-rocket-nose"></div>
                <div class="btn-rocket-window"></div>
            </div>
            <div class="btn-rocket-fins">
                <div class="btn-rocket-fin btn-rocket-fin-left"></div>
                <div class="btn-rocket-fin btn-rocket-fin-right"></div>
            </div>
            <div class="btn-rocket-flames">
                <div class="btn-rocket-flame"></div>
                <div class="btn-rocket-flame"></div>
                <div class="btn-rocket-flame"></div>
            </div>
        `;
        
        // Position rocket at button center
        rocket.style.left = btnCenterX + 'px';
        rocket.style.top = btnCenterY + 'px';
        
        document.body.appendChild(rocket);
        
        // Trigger launch animation immediately (sin setTimeout)
        requestAnimationFrame(() => {
            rocket.classList.add('launching');
        });
        
        // Remove rocket after animation
        setTimeout(() => {
            rocket.remove();
            // Redirect to contact section
            document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
        }, 1600);
        
        // Add shake effect to button
        btnDespegue.classList.add('btn-shake');
        setTimeout(() => {
            btnDespegue.classList.remove('btn-shake');
        }, 500);
    });
}

// ==================== ANIMATED COUNTER FOR METRICS ====================

