/**
 * FOLLOW US STICKY COMPONENT
 * Sticky social button che punta alla sezione #channels
 */

/**
 * Detect if we're on a subpage or main page
 */
function isSubpage() {
  return window.location.pathname.includes('/pages/') || 
         window.location.pathname.includes('pages/') ||
         !window.location.pathname.endsWith('/') && 
         !window.location.pathname.endsWith('index.html') &&
         window.location.pathname !== '/';
}

/**
 * Get the correct base path for navigation
 */
function getBasePath() {
  if (isSubpage()) {
    return '../';
  }
  return '';
}

/**
 * Create Follow Us sticky button HTML with social dropdown
 */
function createFollowUsHTML() {
  const basePath = getBasePath();
  const onSubpage = isSubpage();
  
  // Se siamo su subpage, link diretto all'index#channels
  // Se siamo su index, link locale #channels
  const href = onSubpage ? `${basePath}index.html#channels` : '#channels';
  
  return `
<div class="follow-us-sticky" id="followUsSticky">
  <a href="${href}" class="follow-us-link" data-section="channels">
    <span class="follow-text">FOLLOW US</span>
    <span class="follow-icon">→</span>
  </a>
  
  <div class="social-dropdown">
    <a href="https://youtube.com/@aicebergmind" class="social-icon" target="_blank" rel="noopener">
      <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
      <span class="social-icon-text">YouTube</span>
    </a>
    <a href="https://instagram.com/aicebergmind" class="social-icon" target="_blank" rel="noopener">
      <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
      <span class="social-icon-text">Instagram</span>
    </a>
    <a href="https://x.com/aicebergmind" class="social-icon" target="_blank" rel="noopener">
      <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>
      <span class="social-icon-text">X</span>
    </a>
    <a href="https://linkedin.com/company/aicebergmind" class="social-icon" target="_blank" rel="noopener">
      <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      <span class="social-icon-text">LinkedIn</span>
    </a>
    <a href="https://facebook.com/aicebergmind" class="social-icon" target="_blank" rel="noopener">
      <svg class="social-icon-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
      <span class="social-icon-text">Facebook</span>
    </a>
  </div>
</div>`;
}

/**
 * Insert Follow Us sticky button
 */
function insertFollowUs() {
  // Solo se non esiste già
  if (!document.getElementById('followUsSticky')) {
    document.body.insertAdjacentHTML('beforeend', createFollowUsHTML());
    console.log('📱 Follow Us sticky button inserted');
    
    // Add event listeners for social dropdown
    setupSocialDropdown();
  }
}

/**
 * Setup social dropdown event listeners
 */
function setupSocialDropdown() {
  const followUsSticky = document.getElementById('followUsSticky');
  const socialDropdown = followUsSticky?.querySelector('.social-dropdown');
  
  if (socialDropdown) {
    // Prevent dropdown clicks from triggering the main link
    socialDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // Track social link clicks for analytics
    const socialIcons = socialDropdown.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('click', function(e) {
        const platform = this.querySelector('.social-icon-text').textContent;
        console.log(`🔗 Social link clicked: ${platform}`);
        // Here you could add analytics tracking
      });
    });
  }
}

/**
 * Auto-insert when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('📱 Follow Us Sticky Component Loading...');
  console.log('📍 Current path:', window.location.pathname);
  console.log('🏠 Is subpage:', isSubpage());
  
  insertFollowUs();
});

// Export for manual usage
window.FollowUsComponent = {
  insert: insertFollowUs,
  createHTML: createFollowUsHTML,
  setupDropdown: setupSocialDropdown
};
