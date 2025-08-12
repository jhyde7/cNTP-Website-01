// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
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
    const animateElements = document.querySelectorAll('.problem-card, .solution-card, .market-category, .market-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Log form data (for development)
        console.log('Form submitted:', formObject);
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(450px);
        transition: transform 0.3s ease;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#bee5eb'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(450px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (isNumber) {
            const targetNumber = parseInt(target);
            let current = 0;
            const increment = targetNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    current = targetNumber;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 50);
        }
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Enhanced reactor animation
document.addEventListener('DOMContentLoaded', () => {
    const plasmaZone = document.querySelector('.plasma-zone');
    if (plasmaZone) {
        setInterval(() => {
            // Add random electrical arcs
            const arc = document.createElement('div');
            arc.style.cssText = `
                position: absolute;
                width: 2px;
                height: ${20 + Math.random() * 40}px;
                                 background: linear-gradient(to bottom, #8b5cf6, transparent);
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 80}%;
                animation: electric-arc 0.3s ease-out forwards;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            plasmaZone.appendChild(arc);
            
            setTimeout(() => {
                arc.remove();
            }, 300);
        }, 500);
    }
});

// Add electrical arc animation CSS
const arcStyle = document.createElement('style');
arcStyle.textContent = `
    @keyframes electric-arc {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1);
                         box-shadow: 0 0 10px #8b5cf6;
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(arcStyle);

// Parallax effect for hero section (disabled for reactor stability)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.hero-visual');
//     
//     parallaxElements.forEach(element => {
//         const speed = 0.5;
//         element.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// });

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling;
        
        // Remove existing error
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        if (!value) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && !isValidEmail(value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email address');
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#dc3545';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Update form submission to include validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset field styles
    const fields = contactForm.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.style.borderColor = '#e9ecef';
    });
    
    // Validate form
    if (!validateForm(contactForm)) {
        showNotification('Please correct the errors below', 'error');
        return;
    }
    
    // Rest of the form submission code...
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        console.log('Form submitted:', formObject);
    }, 2000);
}); 