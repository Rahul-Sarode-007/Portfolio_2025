// ============================================
// MIND-BLOWING PORTFOLIO - ADVANCED JAVASCRIPT
// Rahul Sarode - Satcom Specialist
// ============================================

// ============================================
// CUSTOM CURSOR - DISABLED

// Cursor hover effects
document.querySelectorAll('a, button, .btn, .competency-card, .cert-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
});

// ============================================
// PARTICLE BACKGROUND
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 136, 255, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 136, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// SCROLL PROGRESS
// ============================================
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    scrollObserver.observe(el);
});

// ============================================
// TECH STACK CIRCULAR PROGRESS
// ============================================
const techItems = document.querySelectorAll('.tech-item');

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const progress = item.getAttribute('data-progress');

            item.style.setProperty('--progress', progress);

            const index = Array.from(techItems).indexOf(item);
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 150);

            techObserver.unobserve(item);
        }
    });
}, { threshold: 0.2 });

techItems.forEach(item => {
    techObserver.observe(item);
});

// ============================================
// MAGNETIC HOVER EFFECT FOR BUTTONS
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ============================================
// 3D TILT EFFECT FOR CARDS
// ============================================
document.querySelectorAll('.competency-card, .cert-card, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Disable effects on mobile
if (window.innerWidth < 768) {
    document.querySelectorAll('.custom-cursor, .cursor-trail').forEach(el => {
        el.style.display = 'none';
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Portfolio Loaded!', 'color: #0088FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with advanced CSS, vanilla JavaScript, and lots of ❤️', 'color: #8892b0; font-size: 12px;');

// ============================================
// PREMIUM CAROUSEL - COMPETENCIES SECTION
// Fresh Build - Clean & Working
// ============================================

(function () {
    'use strict';

    // Get carousel elements
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');

    // Exit if no carousel found
    if (!slides.length || !leftArrow || !rightArrow) {
        console.log('Carousel: No elements found');
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Show a specific slide
    function showSlide(index) {
        // Remove active from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Activate the target slide
        slides[index].classList.add('active');

        // Activate the target indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        // Update current slide index
        currentSlide = index;
    }

    // Go to next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % totalSlides;
        showSlide(newIndex);
    }

    // Go to previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(newIndex);
    }

    // Event Listeners
    leftArrow.addEventListener('click', prevSlide);
    rightArrow.addEventListener('click', nextSlide);

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch/Swipe support
    let touchStartX = 0;
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide(); // Swipe left = next
                } else {
                    prevSlide(); // Swipe right = prev
                }
            }
        }, { passive: true });
    }

    // Initialize - show first slide
    showSlide(0);

    console.log('🎠 Carousel initialized:', totalSlides, 'slides');
})();
