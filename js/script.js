// --- Custom JS from index.html ---
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    let mainNav = null;
    let menuBtn = null;
    let slideMenu = null;
    let menuOverlay = null;
    let menuItems = null;
    let closeMenuBtn = null;
    let isMenuOpen = false;

    // Function to highlight current page in menu
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll('.menu-link');
        
        menuLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath) || 
                (currentPath === '/' && linkPath === 'index.html') ||
                (currentPath.endsWith('/') && linkPath === 'index.html')) {
                link.classList.add('active');
                link.classList.add('font-bold');
                // Add a special active state background
                const activeBg = link.querySelector('span:last-child');
                if (activeBg) {
                    activeBg.classList.add('bg-[#1b3a2d]/20');
                    activeBg.classList.add('scale-x-100');
                }
            }
        });
    }

    // Initialize menu elements after components are loaded
    function initializeMenu() {
        console.log('Initializing menu...');
        
        // Get all required elements
        mainNav = document.getElementById('mainNav');
        menuBtn = document.getElementById('menuBtn');
        slideMenu = document.getElementById('slideMenu');
        menuOverlay = document.getElementById('menuOverlay');
        menuItems = document.querySelectorAll('.menu-item');
        closeMenuBtn = document.getElementById('closeMenuBtn');
        
        console.log('Menu elements:', {
            mainNav: !!mainNav,
            menuBtn: !!menuBtn,
            slideMenu: !!slideMenu,
            menuOverlay: !!menuOverlay,
            menuItems: menuItems?.length,
            closeMenuBtn: !!closeMenuBtn
        });
        
        // Check if all required elements are present
        const requiredElements = {
            mainNav,
            menuBtn,
            slideMenu,
            menuOverlay,
            closeMenuBtn
        };

        const missingElements = Object.entries(requiredElements)
            .filter(([_, element]) => !element)
            .map(([name]) => name);

        if (missingElements.length > 0) {
            console.error('Menu initialization failed: missing elements:', missingElements);
            return;
        }

        menuBtn.classList.add('text-black');

        function animateMenuItems(show) {
            if (!menuItems) return;
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
            console.log('Toggling menu, current state:', isMenuOpen);
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

        // Remove any existing event listeners
        menuBtn.removeEventListener('click', toggleMenu);
        menuOverlay.removeEventListener('click', toggleMenu);
        closeMenuBtn.removeEventListener('click', toggleMenu);

        // Add event listeners
        menuBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Initialize menu items as hidden
        animateMenuItems(false);
        
        // Highlight current page
        highlightCurrentPage();
        
        console.log('Menu initialization complete');
    }

    // Listen for the custom event when both navbar and slide menu are loaded
    document.addEventListener('navAndMenuLoaded', () => {
        console.log('Nav and menu loaded event received, initializing...');
        initializeMenu();
        
        // Initialize navbar scroll effect
        if (mainNav) {
            console.log('Initializing navbar scroll effect...');
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

            // Initialize logo text color effect
            const logoText = mainNav.querySelector('.group > span');
            const getInTouchBtn = document.getElementById('getInTouchBtn');
            
            if (logoText || getInTouchBtn) {
                function updateLogoTextColor() {
                    if (window.scrollY > 50) {
                        if (logoText) logoText.style.color = '#1b3a2d';
                        if (getInTouchBtn) {
                            getInTouchBtn.style.backgroundColor = '#1b3a2d';
                            getInTouchBtn.style.color = '#fff';
                        }
                    } else {
                        if (logoText) logoText.style.color = '#ffffff';
                        if (getInTouchBtn) {
                            getInTouchBtn.style.backgroundColor = '#212121';
                            getInTouchBtn.style.color = '#fff';
                        }
                    }
                }
                window.addEventListener('scroll', updateLogoTextColor);
                updateLogoTextColor(); // Set initial color
            }
        } else {
            console.error('Main navigation element not found');
        }
    });

    // Also try initializing immediately in case everything is already loaded
    if (document.getElementById('menuBtn') && document.getElementById('slideMenu')) {
        console.log('Menu elements already present, initializing...');
        initializeMenu();
    }

    // Handle loader if it exists
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // Handle scroll to top button if it exists
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
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
    }

    // Hero animations if elements exist
    const heroTextElements = document.querySelectorAll('.hero-text-animate');
    const heroHighlights = document.querySelectorAll('.hero-highlight');
    const heroImage = document.querySelector('.hero-image');

    if (heroTextElements.length > 0 || heroHighlights.length > 0 || heroImage) {
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

            // Animate hero image if it exists
            if (heroImage) {
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                    heroImage.style.transform = 'translateY(0)';
                }, 800);
            }
        }

        // Trigger hero animations on load
        setTimeout(animateHeroText, 100);
    }

    // Add scroll-based animations if elements exist
    if (document.querySelectorAll('.hero-text-animate, .hero-highlight').length > 0) {
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
    }
}); 