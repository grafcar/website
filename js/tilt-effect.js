/**
 * Apple-style 3D tilt effect
 * Creates subtle 3D perspective tilt on cards and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tilt effect on project cards and interactive elements
    initTiltEffect();
});

/**
 * Initialize 3D tilt effect on elements
 */
function initTiltEffect() {
    // Select elements that should have the tilt effect
    const tiltElements = document.querySelectorAll('.project-card, .btn, .section-title');
    
    tiltElements.forEach(element => {
        // Add event listeners for mouse movement
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
        element.addEventListener('mouseenter', () => {
            // Add subtle transition when entering
            element.style.transition = 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)';
            setTimeout(() => {
                // Remove transition for smooth tilt movement
                element.style.transition = '';
            }, 200);
        });
        
        // Add 3D transform style
        element.style.transformStyle = 'preserve-3d';
        element.style.backfaceVisibility = 'hidden';
    });
}

/**
 * Handle tilt effect based on mouse position
 */
function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    // Calculate mouse position relative to element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    
    // Calculate tilt angle (maximum 5 degrees - subtle like Apple)
    const tiltX = (0.5 - yPercent) * 5;
    const tiltY = (xPercent - 0.5) * 5;
    
    // Apply transform with perspective
    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Add subtle highlight effect
    updateHighlight(element, xPercent, yPercent);
}

/**
 * Reset element to original position
 */
function resetTilt(e) {
    const element = e.currentTarget;
    
    // Add transition for smooth reset
    element.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    // Reset highlight
    if (element.querySelector('.highlight')) {
        element.querySelector('.highlight').remove();
    }
    
    // Remove transition after animation completes
    setTimeout(() => {
        element.style.transition = '';
    }, 500);
}

/**
 * Add subtle highlight effect based on mouse position
 */
function updateHighlight(element, xPercent, yPercent) {
    // Create or get highlight element
    let highlight = element.querySelector('.highlight');
    
    if (!highlight) {
        highlight = document.createElement('div');
        highlight.classList.add('highlight');
        highlight.style.position = 'absolute';
        highlight.style.top = '0';
        highlight.style.left = '0';
        highlight.style.right = '0';
        highlight.style.bottom = '0';
        highlight.style.pointerEvents = 'none';
        highlight.style.borderRadius = 'inherit';
        highlight.style.zIndex = '1';
        highlight.style.opacity = '0.1';
        highlight.style.background = 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)';
        element.appendChild(highlight);
    }
    
    // Position the highlight based on mouse
    const x = xPercent * 100;
    const y = yPercent * 100;
    highlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`;
}