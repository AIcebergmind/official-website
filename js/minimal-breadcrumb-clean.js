// ✅ Minimal Breadcrumb Navigation with Subsections
document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
  const subsectionsContainer = document.getElementById('breadcrumbSubsections');
  const subsectionItems = document.querySelectorAll('.subsection-item');
  
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
  
  // Main navigation click handlers
  breadcrumbItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const sectionId = item.getAttribute('data-section');
      
      // Handle direct links (like blog) - let them work normally
      if (!sectionId && item.tagName === 'A' && item.href) {
        return; // Let the link work normally
      }
      
      e.preventDefault();
      const targetElement = document.getElementById(sectionId);
      
      if (targetElement) {
        // Remove active from all main items
        breadcrumbItems.forEach(i => i.classList.remove('active'));
        // Add active to clicked item
        item.classList.add('active');
        
        // Remove active from all subsections
        subsectionItems.forEach(i => i.classList.remove('active'));
        
        // Update subsections visibility
        updateSubsections(sectionId);
        
        // Smooth scroll with offset for fixed breadcrumb
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100; // 100px offset for breadcrumb
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        console.log(`🚀 Navigating to: ${sectionId} with 100px offset`);
      }
    });
  });
  
  // Subsection click handlers
  subsectionItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const subsectionId = item.getAttribute('data-subsection');
      const parentSection = item.getAttribute('data-parent');
      
      // Remove active from all subsections
      subsectionItems.forEach(i => i.classList.remove('active'));
      // Add active to clicked subsection
      item.classList.add('active');
      
      // For now, scroll to parent section (later you can add specific subsection elements)
      const targetElement = document.getElementById(parentSection);
      if (targetElement) {
        // Smooth scroll with offset for fixed breadcrumb
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100; // 100px offset for breadcrumb
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      console.log(`🎯 Navigating to subsection: ${parentSection}/${subsectionId}`);
    });
  });
  
  // Update active state on scroll
  const sections = ['hero', 'about', 'projects', 'team', 'ethics', 'channels'];
  
  window.addEventListener('scroll', () => {
    sections.forEach((sectionId, index) => {
      const sectionElement = document.getElementById(sectionId);
      if (!sectionElement) return;
      
      const rect = sectionElement.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (isInView) {
        breadcrumbItems.forEach(item => item.classList.remove('active'));
        if (breadcrumbItems[index]) {
          breadcrumbItems[index].classList.add('active');
          
          // Update subsections when scrolling into a section
          updateSubsections(sectionId);
        }
      }
    });
  });
  
  console.log('🍞 Breadcrumb Navigation with Subsections initialized!');
  
  // Handle URL hash on page load (for navigation from subpages with offset)
  window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1); // Remove the #
    const urlParams = new URLSearchParams(window.location.search);
    const hasOffset = urlParams.get('offset') || window.location.href.includes('offset=100');
    
    if (hash && hasOffset) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 100; // 100px offset for breadcrumb
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          console.log(`🎯 Scrolled to ${hash} with offset from external navigation`);
        }
      }, 100);
    }
  });
});
