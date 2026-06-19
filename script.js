/* --------------------------------------------------
 * Interactive Script: Botanical Premium Presentation CV
 * Designed for Mr. Chatthong Chuachan
 * -------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Toggle (Light / Dark Botanical)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for preference, default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // 2. Search and Filtering: Publications Section
    // ==========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('pub-search');
    const pubCards = document.querySelectorAll('.pub-card');
    const noResultsState = document.getElementById('no-results');

    let activeFilter = 'all';
    let searchQuery = '';

    // Tab Filter Click Handler
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active to current
            tab.classList.add('active');
            
            activeFilter = tab.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Search Input Handler
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
    });

    function applyFilters() {
        let visibleCount = 0;

        pubCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const searchData = card.getAttribute('data-search').toLowerCase();

            const matchesCategory = (activeFilter === 'all' || cardCategory === activeFilter);
            const matchesSearch = (searchQuery === '' || searchData.includes(searchQuery));

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Toggle Empty/No-results State
        if (visibleCount === 0) {
            noResultsState.classList.remove('hidden');
        } else {
            noResultsState.classList.add('hidden');
        }
    }

    // ==========================================
    // 3. Scroll Reveal Animations (IntersectionObserver)
    // ==========================================
    const revealSections = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed to maintain state
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealSections.forEach(section => {
            revealObserver.observe(section);
        });
    } else {
        // Fallback for older browsers
        revealSections.forEach(section => {
            section.classList.add('revealed');
        });
    }

    // ==========================================
    // 4. Scroll Spy & Navbar Sticky Interaction
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky class toggle
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy active state mapping
        let currentSectionId = 'hero';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset navbar height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});
