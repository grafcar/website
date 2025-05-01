// ... existing code ...

const navName = document.getElementById('nav-name');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navName.textContent = 'Home';
    } else {
        navName.textContent = 'Bryan De Los Santos';
    }
});

navName.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ... existing code ...