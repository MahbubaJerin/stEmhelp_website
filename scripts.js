// Particle animation
const particlesContainer = document.getElementById('particles');
const symbols = ['⚙️', '🔩', '💡', '🔬', '🚀', '🔧', '📐', '⚡'];

function createParticle() {
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 25000);
}

// Create particles at intervals
setInterval(createParticle, 2000);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 50px';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '12px 50px';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Sign Up Modal Functions
function openSignUpModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeSignUpModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Handle sign up form submission
function handleSignUp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const newsletter = formData.get('newsletter') || event.target.querySelector('input[type="checkbox"]').checked;
    
    // Here you would typically send data to your backend
    console.log('Sign up data:', { name, email, newsletter });
    
    alert(`Welcome ${name}! You've successfully signed up for stEmhelp. Check your email for access details.`);
    closeSignUpModal();
    
    // Clear form
    event.target.reset();
}

// Show modal on page load (after 3 seconds)
window.addEventListener('load', () => {
    setTimeout(() => {
        // Only show if user hasn't signed up before (you can check localStorage)
        if (!localStorage.getItem('stemhelp_user_signed_up')) {
            openSignUpModal();
        }
    }, 3000);
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('signupModal');
    if (event.target === modal) {
        closeSignUpModal();
    }
    
    const experimentModal = document.getElementById('experimentModal');
    if (event.target === experimentModal) {
        closeExperimentModal();
    }
});

// Experiment Resources Modal Functions
function openExperimentResources(experimentType) {
    const modal = document.getElementById('experimentModal');
    const title = document.getElementById('experimentTitle');
    
    if (modal && title) {
        // Set experiment specific content
        const experimentTitles = {
            'ring-pulley': 'Ring Pulley Experiment Resources',
            'flexure-cantilever': 'Flexure - Cantilever Deflection Resources',
            'flexure-beam': 'Flexure - Beam Deflection Resources'
        };
        
        title.textContent = experimentTitles[experimentType] || 'Experiment Resources';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeExperimentModal() {
    const modal = document.getElementById('experimentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showTab(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Update content based on tab
    const content = document.getElementById('resourceContent');
    if (content) {
        const tabContent = {
            'photos': '<p>📷 High-resolution photos of experiment setup, procedures, and results will be available here.</p>',
            'videos': '<p>🎥 Step-by-step instructional videos and demonstrations will be available here.</p>',
            'pdfs': '<p>📄 Comprehensive PDF guides, worksheets, and analysis templates will be available here.</p>'
        };
        
        content.innerHTML = tabContent[tabName] || '<p>Content loading...</p>';
    }
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name') || event.target.querySelector('input[placeholder*="Name"]').value,
        email: formData.get('email') || event.target.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || event.target.querySelector('input[type="tel"]').value,
        organization: formData.get('organization') || event.target.querySelector('input[placeholder*="Institution"]').value,
        purpose: formData.get('purpose') || event.target.querySelector('select').value,
        message: formData.get('message') || event.target.querySelector('textarea').value
    };
    
    // Validate organizational email
    const email = contactData.email;
    const personalEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    if (personalEmailDomains.includes(emailDomain)) {
        alert('Please use your organizational/institutional email address for verification purposes.');
        return;
    }
    
    // Here you would send data to your backend
    console.log('Contact form data:', contactData);
    
    alert('Thank you for your booking request! We will verify your institutional affiliation and respond within 2 business days.');
    
    // Clear form
    event.target.reset();
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add animation classes when elements come into view
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .experiment-card, .product-card, .metric-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 1000);
    }
});

// Store user signup status
function markUserAsSignedUp() {
    localStorage.setItem('stemhelp_user_signed_up', 'true');
    localStorage.setItem('stemhelp_signup_date', new Date().toISOString());
}

// Enhanced sign up handler
function handleSignUp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const newsletter = event.target.querySelector('input[type="checkbox"]').checked;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Here you would typically send data to your backend
    console.log('Sign up data:', { name, email, newsletter });
    
    // Mark user as signed up
    markUserAsSignedUp();
    
    alert(`Welcome to stEmhelp, ${name}! You've successfully signed up. Check your email for access details.`);
    closeSignUpModal();
    
    // Clear form
    event.target.reset();
}

