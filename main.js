function fullScreen(){
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Add mobile check function
function isMobile() {
    return window.innerWidth <= 768;
}

fullScreen();
window.addEventListener('resize', fullScreen);

document.addEventListener('DOMContentLoaded', () => {
    // Add debug message at the very beginning
    console.log('DOM Content Loaded - Starting script');
    
    // Get DOM elements
    const navbar = document.querySelector('.navbar');
    const navBrand = document.querySelector('.nav-brand');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Only set up animations if not on mobile
    if (!isMobile()) {
        // Intersection Observer for animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to the section
                    entry.target.classList.add('visible');
                    
                    // Only animate section content, not the section itself
                    const sectionContent = entry.target.querySelectorAll('.section-content');
                    sectionContent.forEach(content => {
                        setTimeout(() => {
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }, 100); // Slight delay for visual polish
                    });
                }
            });
        }, observerOptions);

        // Observe all sections for animations
        document.querySelectorAll('.section').forEach(section => {
            sectionObserver.observe(section);
        });

        // Special observer for about section elements with more refined animations
        const aboutObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const aboutElementObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150); // 150ms staggered delay
                }
            });
        }, aboutObserverOptions);

        // Observe about section elements
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Observe individual elements for staggered animations
            const aboutImage = aboutSection.querySelector('.about-image');
            const aboutTextElements = aboutSection.querySelectorAll('.about-text p');
            
            if (aboutImage) aboutElementObserver.observe(aboutImage);
            aboutTextElements.forEach((element) => {
                aboutElementObserver.observe(element);
            });
        }

        // Special observer for education section elements
        const educationObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const educationElementObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Handle education header and image
                    if (entry.target.classList.contains('education-header')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                    // Handle education image
                    else if (entry.target.classList.contains('education-image')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                    // Handle course cards container
                    else if (entry.target.classList.contains('education-courses')) {
                        const cards = entry.target.querySelectorAll('.course-card');
                        cards.forEach((card, index) => {
                            // Calculate a more natural delay based on the card's position
                            const delay = index * 200; // 200ms between each card
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) translateY(0)';
                            }, delay);
                        });
                    }
                }
            });
        }, educationObserverOptions);

        // Observe education section elements
        const educationSection = document.getElementById('education');
        if (educationSection) {
            // Observe individual elements
            const educationHeader = educationSection.querySelector('.education-header');
            const educationImage = educationSection.querySelector('.education-image');
            const educationCourses = educationSection.querySelector('.education-courses');
            
            if (educationHeader) educationElementObserver.observe(educationHeader);
            if (educationImage) educationElementObserver.observe(educationImage);
            if (educationCourses) educationElementObserver.observe(educationCourses);
        }
    } else {
        // On mobile, immediately show all content without animations
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('visible');
            const sectionContent = section.querySelectorAll('.section-content');
            sectionContent.forEach(content => {
                content.style.opacity = '1';
                content.style.transform = 'none';
            });
        });
    }

    // Change brand name on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navBrand.textContent = 'Home';
        } else {
            navBrand.textContent = 'Bryan De Los Santos';
        }
    });

    // Smooth scroll to top when clicking the brand
    navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Close mobile menu and restore scroll before scrolling to section
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
                
                // Add a small delay to ensure the menu is closed before scrolling
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });

    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent this click from immediately closing the menu
        navLinksContainer.classList.toggle('active');
        // Toggle body scroll lock
        document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside or on a nav link
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('active')) {
            const isClickInsideMenu = navLinksContainer.contains(e.target);
            const isClickOnMenuButton = mobileMenuBtn.contains(e.target);

            if (!isClickInsideMenu && !isClickOnMenuButton) {
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            }
        }
    });

    const slides = document.querySelector('.slider-content');
    const slideItems = document.querySelectorAll('.slide-image-container');
    let currentIndex = 0;
    let start = 0;
    let isDragging = false;

    function showSlide(index){
    if (index < 0){
        index =  slideItems.length -1;
    } else if (index >= slideItems.length){
        index = 0;
    }
    currentIndex = index;
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    slides.addEventListener('touchstart', (e)=>{
        start = e.touches[0].clientX;
        isDragging = true;
        console.log('start', start);
    }
    );

    slides.addEventListener('touchmove', (e)=>{
        if (!isDragging) return;
        let move = e.touches[0].clientX;
        let diff = start - move;

        if (diff > 50){
            showSlide(currentIndex + 1);
            isDragging = false;
        }else if (diff < -50){
            showSlide(currentIndex - 1);
            isDragging = false;
        }
    }
    );

    slides.addEventListener('touchend', ()=>{
        isDragging = false;
    }
    );

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    });

    // Subtle parallax effect for about section
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImage && aboutText) {
        // Only apply parallax after initial animation completes
        let animationComplete = false;
        
        // Wait for initial animations to complete
        setTimeout(() => {
            animationComplete = true;
        }, 1500); // Slightly longer than our longest animation
        
        window.addEventListener('scroll', () => {
            // Skip parallax if animations haven't completed
            if (!animationComplete) return;
            
            const aboutSection = document.getElementById('about');
            const rect = aboutSection.getBoundingClientRect();
            
            // Only apply parallax when section is visible
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPosition = window.scrollY;
                const viewportHeight = window.innerHeight;
                const sectionTop = aboutSection.offsetTop;
                
                // Calculate how far into the section we've scrolled (0-1)
                const scrollProgress = (scrollPosition - sectionTop + viewportHeight) / (aboutSection.offsetHeight + viewportHeight);
                
                // Only apply within a reasonable range
                if (scrollProgress >= 0 && scrollProgress <= 1) {
                    // Apply subtle translation
                    const moveY = scrollProgress * 20; // 20px max movement
                    
                    // Use transform: translate3d for hardware acceleration
                    aboutImage.style.transform = `translate3d(0, ${-moveY}px, 0)`;
                    aboutText.style.transform = `translate3d(0, ${moveY/2}px, 0)`;
                }
            }
        }, { passive: true }); // Optimize scroll performance
    }

    // NOTE: Glide.js is now initialized directly in the HTML
    // to ensure it works properly and avoid conflicts

});