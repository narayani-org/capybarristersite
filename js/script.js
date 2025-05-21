// --- Custom JS from index.html ---
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const mainNav = document.getElementById('mainNav');
    const menuBtn = document.getElementById('menuBtn');
    const slideMenu = document.getElementById('slideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuItems = document.querySelectorAll('.menu-item');
    let isMenuOpen = false;

    menuBtn.classList.add('text-black'); // Add black text color to the menu button initially

    // Handle scroll for transparent navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            mainNav.querySelectorAll('a, button').forEach(el => {
                if (!el.classList.contains('bg-primary-teal') && el.id !== 'getInTouchBtn') {
                    el.classList.remove('text-white');
                    el.classList.add('text-dark-blue');
                }
            });
        } else {
            mainNav.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            mainNav.querySelectorAll('a, button').forEach(el => {
                if (!el.classList.contains('bg-primary-teal') && el.id !== 'getInTouchBtn') {
                    el.classList.remove('text-dark-blue');
                    el.classList.add('text-white');
                }
            });
        }
    });

    // Handle loader
    const loader = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Handle scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function animateMenuItems(show) {
        menuItems.forEach((item, index) => {
            if (show) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            }
        });
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            slideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            animateMenuItems(true);
            document.body.style.overflow = 'hidden';
        } else {
            slideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            animateMenuItems(false);
            document.body.style.overflow = '';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Add close button functionality
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Initialize menu items as hidden
    animateMenuItems(false);

    // Enhanced hero animations
    const heroTextElements = document.querySelectorAll('.hero-text-animate');
    const heroHighlights = document.querySelectorAll('.hero-highlight');

    function animateHeroText() {
        // Animate text elements with staggered delay
        heroTextElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });

        // Animate highlights with staggered delay
        heroHighlights.forEach((highlight, index) => {
            setTimeout(() => {
                highlight.classList.add('visible');
            }, 1000 + (index * 300));
        });

        // Animate hero image
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 800);
    }

    // Trigger hero animations on load
    setTimeout(animateHeroText, 100);

    // Add scroll-based animations
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

    // Observe all animated elements
    document.querySelectorAll('.hero-text-animate, .hero-highlight').forEach(el => {
        observer.observe(el);
    });

    // Logo text color scroll effect
    const logoText = document.querySelector('nav .group > span');
    const getInTouchBtn = document.getElementById('getInTouchBtn');
    function updateLogoTextColor() {
        if (window.scrollY > 50) {
            logoText.style.color = '#1b3a2d';
            getInTouchBtn.style.backgroundColor = '#1b3a2d';
            getInTouchBtn.style.color = '#fff';
        } else {
            logoText.style.color = '#ffffff';
            getInTouchBtn.style.backgroundColor = '#212121';
            getInTouchBtn.style.color = '#fff';
        }
    }
    window.addEventListener('scroll', updateLogoTextColor);
    updateLogoTextColor(); // Set initial color
}); 