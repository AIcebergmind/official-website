/* ========================================
   BLOG FUNCTIONALITY
   ======================================== */

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBlogFilters();
    initLoadMore();
    initArticleAnimations();
    initArticleSharing();
    console.log('Blog functionality initialized');
});

/* ========================================
   CATEGORY FILTERING
   ======================================== */

function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles with animation
            filterArticles(category, articleCards);
        });
    });
}

function filterArticles(category, articles) {
    articles.forEach((article, index) => {
        const articleCategory = article.dataset.category;
        const shouldShow = category === 'all' || articleCategory === category;
        
        // Animate out first
        gsap.to(article, {
            duration: 0.3,
            opacity: shouldShow ? 0.3 : 0,
            y: shouldShow ? 10 : -20,
            scale: shouldShow ? 0.95 : 0.9,
            ease: "power2.out",
            onComplete: function() {
                if (shouldShow) {
                    article.style.display = 'block';
                    // Animate in
                    gsap.to(article, {
                        duration: 0.5,
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        delay: index * 0.1,
                        ease: "power2.out"
                    });
                } else {
                    article.style.display = 'none';
                }
            }
        });
    });
}

/* ========================================
   LOAD MORE FUNCTIONALITY
   ======================================== */

function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const articlesGrid = document.querySelector('.articles-grid');
    
    if (!loadMoreBtn || !articlesGrid) return;
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more articles
        loadMoreBtn.innerHTML = 'Loading...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            addMoreArticles(articlesGrid);
            loadMoreBtn.innerHTML = 'Load More Articles';
            loadMoreBtn.disabled = false;
        }, 1000);
    });
}

function addMoreArticles(container) {
    // Sample additional articles data
    const additionalArticles = [
        {
            category: 'neuroscience',
            title: 'The Developing Mind: Neural Pathways in Early Learning',
            excerpt: 'Understanding how neural connections form during critical development periods.',
            date: 'July 15, 2025',
            readTime: '6 min read',
            image: '../images/image_placeholder_about.png'
        },
        {
            category: 'philosophy',
            title: 'Questions as Tools: Socratic Methods in AI',
            excerpt: 'How the ancient art of questioning enhances modern learning algorithms.',
            date: 'July 12, 2025',
            readTime: '4 min read',
            image: '../images/image_placeholder_about.png'
        },
        {
            category: 'education-tech',
            title: 'Beyond Screens: Tangible Learning Experiences',
            excerpt: 'Creating meaningful connections between digital and physical learning.',
            date: 'July 10, 2025',
            readTime: '7 min read',
            image: '../images/image_placeholder_about.png'
        }
    ];
    
    additionalArticles.forEach((article, index) => {
        const articleElement = createArticleCard(article);
        container.appendChild(articleElement);
        
        // Animate in the new article
        gsap.fromTo(articleElement, 
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                duration: 0.6,
                opacity: 1,
                y: 0,
                scale: 1,
                delay: index * 0.2,
                ease: "power2.out"
            }
        );
    });
}

