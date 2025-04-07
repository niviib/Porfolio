document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initMagneticButtons();
    initScrollAnimations();
    initFormSubmission();
    initCursorTrail();
    initTypewriter();
    initSkillsAnimation();
    initProjectFilter();
    initBackToTop();
    initParticles();
    initImageEffects();
    initAboutEffects();
    initFooterYear();

    // Mobile menu toggle
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navigation = document.querySelector('.navigation');
        
        if (mobileMenuToggle && navigation) {
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navigation.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
            
            // Close menu when clicking on nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (navigation.classList.contains('active')) {
                        mobileMenuToggle.classList.remove('active');
                        navigation.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                        
                        const icon = mobileMenuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            });
        }
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Magnetic button effect
    function initMagneticButtons() {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                btn.style.setProperty('--x', `${x}px`);
                btn.style.setProperty('--y', `${y}px`);
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const distanceX = x - centerX;
                const distanceY = y - centerY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
                const strength = (distance / maxDistance) * 20;
                
                btn.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate skill bars
                    if (entry.target.id === 'skills') {
                        animateSkillBars();
                    }
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('.scroll-animation').forEach(section => {
            observer.observe(section);
        });
    }

    // Contact form submission
    function initFormSubmission() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const form = e.target;
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<span>Sending...</span><div class="hover-effect"></div><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>I'll get back to you within 24 hours</p>
                        `;
                        form.parentNode.insertBefore(successMessage, form.nextSibling);
                        
                        // Hide form and show success message
                        form.style.display = 'none';
                        successMessage.style.display = 'block';
                        form.reset();
                        
                        // Reset button
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        
                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                            setTimeout(() => {
                                successMessage.remove();
                                form.style.display = 'block';
                            }, 300);
                        }, 5000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('There was an error sending your message. Please try again later.');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    // Cursor trail effect
    function initCursorTrail() {
        const cursorTrail = document.querySelector('.cursor-trail');
        let trailCoords = { x: 0, y: 0 };
        let animationFrame;
        
        if (cursorTrail) {
            document.addEventListener('mousemove', (e) => {
                trailCoords = { x: e.clientX, y: e.clientY };
                animateTrail();
            });

            function animateTrail() {
                cursorTrail.style.left = `${trailCoords.x}px`;
                cursorTrail.style.top = `${trailCoords.y}px`;
                cursorTrail.classList.add('visible');
                
                setTimeout(() => {
                    cursorTrail.classList.remove('visible');
                }, 300);
                
                animationFrame = requestAnimationFrame(animateTrail);
            }
            
            // Stop animation when mouse leaves window
            document.addEventListener('mouseleave', () => {
                cancelAnimationFrame(animationFrame);
                cursorTrail.classList.remove('visible');
            });
        }
    }

    // Typewriter effect
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            const texts = JSON.parse(typewriterElement.getAttribute('data-text'));
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function type() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 1500; // Pause at end of text
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingSpeed = 500; // Pause before typing next text
                }
                
                setTimeout(type, typingSpeed);
            }
            
            // Start typing
            setTimeout(type, 1000);
        }
    }

    // Animate skill bars
    function animateSkillBars() {
        document.querySelectorAll('.skill-item').forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progressBar = item.querySelector('.skill-progress');
            
            if (progressBar) {
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = `${percent}%`;
                }, 100);
            }
        });
    }

    // Project filtering
    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
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
    }

    // Back to top button
    function initBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
            });
            
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Floating particles
    function initParticles() {
        const particlesBackground = document.querySelector('.particles-background');
        
        if (particlesBackground) {
            // Create particles
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('span');
                particle.style.width = `${Math.random() * 15 + 5}px`;
                particle.style.height = particle.style.width;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = '0';
                particle.style.opacity = Math.random();
                particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particlesBackground.appendChild(particle);
            }
        }
    }

    // Image hover effects
    function initImageEffects() {
        const photoContainer = document.querySelector('.photo-container');
        const profilePic = document.querySelector('.profile-pic');
        const glowEffect = document.querySelector('.glow-effect');
        
        if (photoContainer && profilePic && glowEffect) {
            photoContainer.addEventListener('mousemove', (e) => {
                const rect = photoContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;
                
                profilePic.style.transform = `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.03)
                `;
                
                glowEffect.style.opacity = '1';
                glowEffect.style.backgroundPosition = `
                    ${(x / rect.width) * 100}% 
                    ${(y / rect.height) * 100}%
                `;
            });
            
            photoContainer.addEventListener('mouseleave', () => {
                profilePic.style.transform = 'rotateX(0) rotateY(0) scale(1)';
                glowEffect.style.opacity = '0';
            });
        }
    }

    // About section effects
    function initAboutEffects() {
        const aboutPic = document.querySelector('.about-pic');
        
        if (aboutPic) {
            aboutPic.addEventListener('mouseenter', () => {
                aboutPic.style.transform = 'scale(1.05)';
                aboutPic.style.boxShadow = '0 25px 60px rgba(125, 42, 232, 0.3)';
            });
            
            aboutPic.addEventListener('mouseleave', () => {
                aboutPic.style.transform = 'scale(1)';
                aboutPic.style.boxShadow = '0 20px 50px rgba(125, 42, 232, 0.2)';
            });
        }
    }

    // Update footer year
    function initFooterYear() {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
        }
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});