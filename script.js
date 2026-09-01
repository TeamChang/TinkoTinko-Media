// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an external link (portfolio.html), let it navigate normally
            if (href === 'portfolio.html') {
                return; // Don't prevent default, allow normal navigation
            }
            
            // If it's a hash link, do smooth scrolling
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 1);
        header.style.background = `rgba(247, 241, 232, ${0.85 + (opacity * 0.1)})`;
    });

    // Animate statistics on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const animateNumbers = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const finalNumber = parseInt(number.textContent.replace('+', ''));
                animateValue(number, 0, finalNumber, 2000);
                observer.unobserve(entry.target);
            }
        });
    };

    const numberObserver = new IntersectionObserver(animateNumbers, observerOptions);
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // Number animation function
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = '+' + current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Parallax effect for hero image
    const heroImage = document.querySelector('.portrait');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.1;
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Removed slow custom cursor - using default cursor for better performance

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);

    // Get In Touch / hero CTA button scroll functionality
    const scrollToContactBtnIds = ['getInTouchBtn', 'heroCtaBtn'];
    scrollToContactBtnIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Add click ripple effect to all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(ctaButton => {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            // Add ripple animation keyframes
            if (!document.querySelector('#ripple-keyframes')) {
                const rippleKeyframes = document.createElement('style');
                rippleKeyframes.id = 'ripple-keyframes';
                rippleKeyframes.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleKeyframes);
            }

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!fullName || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Show success message
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                submitButton.innerHTML = 'Message Sent!';
                submitButton.style.background = '#8fae7e';

                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
        
        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#e07a5f';
                } else if (this.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    this.style.borderColor = emailRegex.test(this.value) ? '#8fae7e' : '#e07a5f';
                } else {
                    this.style.borderColor = '#8fae7e';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '#D09B75';
            });
        });
    }
});