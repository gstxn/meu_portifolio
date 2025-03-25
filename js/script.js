// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Start animations after preloader is hidden
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('animated');
            }
        });
    }, 500);
});

// Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle.querySelector('i')) {
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark-theme');
    
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonial Slider
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateX(20px)';
    });
    
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].style.display = 'block';
    setTimeout(() => {
        testimonials[index].style.opacity = '1';
        testimonials[index].style.transform = 'translateX(0)';
    }, 100);
    testimonialDots[index].classList.add('active');
}

// Initialize testimonial slider
showTestimonial(currentTestimonial);

// Add click event to dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
        currentTestimonial = index;
        resetTestimonialInterval();
    });
});

// Auto slide testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log({ name, email, subject, message });
        
        // Show success message
        const formButton = contactForm.querySelector('button[type="submit"]');
        const originalText = formButton.textContent;
        formButton.textContent = 'Mensagem Enviada ✓';
        formButton.disabled = true;
        formButton.style.backgroundColor = '#10b981';
        
        // Reset form and button after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formButton.textContent = originalText;
            formButton.disabled = false;
            formButton.style.backgroundColor = '';
        }, 3000);
    });
}

// Animation on Scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
});

// Add animate-on-scroll class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = [
        '.about-content',
        '.skill-category',
        '.project-card',
        '.timeline-item',
        '.testimonial',
        '.contact-info',
        '.contact-form'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(preloader);
    
    // Create back to top button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    // Create theme switcher
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switch';
    themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeSwitcher);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.back-to-top')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Theme Switcher
document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-switch')) {
        const themeSwitch = document.querySelector('.theme-switch');
        const icon = themeSwitch.querySelector('i');
        
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    }
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeSwitch = document.querySelector('.theme-switch');
        if (themeSwitch) {
            const icon = themeSwitch.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-sun';
            }
        }
    }
});

// Skill progress animation
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('style').replace('width: 0px;', '');
            bar.style.width = width;
        });
    }, 500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Service Modals
const serviceLinks = document.querySelectorAll('.service-link');
const serviceModals = document.querySelectorAll('.service-modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Open modal when clicking on service link
serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceType = link.getAttribute('data-service');
        const modal = document.getElementById(`${serviceType}-modal`);
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    });
});

// Close modal when clicking on close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.service-modal');
        
        // Hide modal with animation
        modal.classList.remove('active');
        
        // Re-enable scrolling after animation completes
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    });
});

// Close modal when clicking outside of modal content
serviceModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            // Hide modal with animation
            modal.classList.remove('active');
            
            // Re-enable scrolling after animation completes
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 300);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.service-modal.active');
        if (activeModal) {
            // Hide modal with animation
            activeModal.classList.remove('active');
            
            // Re-enable scrolling after animation completes
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 300);
        }
    }
});