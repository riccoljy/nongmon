// Shared header and footer components
const HEADER_HTML = `
<!-- Navigation -->
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <h2>Nong Mon <span class="highlight">Market</span></h2>
        </div>
        <div class="nav-menu" id="nav-menu">
            <a href="index.html" class="nav-link" data-page="home">Home</a>
            <a href="stories.html" class="nav-link" data-page="stories">Stories</a>
            <a href="attractions.html" class="nav-link" data-page="attractions">Market Guide</a>
            <a href="about.html" class="nav-link" data-page="about">About Us</a>
            <a href="contact.html" class="nav-link" data-page="contact">Visit</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfg5BwxwdcUGcf-VBDjktfQn48yIdKupxcBnV3Y3SOgDjS7HQ/viewform" class="nav-button" target="_blank">Submit Story</a>
        </div>
        <div class="hamburger" id="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </div>
</nav>
`;

const FOOTER_HTML = `
<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Nong Mon Market</h3>
                <p>A collaborative project between NUS College and Burapha University</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="stories.html">Stories</a></li>
                    <li><a href="attractions.html">Market Guide</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Visit Info</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Connect</h4>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Nong Mon Market Project. NUS College & Burapha University Partnership.</p>
        </div>
    </div>
</footer>
`;

// Load shared components
function loadComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    // Insert header
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = HEADER_HTML;
    }
    
    // Insert footer
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = FOOTER_HTML;
    }
    
    // Set active navigation link after components are loaded
    setActiveNavLink();
    
    // Initialize mobile navigation after header is loaded
    initializeMobileNav();
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if ((currentPage === 'index' && linkPage === 'home') || 
            (currentPage === linkPage)) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile navigation (called after header is loaded)
function initializeMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer components
    loadComponents();

    // Smooth scrolling for anchor links
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

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Story filtering functionality (for stories page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allStoryCards = document.querySelectorAll('.story-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            allStoryCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Instagram video modal functionality (for stories page)
    const storyCards = document.querySelectorAll('.story-card[data-instagram]');
    
    // Instagram video data - in a real implementation, these would be actual Instagram embed codes
    const instagramVideos = {
        'dawn-market': {
            username: 'sarah_nus',
            caption: 'Early morning at Nong Mon Market is pure magic! The vendors setting up their fresh seafood and the aroma of traditional desserts... #NongMonMarket #BangSaen #MarketLife',
            videoPlaceholder: 'Dawn Market Experience'
        },
        'seafood-vendors': {
            username: 'somchai_burapha',
            caption: 'Learning about traditional seafood preparation from the masters at Nong Mon Market. Their pride in quality is inspiring! #TraditionalMethods #SeafoodVendors #ThaiCulture',
            videoPlaceholder: 'Seafood Vendors Story'
        },
        'market-colors': {
            username: 'maria_nus',
            caption: 'The vibrant colors of Nong Mon Market are a photographer\'s dream! Every corner tells a story of Thai coastal culture. #MarketPhotography #Colors #Culture',
            videoPlaceholder: 'Market Colors'
        },
        'market-hunt': {
            username: 'james_nus',
            caption: 'Treasure hunting at Nong Mon Market! Found the most amazing Kanom Chak vendor after exploring every section. #MarketHunt #KanomChak #Discovery',
            videoPlaceholder: 'Market Treasure Hunt'
        },
        'market-sounds': {
            username: 'niran_burapha',
            caption: 'The symphony of Nong Mon Market - vendors calling, food sizzling, friendly chatter. This is authentic Thailand! #MarketSounds #Atmosphere #Authentic',
            videoPlaceholder: 'Market Sounds'
        },
        'sweet-discoveries': {
            username: 'lisa_nus',
            caption: 'First time trying Khao Lam at Nong Mon Market! Made by a grandmother who\'s been perfecting it for 40 years. Pure tradition in every bite! #KhaoLam #TraditionalSweets #Tradition',
            videoPlaceholder: 'Sweet Discoveries'
        },
        'spice-corner': {
            username: 'achara_burapha',
            caption: 'The spice section at Nong Mon Market is a sensory journey! Learning about different shrimp pastes and fish sauces from expert vendors. #Spices #ThaiCuisine #Learning',
            videoPlaceholder: 'Spice Corner Experience'
        },
        'learning-masters': {
            username: 'michael_nus',
            caption: 'Watching the dried seafood masters at work is like witnessing culinary artistry! Their expertise in selecting and preparing squid is incredible. #Craftsmanship #DriedSeafood #Masters',
            videoPlaceholder: 'Learning from Masters'
        },
        'market-friendships': {
            username: 'pranee_burapha',
            caption: 'The friendships I\'ve made at Nong Mon Market are priceless! Vendors sharing recipes and stories, making me feel part of the community. #Friendship #Community #MarketFamily',
            videoPlaceholder: 'Market Friendships'
        }
    };

    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            const instagramId = this.getAttribute('data-instagram');
            const videoData = instagramVideos[instagramId];
            
            if (!videoData) return;

            // Create Instagram-style modal
            const modal = document.createElement('div');
            modal.className = 'instagram-modal';
            modal.innerHTML = `
                <div class="instagram-video-container">
                    <span class="close-instagram">&times;</span>
                    <div class="instagram-header">
                        <div class="instagram-avatar">${videoData.username.charAt(0).toUpperCase()}</div>
                        <div class="instagram-username">${videoData.username}</div>
                    </div>
                    <div class="instagram-video-placeholder" style="height: 400px; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; text-align: center; padding: 20px;">
                        <div>
                            <i class="fas fa-play-circle" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                            <p>${videoData.videoPlaceholder}</p>
                            <small style="opacity: 0.8; font-size: 0.9rem;">Instagram Video Post</small>
                        </div>
                    </div>
                    <div class="instagram-caption">
                        <strong>${videoData.username}</strong> ${videoData.caption}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Trigger animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            // Close modal functionality
            const closeModal = modal.querySelector('.close-instagram');
            closeModal.addEventListener('click', function() {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            });

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Contact form handling (for contact page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! We'll get back to you soon.</p>
            `;
            
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            this.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 5000);
        });
    }
});

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);
