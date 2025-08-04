// ✅ Subpages Breadcrumb Navigation Handler
document.addEventListener("DOMContentLoaded", () => {
  
  // Check if we're on a subpage (not the main index)
  const isSubpage = !window.location.href.includes('index_02.08.2025.html') && 
                   window.location.href.includes('/pages/');
  
  if (!isSubpage) return; // Exit if not on a subpage
  
  console.log('🔗 Subpage breadcrumb navigation initialized');
  
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
  const subsectionsContainer = document.getElementById('breadcrumbSubsections');
  const subsectionItems = document.querySelectorAll('.subsection-item');
  
  // Base URL for navigation back to index
  const indexURL = '../index_02.08.2025.html';
  
  // Configuration: which sections have subsections
  const sectionsWithSubs = {
    'projects': ['audio-rituals', 'nursery-rhymes', 'specialized-channels', 'birth-prep', 'family-finance', 'parent-360']
  };
  
  // Show/hide subsections based on active section
  function updateSubsections(activeSection) {
    if (sectionsWithSubs[activeSection]) {
      // Show subsections for this section
      subsectionsContainer.style.display = 'flex';
      subsectionsContainer.classList.add('show');
      
      // Show only relevant subsections
      subsectionItems.forEach(item => {
        if (item.getAttribute('data-parent') === activeSection) {
          item.style.display = 'inline-block';
        } else {
          item.style.display = 'none';
        }
      });
      
      console.log(`📂 Showing subsections for: ${activeSection}`);
    } else {
      // Hide all subsections
      subsectionsContainer.classList.remove('show');
      setTimeout(() => {
        if (!subsectionsContainer.classList.contains('show')) {
          subsectionsContainer.style.display = 'none';
        }
      }, 300);
      
      console.log(`📁 No subsections for: ${activeSection}`);
    }
  }
  
  // Override main navigation click handlers for subpages
  breadcrumbItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const sectionId = item.getAttribute('data-section');
      const isBlogLink = item.hasAttribute('data-blog-link');
      
      // If it's a real link without data-section, let it work normally
      if (!sectionId && item.tagName === 'A' && item.href) {
        console.log('🔗 Following direct link:', item.href);
        return; // Don't prevent default, let the link work
      }
      
      e.preventDefault();
      
      // Handle special case for blog navigation with data-blog-link
      if (sectionId === 'blog' && isBlogLink) {
        // Navigate to blog page
        window.location.href = 'blog.html';
        console.log('🚀 Navigating to blog page');
        return;
      }
      
      // Remove active from all main items
      breadcrumbItems.forEach(i => i.classList.remove('active'));
      // Add active to clicked item
      item.classList.add('active');
      
      // Remove active from all subsections
      subsectionItems.forEach(i => i.classList.remove('active'));
      
      // Update subsections visibility
      updateSubsections(sectionId);
      
      // Navigate to index with section anchor
      if (sectionId === 'hero') {
        // Home - go to index without anchor
        window.location.href = indexURL;
      } else {
        // Other sections - go to index with section anchor and offset parameter
        window.location.href = `${indexURL}#${sectionId}?offset=100`;
      }
      
      console.log(`🚀 Navigating from subpage to: ${sectionId}`);
    });
  });
  
  // Subsection navigation
  subsectionItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const parentSection = item.getAttribute('data-parent');
      const subsectionId = item.getAttribute('data-subsection');
      
      // Remove active from all subsections
      subsectionItems.forEach(i => i.classList.remove('active'));
      // Add active to clicked subsection
      item.classList.add('active');
      
      // Navigate to index with subsection anchor
      window.location.href = `${indexURL}#${subsectionId}?offset=100`;
      
      console.log(`🎯 Navigating from subpage to subsection: ${subsectionId}`);
    });
  });
  
  // Initial subsections state (hide all by default on subpages)
  if (subsectionsContainer) {
    subsectionsContainer.style.display = 'none';
    subsectionsContainer.classList.remove('show');
  }
  
});
