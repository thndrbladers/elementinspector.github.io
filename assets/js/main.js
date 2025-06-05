// Element Inspector Website JavaScript
// Developed by Rahul Dev Ghosh

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all website functionality
    initNavigation();
    initScrollAnimations();
    initPopupDemo();
    initInstallButton();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.step-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.use-case').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Popup demo functionality (auto-cycle only)
function initPopupDemo() {
    const popup = document.querySelector('.popup-demo');
    if (!popup) return;

    const toolButtons = popup.querySelectorAll('.tool-btn');
    const toggleAllButton = popup.querySelector('.master-toggle-btn');
    const inspectionHint = popup.querySelector('.inspection-hint');
    
    let demoStep = 0;
    const demoSteps = [
        { button: 0, duration: 2500 }, // Dimensions
        { button: 1, duration: 2500 }, // Color
        { button: 2, duration: 2500 }, // Position
        { button: 3, duration: 2500 }, // Space
        { button: 4, duration: 2500 }, // Static Grid (already active by default)
        { button: 'toggle-all', duration: 3000 }, // Toggle All Tools (all buttons active)
        { button: null, duration: 1000 } // Reset state (back to Static Grid active)
    ];

    // Function to check if any tools are active and show/hide hint
    function updateInspectionHint() {
        const hasActiveTools = Array.from(toolButtons).some(btn => btn.classList.contains('active')) || 
                              (toggleAllButton && toggleAllButton.classList.contains('active'));
        
        if (inspectionHint) {
            if (hasActiveTools) {
                inspectionHint.classList.remove('hidden');
            } else {
                inspectionHint.classList.add('hidden');
            }
        }
    }

    // Auto-demo functionality only
    function runDemo() {
        // Reset all buttons except Static Grid which should stay active by default
        toolButtons.forEach((btn, index) => {
            if (index === 4) {
                // Keep Static Grid active by default
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        if (toggleAllButton) {
            toggleAllButton.classList.remove('active');
        }

        const currentStep = demoSteps[demoStep];
        
        if (currentStep.button === 'toggle-all') {
            // Activate all buttons including toggle button
            toolButtons.forEach(btn => {
                btn.classList.add('active');
            });
            if (toggleAllButton) {
                toggleAllButton.classList.add('active');
            }
        } else if (currentStep.button !== null) {
            // Reset all first
            toolButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            // Highlight current button
            const targetButton = toolButtons[currentStep.button];
            if (targetButton) {
                targetButton.classList.add('active');
            }
        } else {
            // Reset state - return to Static Grid being active by default
            toolButtons.forEach((btn, index) => {
                if (index === 4) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // Update inspection hint visibility
        updateInspectionHint();
        
        demoStep = (demoStep + 1) % demoSteps.length;
    }

    // Set Static Grid as active by default initially
    if (toolButtons[4]) {
        toolButtons[4].classList.add('active');
    }
    
    // Show inspection hint initially since Static Grid is active
    updateInspectionHint();

    // Start auto-demo
    setTimeout(runDemo, 1000); // Initial delay
    setInterval(runDemo, 2500);
}

// Enhanced install button functionality
function initInstallButton() {
    const installButtons = document.querySelectorAll('#install-button, #install-button-2');
    
    installButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                  // Check if Chrome Web Store URL is available
                const extensionId = 'oogiokppjhndhhpfkbfnnffhlphedohh'; // Element Inspector Chrome Web Store ID
                
                if (extensionId !== 'YOUR_EXTENSION_ID') {
                    // Extension is published, redirect to Chrome Web Store
                    window.open(`https://chromewebstore.google.com/detail/element-inspector-precisi/${extensionId}`, '_blank');
                } else {
                    // Extension not yet published, show instructions
                    showInstallInstructions();
                }
            });
        }
    });
}

// Show install instructions modal
function showInstallInstructions() {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        border: 1px solid rgba(100, 255, 218, 0.3);
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        margin: 1rem;
        color: white;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;    modalContent.innerHTML = `
        <h3 style="color: #64ffda; margin-bottom: 1rem;">Extension Coming Soon!</h3>
        <p style="margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.8);">
            Extension will soon be available on Chrome Web Store.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button id="close-modal" style="
                background: linear-gradient(135deg, #64ffda, #00bcd4);
                color: #1a1a2e;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">OK</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);    // Event listeners
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                let offsetTop;
                if (window.location.pathname.includes('privacy.html')) {
                    // Use bounding rect for accurate position relative to viewport
                    const navbarOffset = 100; // Increased for more space
                    const rect = target.getBoundingClientRect();
                    // Scroll so the section is just below the navbar
                    offsetTop = window.scrollY + rect.top - navbarOffset;
                    // Clamp to document bounds
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                    offsetTop = Math.max(0, Math.min(offsetTop, maxScroll));
                } else {
                    offsetTop = target.offsetTop - 70;
                }
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function for element visibility
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

// Add hover effects to feature cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
