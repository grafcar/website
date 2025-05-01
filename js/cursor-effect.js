/**
 * Apple-style cursor effects
 * Creates subtle cursor interactions similar to Apple's website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    // Add cursor styles to the document
    addCursorStyles();
    
    // Initialize cursor effects
    initCursorEffects(cursorDot);
});

/**
 * Add required CSS for cursor effects
 */
function addCursorStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Custom cursor styles */
        body {
            cursor: none;
        }
        
        a, button, .btn, .nav-links a, .project-card {
            cursor: none;
        }
        
        .cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 8px;
            height: 8px;
            background-color: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.8;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, opacity 0.2s;
            mix-blend-mode: difference;
        }
        
        .cursor-dot.hover {
            width: 24px;
            height: 24px;
            opacity: 0.5;
            background-color: white;
            mix-blend-mode: difference;
        }
        
        /* Only use custom cursor on larger screens */
        @media (max-width: 768px) {
            body, a, button, .btn {
                cursor: auto;
            }
            
            .cursor-dot {
                display: none;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

/**
 * Initialize cursor effects
 */
function initCursorEffects(cursorDot) {
    // Track mouse position with smooth animation
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Update cursor position with smooth follow effect
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with subtle lag (Apple-like)
    function animateCursor() {
        // Calculate distance between current position and target
        const dx = mouseX - dotX;
        const dy = mouseY - dotY;
        
        // Move dot with smooth easing (Apple-like)
        dotX += dx * 0.2;
        dotY += dy * 0.2;
        
        // Apply position
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Handle interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-links a, .project-card');
    
    interactiveElements.forEach(el => {
        // Expand cursor on hover
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
        });
        
        // Return to normal on leave
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
        });
        
        // Add subtle magnetic effect on buttons and links
        if (el.classList.contains('btn') || el.tagName === 'A') {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate distance from center
                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                
                // Apply subtle magnetic pull (Apple-like)
                el.style.transform = `translate(${distanceX * 0.1}px, ${distanceY * 0.1}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                // Reset position with smooth transition
                el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                el.style.transform = 'translate(0, 0)';
                
                // Remove transition after animation completes
                setTimeout(() => {
                    el.style.transition = '';
                }, 500);
            });
        }
    });
}