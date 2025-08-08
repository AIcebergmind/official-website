/**
 * BREADCRUMB COMPONENT - Global Reusable
 * 
 * Usage: Include this script and call insertBreadcrumb() where you want the breadcrumb
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
    // We're in a subpage, need to go back to root
    return '../';
  }
  return '';
}

function createBreadcrumbHTML() {
  const basePath = getBasePath();
  const onSubpage = isSubpage();
  
  // Helper function to create breadcrumb items with separators
  const createBreadcrumbItems = () => {
    const items = [];
    
    // HOME item
    items.push(onSubpage ? 
      `<a href="${basePath}index.html#hero" class="breadcrumb-item" data-section="hero">HOME</a>` :
      `<div class="breadcrumb-item active" data-section="hero">HOME</div>`
    );
    
    // ABOUT item
    items.push(onSubpage ? 
      `<a href="${basePath}index.html#about" class="breadcrumb-item" data-section="about">ABOUT</a>` :
      `<div class="breadcrumb-item" data-section="about">ABOUT</div>`
    );
    
    // PROJECTS item
    items.push(onSubpage ? 
      `<a href="${basePath}index.html#projects" class="breadcrumb-item" data-section="projects" data-has-subs="true">PROJECTS</a>` :
      `<div class="breadcrumb-item" data-section="projects" data-has-subs="true">PROJECTS</div>`
    );
    
    // TEAM item
    items.push(onSubpage ? 
      `<a href="${basePath}index.html#team" class="breadcrumb-item" data-section="team">TEAM</a>` :
      `<div class="breadcrumb-item" data-section="team">TEAM</div>`
    );
    

    // ETHICS item
    items.push(onSubpage ? 
      `<a href="${basePath}index.html#ethics" class="breadcrumb-item" data-section="ethics">ETHICS</a>` :
      `<div class="breadcrumb-item" data-section="ethics">ETHICS</div>`
    );

    // BLOG item
    items.push(`<a href="${basePath}pages/blog.html" class="breadcrumb-item${window.location.pathname.includes('blog') ? ' active' : ''}">BLOG</a>`);
    
    // Join items with separator
    return items.join('<span class="breadcrumb-separator">/</span>');
  };
  
  return `
<!-- Breadcrumb Navigation -->
<div class="breadcrumb-container" id="breadcrumbContainer">
  <div class="breadcrumb-nav">
    ${createBreadcrumbItems()}
  </div>
  
  <div class="breadcrumb-subsections" id="breadcrumbSubsections">
    ${onSubpage ? `
    <a href="${basePath}index.html#projects" class="subsection-item" data-parent="projects" data-subsection="audio-rituals">Audio Rituals</a>
    <a href="${basePath}index.html#projects" class="subsection-item" data-parent="projects" data-subsection="nursery-rhymes">Nursery Rhymes</a>
    <a href="${basePath}index.html#projects" class="subsection-item" data-parent="projects" data-subsection="specialized-channels">Specialized Channels</a>
    <a href="${basePath}index.html#projects" class="subsection-item" data-parent="projects" data-subsection="birth-prep">Birth Prep</a>
    <a href="${basePath}index.html#projects" class="subsection-item" data-parent="projects" data-subsection="family-finance">Family Finance</a>
    <a href="${basePath}index.html#projects" class="subsection-item" data-parent="projects" data-subsection="parent-360">Parent 360</a>
    ` : `
    <div class="subsection-item" data-parent="projects" data-subsection="audio-rituals">Audio Rituals</div>
    <div class="subsection-item" data-parent="projects" data-subsection="nursery-rhymes">Nursery Rhymes</div>
    <div class="subsection-item" data-parent="projects" data-subsection="specialized-channels">Specialized Channels</div>
    <div class="subsection-item" data-parent="projects" data-subsection="birth-prep">Birth Prep</div>
    <div class="subsection-item" data-parent="projects" data-subsection="family-finance">Family Finance</div>
    <div class="subsection-item" data-parent="projects" data-subsection="parent-360">Parent 360</div>
    `}
  </div>
</div>`;
}

/**
 * Insert breadcrumb at specific target
 * @param {string} targetSelector - CSS selector where to insert (default: after opening body tag)
 */
function insertBreadcrumb(targetSelector = 'body') {
  const target = document.querySelector(targetSelector);
  if (target) {
    target.insertAdjacentHTML('afterbegin', createBreadcrumbHTML());
  } else {
    console.warn('Breadcrumb target not found:', targetSelector);
  }
}

/**
 * Auto-insert breadcrumb when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Debug info
  console.log('🍞 Breadcrumb Component Loading...');
  console.log('📍 Current path:', window.location.pathname);
  console.log('🏠 Is subpage:', isSubpage());
  console.log('📂 Base path:', getBasePath());
  
  // Priority 1: Look for placeholder
  const placeholder = document.getElementById('breadcrumb-placeholder');
  if (placeholder) {
    placeholder.outerHTML = createBreadcrumbHTML();
    console.log('✅ Breadcrumb inserted via placeholder');
    
    // Notify that breadcrumb is ready for event listeners
    document.dispatchEvent(new CustomEvent('breadcrumbReady'));
    return;
  }
  
  // Priority 2: Only insert if breadcrumb doesn't already exist
  if (!document.getElementById('breadcrumbContainer')) {
    insertBreadcrumb();
    console.log('✅ Breadcrumb auto-inserted');
    
    // Notify that breadcrumb is ready for event listeners
    document.dispatchEvent(new CustomEvent('breadcrumbReady'));
  } else {
    console.log('ℹ️ Breadcrumb already exists, skipping');
  }
});

// Export for manual usage
window.BreadcrumbComponent = {
  insert: insertBreadcrumb,
  createHTML: createBreadcrumbHTML
};
