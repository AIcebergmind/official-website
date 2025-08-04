// ✅ Cookie Banner - GDPR Compliant
class CookieBanner {
  constructor() {
    this.cookieName = 'aiceberg_cookies_accepted';
    this.cookieExpiry = 365; // days
    this.delayAfterPreloader = 2000; // 2 seconds after preloader
    
    this.init();
  }
  
  init() {
    // Check if cookies are already accepted
    if (this.getCookie(this.cookieName)) {
      console.log('🍪 Cookies already accepted');
      return;
    }
    
    // Wait for preloader to complete, then show banner
    this.waitForPreloaderCompletion();
  }
  
  waitForPreloaderCompletion() {
    // Check if we're on preloader page
    if (window.location.href.includes('preloader.html')) {
      // On preloader page - don't show banner
      console.log('🍪 On preloader page - banner will show after redirect');
      return;
    }
    
    // Check if preloader exists and is still running
    const preloader = document.getElementById('preloader') || 
                     document.getElementById('preloaderContainer');
    
    if (preloader && preloader.style.display !== 'none') {
      // Preloader is still running - wait for it to complete
      const checkPreloader = setInterval(() => {
        if (preloader.style.display === 'none' || 
            preloader.style.opacity === '0') {
          clearInterval(checkPreloader);
          setTimeout(() => this.showBanner(), this.delayAfterPreloader);
        }
      }, 500);
    } else {
      // No preloader or already completed - show banner after delay
      setTimeout(() => this.showBanner(), 1000);
    }
  }
  
  showBanner() {
    // Check again if cookies are accepted (in case user navigated)
    if (this.getCookie(this.cookieName)) {
      return;
    }
    
    // Create banner HTML
    this.createBannerHTML();
    
    // Show banner with animation
    setTimeout(() => {
      const banner = document.getElementById('cookieBanner');
      if (banner) {
        banner.classList.add('show');
        console.log('🍪 Cookie banner displayed');
      }
    }, 100);
  }
  
  createBannerHTML() {
    const bannerHTML = `
      <div id="cookieBanner" class="cookie-banner">
        <div class="cookie-content">
          <div class="cookie-text">
            <div class="cookie-title">We use cookies</div>
            <div class="cookie-description">
              We use essential cookies for website functionality and analytics to improve your experience. 
              <a href="pages/legal-notices.html">Learn more</a> about our privacy practices.
            </div>
          </div>
          <div class="cookie-actions">
            <button class="cookie-btn decline" onclick="cookieBanner.declineCookies()">
              Decline
            </button>
            <button class="cookie-btn accept" onclick="cookieBanner.acceptCookies()">
              Accept All
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add banner to body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
  }
  
  acceptCookies() {
    // Set cookie to remember acceptance
    this.setCookie(this.cookieName, 'accepted', this.cookieExpiry);
    
    // Hide banner
    this.hideBanner();
    
    // Initialize analytics or other tracking
    this.initializeTracking();
    
    console.log('🍪 Cookies accepted');
  }
  
  declineCookies() {
    // Set cookie to remember decline (shorter expiry)
    this.setCookie(this.cookieName, 'declined', 30);
    
    // Hide banner
    this.hideBanner();
    
    // Disable non-essential tracking
    this.disableTracking();
    
    console.log('🍪 Cookies declined');
  }
  
  hideBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.classList.add('hide');
      setTimeout(() => {
        banner.remove();
      }, 600);
    }
  }
  
  initializeTracking() {
    // Here you would initialize Google Analytics, etc.
    // For now, just log
    console.log('🔍 Analytics tracking enabled');
    
    // Example: Initialize Google Analytics
    // gtag('consent', 'update', {
    //   'analytics_storage': 'granted'
    // });
  }
  
  disableTracking() {
    // Disable non-essential tracking
    console.log('🚫 Non-essential tracking disabled');
    
    // Example: Disable Google Analytics
    // gtag('consent', 'update', {
    //   'analytics_storage': 'denied'
    // });
  }
  
  // Cookie utility functions
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
  
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

// Initialize cookie banner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Make cookieBanner globally accessible for onclick handlers
  window.cookieBanner = new CookieBanner();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cookieBanner = new CookieBanner();
  });
} else {
  window.cookieBanner = new CookieBanner();
}
