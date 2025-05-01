function fullScreen(){
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

fullScreen();
window.addEventListener('resize', fullScreen);

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const navbar = document.querySelector('.navbar');
    const navBrand = document.querySelector('.nav-brand');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

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
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // Smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
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
        if (window.innerWidth > 768) {
            navLinksContainer.classList.remove('active');
        }
    });
});