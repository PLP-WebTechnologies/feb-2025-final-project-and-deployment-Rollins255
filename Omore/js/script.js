// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Testimonial Slider
    if (document.querySelector('.testimonial-slider')) {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        });

        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        }, 5000);

        // Star rating for testimonial form
        const stars = document.querySelectorAll('.rating-input i');
        const ratingInput = document.getElementById('rating');

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                ratingInput.value = value;
                
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            if (name.value.trim() === '') {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }

            if (email.value.trim() === '' || !email.value.includes('@')) {
                isValid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }

            if (message.value.trim() === '') {
                isValid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }

            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For demo purposes, we'll just show a success message
                document.getElementById('formSuccess').style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    // Testimonial Form Submission
    const testimonialForm = document.getElementById('addTestimonialForm');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const location = document.getElementById('location');
            const testimonial = document.getElementById('testimonial');
            const rating = document.getElementById('rating');
            let isValid = true;

            if (name.value.trim() === '') {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }

            if (location.value.trim() === '') {
                isValid = false;
                location.classList.add('error');
            } else {
                location.classList.remove('error');
            }

            if (testimonial.value.trim() === '') {
                isValid = false;
                testimonial.classList.add('error');
            } else {
                testimonial.classList.remove('error');
            }

            if (rating.value === '0') {
                isValid = false;
                document.querySelector('.rating-input').classList.add('error');
            } else {
                document.querySelector('.rating-input').classList.remove('error');
            }

            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your testimonial! It will be reviewed before publishing.');
                testimonialForm.reset();
                
                // Reset stars
                document.querySelectorAll('.rating-input i').forEach(star => {
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
                ratingInput.value = '0';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Responsive adjustments
    function handleResponsive() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            // Mobile-specific adjustments
            document.querySelectorAll('.service-items, .team-members, .mission-vision').forEach(container => {
                container.style.flexDirection = 'column';
            });
        } else {
            // Desktop adjustments
            document.querySelectorAll('.service-items, .team-members, .mission-vision').forEach(container => {
                container.style.flexDirection = 'row';
            });
        }
    }

    // Initial call and event listener for resize
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-box, .service-item, .member');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.feature-box, .service-item, .member').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);
// Trigger once on page load
window.addEventListener('load', animateOnScroll);