/**
 * BREADCRUMB ANALYTICS - User Behavior Tracking
 * Track clicks and navigation patterns for future optimizations
 */

function initBreadcrumbAnalytics() {
  // Track clicks on breadcrumb items
  document.addEventListener('click', function(e) {
    const breadcrumbItem = e.target.closest('.breadcrumb-item, .subsection-item');
    
    if (breadcrumbItem) {
      const section = breadcrumbItem.getAttribute('data-section') || 
                     breadcrumbItem.getAttribute('data-subsection');
      const isSubsection = breadcrumbItem.classList.contains('subsection-item');
      const currentPage = isSubpage() ? 'subpage' : 'index';
      
      // Google Analytics 4 (if implemented)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'breadcrumb_click', {
          'breadcrumb_section': section,
          'breadcrumb_type': isSubsection ? 'subsection' : 'main',
          'source_page': currentPage,
          'page_title': document.title
        });
      }
      
      // Console log for debug (remove in production)
      console.log('📊 Breadcrumb Analytics:', {
        section: section,
        type: isSubsection ? 'subsection' : 'main',
        fromPage: currentPage,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  console.log('📈 Breadcrumb Analytics initialized');
}

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for breadcrumb to load
  setTimeout(initBreadcrumbAnalytics, 200);
});