// Enhanced contact form validation
function handleContactForm(event) {
    event.preventDefault();
    
    const name = event.target.querySelector('input[placeholder*="Name"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const phone = event.target.querySelector('input[type="tel"]').value;
    const organization = event.target.querySelector('input[placeholder*="Institution"]').value;
    const purpose = event.target.querySelector('select').value;
    const message = event.target.querySelector('textarea').value;
    
    // Validation
    if (!name || !email || !phone || !organization || !purpose || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Check for organizational email
    const personalEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'live.com', 'me.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    
    if (personalEmailDomains.includes(emailDomain)) {
        const confirmPersonal = confirm('We noticed you\'re using a personal email address. For faster verification, please use your institutional email. Do you want to continue with this email?');
        if (!confirmPersonal) {
            return;
        }
    }
    
    const contactData = { name, email, phone, organization, purpose, message };
    
    // Here you would send data to your backend
    console.log('Contact form data:', contactData);
    
    alert('Thank you for your booking request! We will verify your institutional affiliation and respond within 2 business days. Please check your email for confirmation.');
    
    // Clear form
    event.target.reset();
}

// Keyboard navigation support
document.addEventListener('keydown', (event) => {
    // Close modals with Escape key
    if (event.key === 'Escape') {
        closeSignUpModal();
        closeExperimentModal();
    }
    
    // Toggle mobile menu with Enter key when focused
    if (event.key === 'Enter' && event.target.classList.contains('mobile-menu-toggle')) {
        toggleMobileMenu();
    }
});

// Enhanced mobile menu with accessibility
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && menuToggle) {
        const isActive = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        
        // Update aria attributes for accessibility
        menuToggle.setAttribute('aria-expanded', !isActive);
        menuToggle.innerHTML = isActive ? '☰' : '✕';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && menuToggle && 
        !navLinks.contains(event.target) && 
        !menuToggle.contains(event.target) &&
        navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Smooth page transitions
function smoothTransition(callback) {
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        if (callback) callback();
        document.body.style.opacity = '1';
    }, 150);
}

// Enhanced experiment resource handler with user authentication check
function openExperimentResources(experimentType) {
    // Check if user is signed up
    if (!localStorage.getItem('stemhelp_user_signed_up')) {
        alert('Please sign up first to access experiment resources.');
        openSignUpModal();
        return;
    }
    
    const modal = document.getElementById('experimentModal');
    const title = document.getElementById('experimentTitle');
    
    if (modal && title) {
        const experimentTitles = {
            'ring-pulley': 'Ring Pulley Experiment Resources',
            'flexure-cantilever': 'Flexure - Cantilever Deflection Resources',
            'flexure-beam': 'Flexure - Beam Deflection Resources'
        };
        
        title.textContent = experimentTitles[experimentType] || 'Experiment Resources';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set default tab to photos
        const firstTab = document.querySelector('.tab-button');
        if (firstTab) {
            firstTab.click();
        }
    }
}

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced form submissions with loading states
const originalHandleSignUp = handleSignUp;
const originalHandleContactForm = handleContactForm;

function handleSignUp(event) {
    const button = event.target.querySelector('button[type="submit"]');
    addLoadingState(button);
    setTimeout(() => originalHandleSignUp(event), 100);
}

function handleContactForm(event) {
    const button = event.target.querySelector('button[type="submit"]');
    addLoadingState(button);
    setTimeout(() => originalHandleContactForm(event), 100);
}

// Add focus indicators for better accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '3px solid rgba(66, 153, 225, 0.5)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
});

// Initialize tooltips
document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('.tooltip');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Tooltip is handled by CSS, but we can add additional logic here if needed
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
if (navbar) {
    const debouncedScrollHandler = debounce(() => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 50px';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '12px 50px';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
}