// === NAVIGATION MODULE - Menu, Breadcrumb, Mobile ===

export class NavigationModule {
  constructor(config = {}) {
    this.config = config;
    this.isMenuVisible = false;
    this.isMobileMenuOpen = false;
    this.currentSection = 'hero';
    this.sections = [];
    
    // Elements
    this.mainMenu = null;
    this.breadcrumbContainer = null;
    this.hamburgerMenu = null;
    this.mobileMenuOverlay = null;
    
    // Event handlers (for cleanup)
    this.scrollHandler = null;
    this.resizeHandler = null;
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.setupSections();
    this.bindEvents();
    this.initBreadcrumb();
    this.initMobileMenu();
    this.initScrollBehavior();
    
    console.log('📱 NavigationModule initialized');
  }

  cacheElements() {
    this.mainMenu = document.querySelector('.main-menu');
    this.breadcrumbContainer = document.getElementById('breadcrumbContainer');
    this.hamburgerMenu = document.getElementById('hamburgerMenu');
    this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    this.mobileCloseBtn = document.getElementById('mobileCloseBtn');
    
    // Breadcrumb elements
    this.breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
    this.breadcrumbProgress = document.getElementById('breadcrumbProgress');
    
    // Menu words
    this.menuWords = document.querySelectorAll('.word[data-target]');
    this.mobileMenuWords = document.querySelectorAll('.mobile-nav-items .word[data-target]');
  }

  setupSections() {
    this.sections = [
      { id: 'hero', element: document.getElementById('hero') || document.querySelector('.hero') },
      { id: 'about', element: document.getElementById('about') },
      { id: 'projects', element: document.getElementById('projects') },
      { id: 'team', element: document.getElementById('team') },
      { id: 'ethics', element: document.getElementById('ethics') }
    ].filter(section => section.element);
    
    console.log(`📍 Navigation: Found ${this.sections.length} sections`);
  }

  bindEvents() {
    // Scroll detection for menu visibility
    this.scrollHandler = this.throttle(() => {
      this.updateMenuVisibility();
      this.updateBreadcrumbProgress();
      this.updateActiveSection();
    }, 16);
    
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    
    // Resize handler
    this.resizeHandler = () => {
      this.handleResize();
    };
    window.addEventListener('resize', this.resizeHandler);
    
    // Menu word clicks
    this.menuWords.forEach(word => {
      word.addEventListener('click', (e) => {
        this.handleMenuClick(e.target.getAttribute('data-target'));
      });
    });
    
    this.mobileMenuWords.forEach(word => {
      word.addEventListener('click', (e) => {
        this.handleMenuClick(e.target.getAttribute('data-target'));
        this.closeMobileMenu();
      });
    });
    
    // Breadcrumb clicks
    this.breadcrumbItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const sectionName = item.getAttribute('data-section');
        this.navigateToSection(sectionName);
        this.setActiveBreadcrumb(index);
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
  }

  // Menu visibility based on scroll
  updateMenuVisibility() {
    const subhero = document.querySelector('.subhero');
    if (!subhero) return;
    
    const subheroRect = subhero.getBoundingClientRect();
    const shouldShowMenu = subheroRect.bottom < window.innerHeight * 0.7;
    
    if (shouldShowMenu && !this.isMenuVisible) {
      this.showMenu();
    } else if (!shouldShowMenu && this.isMenuVisible) {
      this.hideMenu();
    }
  }

  showMenu() {
    if (!this.mainMenu || this.isMenuVisible) return;
    
    this.isMenuVisible = true;
    this.mainMenu.style.opacity = '1';
    this.mainMenu.style.visibility = 'visible';
    this.mainMenu.style.transform = 'translateY(0)';
    
    // Breadcrumb visibility is now handled by CSS only
    // Removed JS override for breadcrumb display
  }

  hideMenu() {
    if (!this.mainMenu || !this.isMenuVisible) return;
    
    this.isMenuVisible = false;
    this.mainMenu.style.opacity = '0';
    this.mainMenu.style.visibility = 'hidden';
    this.mainMenu.style.transform = 'translateY(-20px)';
  }

  // Breadcrumb system
  initBreadcrumb() {
    if (!this.breadcrumbContainer) return;
    
    // Breadcrumb visibility is now handled by CSS only
    // Removed JS override for mobile/desktop display
    
    // Initial setup
    this.setActiveBreadcrumb(0);
  }

  updateBreadcrumbProgress() {
    if (!this.breadcrumbProgress) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollTop / documentHeight, 1);
    
