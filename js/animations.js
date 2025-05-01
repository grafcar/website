/**
 * Apple-style animations for Grafcar Website
 * This script handles scroll animations, parallax effects, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initNavbarAnimation();
    initScrollAnimations();
    initSmoothScrolling();
});

/**
 * Handle navbar show/hide on scroll
 */
function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide navbar and footer based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past threshold
            navbar.classList.add('hidden');
            footer.classList.add('hidden');
        } else {
            // Scrolling up or at top
            navbar.classList.remove('hidden');
            footer.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Initialize animations for elements as they scroll into view
 */
function initScrollAnimations() {
    // Select all elements that should animate on scroll
    const sections = document.querySelectorAll('.section');
    const sectionTitles = document.querySelectorAll('.section-title');
    const projectCards = document.querySelectorAll('.project-card');
    const contentBlocks = document.querySelectorAll('.about-content, .education-content, .skills-container');
    
    // Add animation classes to elements
    contentBlocks.forEach(block => block.classList.add('animate-on-scroll'));
    projectCards.forEach(card => card.classList.add('animate-on-scroll'));
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation to children if it's a container
                if (entry.target.classList.contains('skills-container') || 
                    entry.target.classList.contains('about-content') ||
                    entry.target.classList.contains('education-content')) {
                    
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.animationDelay = `${0.1 * index}s`;
                        child.style.opacity = '0';
                        child.style.animation = 'fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
                    });
                }
            }
        });
    }, { threshold: 0.15 });
    
    // Observe elements
    contentBlocks.forEach(block => observer.observe(block));
    projectCards.forEach(card => observer.observe(card));
    sections.forEach(section => observer.observe(section));
}

/**
 * Add subtle effect to hero section only
 */
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    
    // Subtle effect on hero section only
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const heroContent = heroSection.querySelector('.hero-content');
            
            if (heroContent && scrollTop < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollTop * 0.2}px)`;
                heroContent.style.opacity = 1 - (scrollTop * 0.002);
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate the target position with navbar offset
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            // Apple-style smooth scrolling with slight bounce
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });
}

/**
 * Add hover effects to interactive elements
 */
document.addEventListener('mouseover', (e) => {
    // Add subtle scale effect to buttons on hover
    if (e.target.classList.contains('btn')) {
        const btn = e.target;
        btn.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
});

// No elastic scrolling effect