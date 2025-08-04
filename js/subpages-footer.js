// ✅ Subpages Footer Navigation Handler
document.addEventListener("DOMContentLoaded", () => {
  
  // Check if we're on a subpage (not the main index)
  const isSubpage = !window.location.href.includes('index_02.08.2025.html') && 
                   window.location.href.includes('/pages/');
  
  if (!isSubpage) return; // Exit if not on a subpage
  
  console.log('🦶 Subpage footer navigation initialized');
  
  // Base URL for navigation back to index
  const indexURL = '../index_02.08.2025.html';
  
  // Handle footer links that should go to index sections
  const footerLinks = document.querySelectorAll('.footer-link');
  
  footerLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Handle different types of footer links
    if (href === '../index_02.08.2025.html#faq') {
      // FAQ link - show FAQ section in current subpage
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const faqSection = document.getElementById('faqSection');
        if (faqSection) {
          faqSection.classList.add('expanded');
          console.log('📋 Opening FAQ in subpage');
        }
      });
      
    } else if (href === '../index_02.08.2025.html#contact') {
      // Contact link - go to index contact section
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = `${indexURL}#contact`;
        console.log('📞 Navigating to contact section');
      });
      
    } else if (href === 'credits.html') {
      // Credits link - stay in subpages
      link.addEventListener('click', function(e) {
        // Let the default behavior handle this
        console.log('🏆 Navigating to credits subpage');
      });
      
    } else if (href === 'legal-notices.html') {
      // Legal notices link - stay in subpages
      link.addEventListener('click', function(e) {
        // Let the default behavior handle this
        console.log('⚖️ Navigating to legal notices subpage');
      });
      
    } else if (href.startsWith('../index_02.08.2025.html#')) {
      // Any other index section link
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = href.split('#')[1];
        window.location.href = `${indexURL}#${section}`;
        console.log(`🔗 Navigating to section: ${section}`);
      });
    }
  });
  
  // Ensure FAQ functionality works in subpages
  const faqSection = document.getElementById('faqSection');
  const faqCloseBtn = document.getElementById('faqCloseBtn');
  
  if (faqCloseBtn && faqSection) {
    faqCloseBtn.addEventListener('click', function() {
      faqSection.classList.remove('expanded');
      console.log('❌ Closing FAQ in subpage');
    });
  }
  
  // Close FAQ when clicking outside
  if (faqSection) {
    faqSection.addEventListener('click', function(e) {
      if (e.target === faqSection) {
        faqSection.classList.remove('expanded');
        console.log('🚫 Closing FAQ by clicking outside');
      }
    });
  }
  
  // FAQ items accordion functionality in subpages
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
          console.log('📖 Opening FAQ item in subpage');
        } else {
          console.log('📕 Closing FAQ item in subpage');
        }
      });
    }
  });
  
});