    this.breadcrumbProgress.style.width = (scrollProgress * 100) + '%';
  }

  updateActiveSection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportCenter = scrollTop + (window.innerHeight / 2);
    
    let activeIndex = 0;
    
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i].element;
      const sectionTop = section.offsetTop;
      
      if (viewportCenter >= sectionTop) {
        activeIndex = i;
        break;
      }
    }
    
    if (this.currentSection !== this.sections[activeIndex]?.id) {
      this.currentSection = this.sections[activeIndex]?.id;
      this.setActiveBreadcrumb(activeIndex);
      
      // Emit section change event
      if (window.AicebergMind) {
        window.AicebergMind.emit('sectionChange', {
          section: this.currentSection,
          index: activeIndex
        });
      }
    }
  }

  setActiveBreadcrumb(activeIndex) {
    this.breadcrumbItems.forEach((item, index) => {
      item.classList.toggle('active', index === activeIndex);
    });
  }

  // Mobile menu
  initMobileMenu() {
    if (!this.hamburgerMenu || !this.mobileMenuOverlay) return;
    
    // Show hamburger on mobile
    if (window.innerWidth <= 768) {
      this.hamburgerMenu.style.display = 'flex';
    }
    
    // Hamburger click
    this.hamburgerMenu.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close button
    if (this.mobileCloseBtn) {
      this.mobileCloseBtn.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
    
    // Prevent body scroll when menu is open
    this.mobileMenuOverlay.addEventListener('wheel', (e) => {
      e.stopPropagation();
    });
  }

  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.mobileMenuOverlay || this.isMobileMenuOpen) return;
    
    this.isMobileMenuOpen = true;
    this.hamburgerMenu.classList.add('active');
    this.mobileMenuOverlay.classList.add('open');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    if (!this.mobileMenuOverlay || !this.isMobileMenuOpen) return;
    
    this.isMobileMenuOpen = false;
    this.hamburgerMenu.classList.remove('active');
    this.mobileMenuOverlay.classList.remove('open');
    
    // Re-enable body scroll
    document.body.style.overflow = '';
  }

  // Navigation actions
  handleMenuClick(target) {
    if (!target) return;
    
    // Handle external links
    if (target.startsWith('#') && target !== '#BLOG') {
      // Internal navigation
      const sectionId = target.substring(1).toLowerCase();
      this.navigateToSection(sectionId);
    } else if (target === '#BLOG') {
      // External link or special action
      this.handleBlogClick();
    } else {
      // Section navigation
      this.navigateToSection(target.toLowerCase());
    }
  }

  navigateToSection(sectionName) {
    const section = document.getElementById(sectionName) || 
                   document.querySelector(`.${sectionName}`);
    
    if (section) {
      // Smooth scroll with offset for fixed header
      const offsetTop = section.offsetTop - (this.isMenuVisible ? 80 : 0);
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      console.log(`📍 Navigating to: ${sectionName}`);
    } else {
      console.warn(`⚠️ Section not found: ${sectionName}`);
    }
  }

  handleBlogClick() {
    // Show coming soon notification
    this.showNotification('Blog - Coming Soon!', 'info');
  }

  // Keyboard navigation
  handleKeyboardNavigation(e) {
    // Don't interfere if user is typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.navigateToPreviousSection();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.navigateToNextSection();
        break;
      case 'Home':
        e.preventDefault();
        this.navigateToSection('hero');
        break;
      case 'End':
        e.preventDefault();
        this.navigateToSection('ethics');
        break;
    }
  }

  navigateToPreviousSection() {
    const currentIndex = this.sections.findIndex(s => s.id === this.currentSection);
    if (currentIndex > 0) {
      this.navigateToSection(this.sections[currentIndex - 1].id);
    }
  }

  navigateToNextSection() {
    const currentIndex = this.sections.findIndex(s => s.id === this.currentSection);
    if (currentIndex < this.sections.length - 1) {
      this.navigateToSection(this.sections[currentIndex + 1].id);
    }
  }

  // Scroll behavior
  initScrollBehavior() {
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Responsive handling
  handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    // Show/hide mobile menu based on screen size
    if (this.hamburgerMenu) {
      this.hamburgerMenu.style.display = isMobile ? 'flex' : 'none';
    }
    
    // Close mobile menu if switching to desktop
    if (!isMobile && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Utility functions
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return (...args) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: var(--ice-cyan);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      border: 2px solid var(--glacier-blue);
      z-index: 1000;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
      transform: translateX(100%);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Public API
  getCurrentSection() {
    return this.currentSection;
  }

  isMenuOpen() {
    return this.isMobileMenuOpen;
  }

  // Event handling
  handleEvent(eventName, data) {
    switch (eventName) {
      case 'heroScroll':
        // Hero scroll might affect menu visibility
        this.updateMenuVisibility();
        break;
      case 'configUpdate':
        this.updateConfig(data);
        break;
    }
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  cleanup() {
    // Remove event listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    // Close mobile menu if open
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
    
    console.log('📱 NavigationModule cleaned up');
  }
}