function createArticleCard(article) {
    const articleCard = document.createElement('article');
    articleCard.className = 'article-card';
    articleCard.dataset.category = article.category;
    
    articleCard.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="article-thumbnail">
        <div class="card-content">
            <span class="card-category">${getCategoryDisplayName(article.category)}</span>
            <h3 class="card-title">${article.title}</h3>
            <p class="card-excerpt">${article.excerpt}</p>
            <div class="card-meta">
                <span>${article.date}</span>
                <span>${article.readTime}</span>
            </div>
            <a href="#" class="card-read-more">Read More →</a>
        </div>
    `;
    
    return articleCard;
}

function getCategoryDisplayName(category) {
    const categoryMap = {
        'ai-insights': 'AI Insights',
        'child-development': 'Child Development',
        'education-tech': 'Education Tech',
        'neuroscience': 'Neuroscience',
        'philosophy': 'Philosophy'
    };
    
    return categoryMap[category] || category;
}

/* ========================================
   ARTICLE ANIMATIONS
   ======================================== */

function initArticleAnimations() {
    // Animate article cards on scroll
    const articleCards = document.querySelectorAll('.article-card');
    const featuredCard = document.querySelector('.featured-card');
    
    if (featuredCard) {
        gsap.fromTo(featuredCard,
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                duration: 1,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: featuredCard,
                    start: "top 80%",
                    end: "bottom 20%"
                }
            }
        );
    }
    
    articleCards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                duration: 0.8,
                opacity: 1,
                y: 0,
                scale: 1,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%"
                }
            }
        );
    });
    
    // Animate content blocks in single articles
    const contentBlocks = document.querySelectorAll('.content-block');
    contentBlocks.forEach((block, index) => {
        gsap.fromTo(block,
            {
                opacity: 0,
                y: 20
            },
            {
                duration: 0.8,
                opacity: 1,
                y: 0,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: block,
                    start: "top 90%",
                    end: "bottom 10%"
                }
            }
        );
    });
    
    // Animate article media
    const articleMedia = document.querySelectorAll('.article-media');
    articleMedia.forEach(media => {
        gsap.fromTo(media,
            {
                opacity: 0,
                scale: 0.95,
                y: 30
            },
            {
                duration: 1,
                opacity: 1,
                scale: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: media,
                    start: "top 80%",
                    end: "bottom 20%"
                }
            }
        );
    });
}

/* ========================================
   ARTICLE INTERACTIONS
   ======================================== */

function initArticleSharing() {
    // Add click handlers for article cards
    const articleCards = document.querySelectorAll('.article-card');
    const featuredCard = document.querySelector('.featured-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the read more link
            if (e.target.classList.contains('card-read-more')) return;
            
            // Add click animation
            gsap.to(card, {
                duration: 0.1,
                scale: 0.98,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    // Navigate to article (placeholder)
                    console.log('Navigate to article:', card.querySelector('.card-title').textContent);
                    // window.location.href = 'blog-article.html';
                }
            });
        });
    });
    
    if (featuredCard) {
        featuredCard.addEventListener('click', function() {
            gsap.to(featuredCard, {
                duration: 0.1,
                scale: 0.98,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log('Navigate to featured article');
                    // window.location.href = 'blog-article.html';
                }
            });
        });
    }
}

/* ========================================
   READING PROGRESS (for single articles)
   ======================================== */

function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    const article = document.querySelector('.article-content');
    
    if (!progressBar || !article) return;
    
    window.addEventListener('scroll', function() {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const scrolled = (scrollTop - articleTop + windowHeight) / articleHeight;
        const progress = Math.max(0, Math.min(1, scrolled)) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

/* ========================================
   ARTICLE SEARCH (if needed)
   ======================================== */

function initBlogSearch() {
    const searchInput = document.querySelector('.blog-search-input');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        articleCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
            const category = card.querySelector('.card-category').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                gsap.to(card, {
                    duration: 0.3,
                    opacity: 1,
                    scale: 1,
                    display: 'block',
                    ease: "power2.out"
                });
            } else {
                gsap.to(card, {
                    duration: 0.3,
                    opacity: 0,
                    scale: 0.95,
                    ease: "power2.out",
                    onComplete: function() {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}

/* ========================================
   ARTICLE NAVIGATION
   ======================================== */

function initArticleNavigation() {
    const navItems = document.querySelectorAll('.article-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            gsap.to(item, {
                duration: 0.1,
                scale: 0.98,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log('Navigate to:', item.querySelector('.nav-title').textContent);
                    // Handle navigation logic here
                }
            });
        });
    });
}

/* ========================================
   RELATED ARTICLES
   ======================================== */

function initRelatedArticles() {
    const relatedArticles = document.querySelectorAll('.related-article');
    
    relatedArticles.forEach(article => {
        article.addEventListener('click', function() {
            gsap.to(article, {
                duration: 0.1,
                scale: 0.98,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log('Navigate to related:', article.querySelector('.related-article-title').textContent);
                    // Handle navigation logic here
                }
            });
        });
    });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Calculate reading time
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime + ' min read';
}

// Scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #ffffff;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: 0 },
            ease: "power2.out"
        });
    });
}

// Initialize all functionality
function initAllBlogFeatures() {
    initBlogFilters();
    initLoadMore();
    initArticleAnimations();
    initArticleSharing();
    initReadingProgress();
    initBlogSearch();
    initArticleNavigation();
    initRelatedArticles();
    addScrollToTop();
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllBlogFeatures);
} else {
    initAllBlogFeatures();
}
