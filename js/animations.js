// 🚀 GSAP PARALLAX SYSTEM - Molto più fluido e performante
// Registra i plugin GSAP
gsap.registerPlugin(ScrollTrigger);

function initGSAPParallax() {
  console.log('🚀 Inizializzazione GSAP Parallax System');
  
  // 🖼️ MINIMAL FRAME ANIMATION
  const subheroFrame = document.getElementById('subheroFrame');
  if (subheroFrame) {
    console.log('🖼️ SubHero Frame found, initializing animation...');
    
    // Inizializza lo stato dei bordi (nascosti)
    gsap.set(['.frame-border-top', '.frame-border-bottom'], { width: '0%' });
    gsap.set(['.frame-border-right', '.frame-border-left'], { height: '0%' });
    gsap.set(['.minimal-frame::before', '.minimal-frame::after'], { opacity: 0 });
    
    // Timeline per l'animazione sequenziale della cornice
    const frameTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: subheroFrame,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => console.log('🖼️ SubHero Frame animation started'),
        onLeave: () => console.log('🖼️ SubHero Frame animation completed')
      }
    });
    
    // Sequenza di animazione della cornice
    frameTimeline
      // 1. Bordo superiore (sinistra → destra)
      .to('.frame-border-top', {
        width: '100%',
        duration: 0.8,
        ease: "power2.out"
      })
      // 2. Bordo destro (alto → basso)
      .to('.frame-border-right', {
        height: '100%',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // 3. Bordo inferiore (destra → sinistra)
      .to('.frame-border-bottom', {
        width: '100%',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // 4. Bordo sinistro (basso → alto)
      .to('.frame-border-left', {
        height: '100%',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // 5. Corner dots appaiono
      .to('.minimal-frame::before', {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, "-=0.2")
      .to('.minimal-frame::after', {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, "-=0.3");
    
    // Hover effect sulla cornice
    subheroFrame.addEventListener('mouseenter', () => {
      gsap.to(['.frame-border-top', '.frame-border-right', '.frame-border-bottom', '.frame-border-left'], {
        background: 'rgba(255, 255, 255, 0.7)',
        duration: 0.3
      });
      
      gsap.to('.minimal-frame', {
        background: 'rgba(255, 255, 255, 0.05)',
        duration: 0.3
      });
    });
    
    subheroFrame.addEventListener('mouseleave', () => {
      gsap.to(['.frame-border-top', '.frame-border-right', '.frame-border-bottom', '.frame-border-left'], {
        background: 'rgba(255, 255, 255, 0.4)',
        duration: 0.3
      });
      
      gsap.to('.minimal-frame', {
        background: 'rgba(255, 255, 255, 0.02)',
        duration: 0.3
      });
    });
  } else {
    console.warn('🚨 SubHero Frame not found!');
  }
  
  // 🎨 PROJECT CARDS FRAME ANIMATION
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    console.log(`🎨 Trovate ${projectCards.length} project cards, inizializzazione animazioni...`);
    
    projectCards.forEach((card, index) => {
      // Inizializza lo stato dei bordi (nascosti)
      const borders = card.querySelectorAll('.frame-border-top, .frame-border-right, .frame-border-bottom, .frame-border-left');
      gsap.set(card.querySelectorAll('.frame-border-top, .frame-border-bottom'), { width: '0%' });
      gsap.set(card.querySelectorAll('.frame-border-right, .frame-border-left'), { height: '0%' });
      gsap.set(card, { '--corner-opacity': 0 });
      
      // Timeline per l'animazione sequenziale della cornice
      const cardFrameTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          onEnter: () => console.log(`🎨 Project Card ${index + 1} animation started`)
        }
      });
      
      // Sequenza di animazione della cornice - più veloce per le cards
      cardFrameTimeline
        // 1. Bordo superiore (sinistra → destra)
        .to(card.querySelector('.frame-border-top'), {
          width: '100%',
          duration: 0.6,
          ease: "power2.out"
        })
        // 2. Bordo destro (alto → basso) 
        .to(card.querySelector('.frame-border-right'), {
          height: '100%',
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        // 3. Bordo inferiore (destra → sinistra)
        .to(card.querySelector('.frame-border-bottom'), {
          width: '100%',
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        // 4. Bordo sinistro (basso → alto)
        .to(card.querySelector('.frame-border-left'), {
          height: '100%',
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        // 5. Corner dot appare
        .to(card, {
          '--corner-opacity': 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, "-=0.2");
      
      // Hover effect sulle project cards
      card.addEventListener('mouseenter', () => {
        gsap.to(borders, {
          background: 'rgba(255, 255, 255, 0.6)',
          duration: 0.3
        });
        
        gsap.to(card, {
          background: 'rgba(255, 255, 255, 0.08)',
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(borders, {
          background: 'rgba(255, 255, 255, 0.4)',
          duration: 0.3
        });
        
        gsap.to(card, {
          background: 'rgba(255, 255, 255, 0.02)',
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  } else {
    console.warn('🚨 Project Cards not found!');
  }
  
  // 📝 PARALLAX TESTI con GSAP
  const parallaxTexts = gsap.utils.toArray('.parallax-text:not(.hero .parallax-text)');
  console.log(`📝 GSAP: Trovati ${parallaxTexts.length} testi parallax`);
  
  parallaxTexts.forEach((text, index) => {
    // Inizializza stato nascosto
    gsap.set(text, {
      opacity: 0,
      y: 50,
      scale: 0.95
    });
    
    // Animazione di entrata
    gsap.to(text, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: text,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          text.classList.add('in-view');
          console.log(`📝 GSAP Testo attivato: ${index}`);
        }
      }
    });
  });
  
  // 🖼️ PARALLAX IMMAGINI con GSAP
  const parallaxImages = gsap.utils.toArray('.parallax-image:not(.hero .parallax-image)');
  console.log(`🖼️ GSAP: Trovate ${parallaxImages.length} immagini parallax`);
  
  parallaxImages.forEach((image, index) => {
    gsap.set(image, {
      opacity: 0,
      scale: 0.8,
      y: 60
    });
    
    gsap.to(image, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          console.log(`🖼️ GSAP Immagine attivata: ${index}`);
        }
      }
    });
    
    // Parallax movimento durante scroll
    gsap.to(image, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
  
  // 🎭 PARALLAX MOVIMENTO per elementi speciali
  const parallaxElements = gsap.utils.toArray('.parallax-img, .card-scroll, .ethics-card');
  
  parallaxElements.forEach((element, index) => {
    gsap.to(element, {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
  });
  
  // 🌊 PARALLAX SFONDI
  const bgElements = gsap.utils.toArray('.parallax-section');
  
  bgElements.forEach((section, index) => {
    gsap.to(section, {
      backgroundPosition: "0% 20%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });
  
  // ✨ EFFETTI SPECIALI per le sezioni - Parallax Opacity DISATTIVATO
  const sections = gsap.utils.toArray('section:not(.hero)');
  sections.forEach((section, index) => {
    // Fade in delle sezioni durante lo scroll - TEMPORANEAMENTE DISATTIVATO
    gsap.from(section, {
      opacity: 0, // Cambiato da 0.3 a 0 per disattivare l'effetto
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        scrub: 1
      }
    });
  });
  
  console.log('🚀 GSAP Parallax System completamente inizializzato!');
}

// Inizializza GSAP quando il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
  console.log('🎬 Initializing GSAP Parallax System...');
  if (typeof gsap !== 'undefined') {
    initGSAPParallax();
    
    // 🎭 Inizializza gli effetti hero spettacolari
    console.log('🎭 Inizializzazione Hero Text Effects...');
    try {
      initHeroTextEffects();
      console.log('✅ Hero Text Effects inizializzati con successo!');
    } catch (error) {
      console.error('❌ Errore in initHeroTextEffects:', error);
    }
  } else {
    console.warn('🚨 GSAP not loaded!');
  }
});

// ✅ EFFETTO COMPOSIZIONE TESTO LETTERA PER LETTERA CON CLASSE CSS
document.addEventListener("DOMContentLoaded", () => {
  
  // Funzione per applicare l'effetto composizione testo
  function applyTextCompositionEffect(element) {
    // Salva il contenuto HTML originale per preservare <br> e altri tag
    const originalHTML = element.innerHTML;
    const originalStyle = window.getComputedStyle(element);
    
    // Evita overflow sui contenitori
    const parent = element.parentElement;
    if (parent) {
      parent.style.overflow = 'hidden';
    }
    
    // Funzione per processare nodi di testo preservando la struttura
    function processTextNode(textNode) {
      const text = textNode.textContent;
      const letters = [];
      
      // Crea span per ogni lettera
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserva spazi
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        span.style.opacity = '0';
        span.style.transform = 'translateX(20px) scale(0.8)'; // 🔥 Ridotto da 50px a 20px
        span.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        span.dataset.letterIndex = letters.length; // Indice globale
        letters.push(span);
      });
      
      // Sostituisce il nodo di testo con gli span
      const fragment = document.createDocumentFragment();
      letters.forEach(letter => fragment.appendChild(letter));
      textNode.parentNode.replaceChild(fragment, textNode);
      
      return letters;
    }
    
    // Trova tutti i nodi di testo nell'elemento
    function getTextNodes(node) {
      const textNodes = [];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textNodes.push(node);
      } else {
        for (let child of node.childNodes) {
          textNodes.push(...getTextNodes(child));
        }
      }
      return textNodes;
    }
    
    // Processa tutti i nodi di testo
    const textNodes = getTextNodes(element);
    const allLetters = [];
    
    textNodes.forEach(textNode => {
      const letters = processTextNode(textNode);
      allLetters.push(...letters);
    });
    
    // Aggiorna gli indici per l'animazione sequenziale
    allLetters.forEach((letter, globalIndex) => {
      letter.style.transitionDelay = `${globalIndex * 0.03}s`;
      letter.dataset.globalIndex = globalIndex;
    });
    
    // Marca come processato
    element.dataset.textComposition = 'processed';
    
    // Intersection Observer per attivare l'animazione
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ritardo di attivazione per rendere l'effetto più elegante
          setTimeout(() => {
            // Attiva l'animazione delle lettere
            allLetters.forEach((letter, index) => {
              setTimeout(() => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateX(0px) scale(1)';
              }, index * 30);
            });
          }, 300); // Ritardo iniziale di 300ms
          
          // Smette di osservare una volta attivato
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Attiva quando anche solo il 10% dell'elemento è visibile
      rootMargin: '0px 0px 0px 0px' // Nessun margine - attiva appena è in vista
    });
    
    observer.observe(element);
    
    // CONTROLLO IMMEDIATO: Se l'elemento è già visibile al caricamento, attiva subito
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && allLetters.length > 0 && allLetters[0].style.opacity === '0') {
        // Ritardo di attivazione anche per elementi già visibili
        setTimeout(() => {
          // Attiva l'animazione immediatamente
          allLetters.forEach((letter, index) => {
            setTimeout(() => {
              letter.style.opacity = '1';
              letter.style.transform = 'translateX(0px) scale(1)';
            }, index * 30);
          });
        }, 500); // Ritardo maggiore per elementi già visibili (hero section)
        observer.unobserve(element);
      }
    }, 200); // Piccolo delay per assicurarsi che il DOM sia pronto
  }
  
  // AUTO-RILEVAMENTO: Cerca automaticamente tutti gli elementi con la classe 'text-compose'
  // ESCLUSI: elementi che hanno 'no-text-compose' o 'mobile-no-text-compose' su mobile
  function initTextComposition() {
    const isMobile = window.innerWidth <= 768;
    let selector = '.text-compose:not(.no-text-compose):not([data-text-composition="processed"])';
    
    // Su mobile, escludi anche gli elementi con 'mobile-no-text-compose'
    if (isMobile) {
      selector = '.text-compose:not(.no-text-compose):not(.mobile-no-text-compose):not([data-text-composition="processed"])';
    }
    
    const textComposeElements = document.querySelectorAll(selector);
    
    textComposeElements.forEach(element => {
      applyTextCompositionEffect(element);
    });
  }
  
  // Avvia il rilevamento automatico
  setTimeout(initTextComposition, 100);
  
  // Espone la funzione globalmente per il riuso
  window.initTextComposition = initTextComposition;
  
  // Funzione globale per applicare manualmente l'effetto (opzionale)
  window.activateTextComposition = function(selectors) {
    if (typeof selectors === 'string') {
      selectors = [selectors];
    }
    
    selectors.forEach(selector => {
      const targetElements = document.querySelectorAll(`${selector}:not([data-text-composition="processed"])`);
      targetElements.forEach(element => {
        applyTextCompositionEffect(element);
      });
    });
  };
});

// ✅ ACCORDION RIUTILIZZABILE
document.addEventListener("DOMContentLoaded", () => {
  // Gestione click Read More riutilizzabile
  const readMoreBtn = document.getElementById('readMoreBtn');
  const readMoreContent = document.getElementById('readMoreContent');
  const readMoreText = readMoreBtn?.querySelector('.read-more-text');
  const readLessText = readMoreBtn?.querySelector('.read-less-text');
  
  if (readMoreBtn && readMoreContent) {
    readMoreBtn.addEventListener('click', () => {
      const isOpen = readMoreContent.classList.contains('open');
      
      if (isOpen) {
        // Chiudi: contenuto completo -> solo preview
        readMoreContent.classList.remove('open');
        readMoreText.style.display = 'inline';
        readLessText.style.display = 'none';
      } else {
        // Apri: mostra contenuto completo
        readMoreContent.classList.add('open');
        readMoreText.style.display = 'none';
        readLessText.style.display = 'inline';
        
        // Attiva text-compose sul nuovo contenuto
        setTimeout(() => {
          if (window.initTextComposition) {
            window.initTextComposition();
          }
        }, 100);
      }
    });
  }
});

// Project Cards Interaction
document.addEventListener("DOMContentLoaded", () => {
  // 🎯 MINIMAL PROJECT CARDS INTERACTION
  const projectCards = document.querySelectorAll('.project-card');
  const projectBtns = document.querySelectorAll('.project-btn');
  const indicatorDots = document.querySelectorAll('.indicator-dot');
  const projectsGrid = document.querySelector('.horizontal-scroll-content.projects-grid');
  
  // Project cards click handlers
  projectCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      // Prevent button click from triggering card click
      if (e.target.classList.contains('project-btn')) return;
      
      const projectTitle = card.querySelector('.project-title')?.textContent || `Project ${index + 1}`;
      console.log(`🚀 Opening project: ${projectTitle}`);
      
      // Add visual feedback
      card.style.transform = 'scale(0.98) translateY(-4px)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
      
      showProjectNotification(projectTitle, 'info');
    });
  });
  
  // Project buttons click handlers
  projectBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click
      
      const card = btn.closest('.project-card');
      const projectTitle = card.querySelector('.project-title')?.textContent || `Project ${index + 1}`;
      
      console.log(`📋 View details for: ${projectTitle}`);
      
      // Add button animation
      btn.style.transform = 'translateX(10px) scale(1.05)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
      
      showProjectNotification(`${projectTitle} - Details`, 'explore');
    });
  });
  
  // Indicator dots navigation
  indicatorDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Update active dot
      console.log(`🎯 Navigating to project ${index + 1}`);
    });
  });
  
  // Auto-update indicator dots on scroll
  if (projectsGrid) {
    projectsGrid.addEventListener('scroll', () => {
      // Update active dot based on scroll position
      const scrollLeft = projectsGrid.scrollLeft;
      const cardWidth = projectsGrid.scrollWidth / projectCards.length;
      const activeIndex = Math.round(scrollLeft / cardWidth);
      
      indicatorDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    });
  }
  
  // Project notification function
  function showProjectNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.project-notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'project-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      opacity: 0;
      transform: translateX(100px);
      transition: all 0.3s ease;
    `;
    
    // Set icon based on type
    const icon = type === 'explore' ? '🔍' : '🚀';
    notification.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Add hover effects for project cards
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  console.log('🎯 Minimal Project Cards initialized!');
});

// === ETHICS SECTION FUNCTIONALITY ===
function toggleEthicsCard(card) {
  console.log('toggleEthicsCard called for card:', card.getAttribute('data-id'));
  console.log('Card classes before:', card.className);
  
  const isCurrentlyExpanded = card.classList.contains('expanded');
  
  // Close ALL cards first (including the clicked one)
  const allCards = document.querySelectorAll('.ethics-card');
  allCards.forEach(otherCard => {
    otherCard.classList.remove('expanded');
  });
  
  // If the clicked card was NOT expanded, expand it
  if (!isCurrentlyExpanded) {
    card.classList.add('expanded');
  }
}

// Keyboard accessibility for ethics cards
document.addEventListener('DOMContentLoaded', function() {
  const ethicsCards = document.querySelectorAll('.ethics-card');
  
  ethicsCards.forEach(card => {
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEthicsCard(card);
      }
    });
  });
});

// === FAQ FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
  // FAQ Link - Show/Hide FAQ Section
  const faqLink = document.querySelector('a[href="#faq"]');
  const faqSection = document.getElementById('faqSection');
  const faqCloseBtn = document.getElementById('faqCloseBtn');
  
  if (faqLink && faqSection) {
    faqLink.addEventListener('click', function(e) {
      e.preventDefault();
      faqSection.classList.add('expanded');
    });
  }
  
  if (faqCloseBtn && faqSection) {
    faqCloseBtn.addEventListener('click', function() {
      faqSection.classList.remove('expanded');
    });
  }
  
  // Close FAQ when clicking outside
  if (faqSection) {
    faqSection.addEventListener('click', function(e) {
      if (e.target === faqSection) {
        faqSection.classList.remove('expanded');
      }
    });
  }
  
  // FAQ Accordion Functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const otherAnswer = item.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });
      
      // Toggle current FAQ item
      if (isActive) {
        faqItem.classList.remove('active');
        faqAnswer.style.maxHeight = null;
      } else {
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });
});

// === ACCORDION FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
  // Details/Summary Accordion Enhancement
  const detailsElements = document.querySelectorAll('details');
  
  detailsElements.forEach(details => {
    const summary = details.querySelector('summary');
    
    if (summary) {
      summary.addEventListener('click', function(e) {
        // Add smooth animation class
        details.classList.add('details-animating');
        
        setTimeout(() => {
          details.classList.remove('details-animating');
        }, 300);
      });
    }
  });
});

// === FOOTER FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
  // Footer Links Functionality
  const footerLinks = document.querySelectorAll('.footer-link');
  
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Handle special links
      if (href === '#ai-responsibility') {
        e.preventDefault();
        // Scroll to ethics section
        const ethicsSection = document.getElementById('ethics');
        if (ethicsSection) {
          ethicsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      
      if (href === '#contact') {
        e.preventDefault();
        // Create contact notification
        showNotification('Contact us at: hello@aicebergmind.com');
      }
      
      if (href === '#mentions') {
        e.preventDefault();
        showNotification('Legal mentions coming soon');
      }
    });
  });
  
  // Footer Notification Function
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'footer-notification';
    notification.innerHTML = `
      <p>${message}</p>
      <button class="notification-close">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
});

// === SMOOTH SCROLLING FOR ANCHOR LINKS ===
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced smooth scrolling for all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's a special handler or empty
      if (href === '#' || href === '#faq' || href === '#ai-responsibility' || href === '#contact' || href === '#mentions') {
        return;
      }
      
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// 🎭 HERO TEXT EFFECTS - Effetti spettacolari per i testi dell'hero  
function initHeroTextEffects() {
  console.log('🎭 Inizializzazione Hero Text Effects');
  
  const heroTitle = document.querySelector('.hero-title-editorial');
  const heroSubtitle = document.querySelector('.hero-subtitle-editorial');
  const heroCaption = document.querySelector('.editorial-caption');
  const strongElement = document.querySelector('.hero-title-editorial strong');
  
  if (!heroTitle) {
    console.warn('❌ Hero title non trovato');
    return;
  }
  
  console.log('✅ Elementi hero trovati, inizializzazione effetti...');
  
  // 🌊 EFFETTO 1: ENTRATA SPETTACOLARE
  function createHeroEntrance() {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Nascondi tutto inizialmente
    gsap.set([heroTitle, heroSubtitle], { opacity: 0 });
    
    // 1. Entrata drammatica del gradiente "AI"
    if (strongElement) {
      gsap.set(strongElement, { 
        y: 80, 
        opacity: 0, 
        scale: 0.8,
        rotationX: 45 
      });
      
      tl.to(strongElement, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.8)"
      });
    }
    
    // 2. Resto del titolo con effetto cristallizzazione
    tl.to(heroTitle, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=1");
    
    // 3. Sottotitolo con effetto blur dissolve
    if (heroSubtitle) {
      gsap.set(heroSubtitle, { 
        y: 30, 
        opacity: 0, 
        filter: "blur(8px)" 
      });
      
      tl.to(heroSubtitle, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.6");
    }
    
    return tl;
  }
  
  // 🧊 EFFETTO 2: MOUSE PARALLAX DEPTH
  function createMouseParallax() {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Usa requestAnimationFrame per performance migliori
    function updateParallax() {
      if (strongElement) {
        gsap.to(strongElement, {
          x: mouseX * 20,
          y: mouseY * 15,
          duration: 1.5,
          ease: "power2.out"
        });
      }
      
      gsap.to(heroTitle, {
        x: mouseX * -8,
        y: mouseY * -5,
        duration: 1.8,
        ease: "power2.out"
      });
      
      if (heroSubtitle) {
        gsap.to(heroSubtitle, {
          x: mouseX * 5,
          y: mouseY * 3,
          duration: 2,
          ease: "power2.out"
        });
      }
      
      requestAnimationFrame(updateParallax);
    }
    
    updateParallax();
  }
  
  // 🌀 EFFETTO 3: FLOATING CONTINUO
  function createFloatingEffect() {
    if (strongElement) {
      gsap.to(strongElement, {
        y: "+=8",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      
      gsap.to(strongElement, {
        rotation: "+=2",
        duration: 4,
        ease: "sine.inOut", 
        repeat: -1,
        yoyo: true
      });
    }
    
    if (heroSubtitle) {
      gsap.to(heroSubtitle, {
        y: "+=5",
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });
    }
  }
  
  // ✨ EFFETTO 4: SCROLL IMMERSION
  function createScrollEffects() {
    ScrollTrigger.create({
      trigger: '.hero',
      start: "top center",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        
        gsap.to(heroTitle, {
          y: progress * -40,
          opacity: 1 - progress * 0.4,
          scale: 1 - progress * 0.1,
          duration: 0.3
        });
        
        if (heroSubtitle) {
          gsap.to(heroSubtitle, {
            y: progress * -25,
            opacity: 1 - progress * 0.6,
            duration: 0.3
          });
        }
      }
    });
  }
  
  // 🎬 SEQUENZA DI ATTIVAZIONE
  const entranceTimeline = createHeroEntrance();
  
  entranceTimeline.call(() => {
    console.log('🎭 Attivando effetti interattivi...');
    createMouseParallax();
    createFloatingEffect();
    createScrollEffects();
    initTextFrameAnimations(); // ✨ Aggiungiamo l'animazione dei text-frame
    console.log('✅ Tutti gli effetti hero attivati!');
  });
}

// 🎯 TEXT FRAME SCROLL ANIMATIONS
function initTextFrameAnimations() {
  console.log('🎯 Inizializzazione Text Frame Animations');
  
  const textFrames = document.querySelectorAll('.text-frame');
  
  if (textFrames.length === 0) {
    console.log('⚠️ Nessun text-frame trovato');
    return;
  }
  
  textFrames.forEach((frame, index) => {
    console.log(`🖼️ Configurando text-frame ${index + 1}`);
    
    // ScrollTrigger per l'animazione al scroll
    ScrollTrigger.create({
      trigger: frame,
      start: "top 80%", // Quando l'elemento entra nel viewport (80% dall'alto)
      end: "bottom 20%", // Quando l'elemento esce dal viewport (20% dal basso)
      toggleActions: "play none none reverse", // play al enter, reverse al leave
      onEnter: () => {
        console.log(`✨ Text-frame ${index + 1} entrato nel viewport`);
        frame.classList.add('animate-in');
      },
      onLeave: () => {
        console.log(`🌅 Text-frame ${index + 1} uscito dal viewport (su)`);
        frame.classList.remove('animate-in');
      },
      onEnterBack: () => {
        console.log(`🔄 Text-frame ${index + 1} rientrato nel viewport (giù)`);
        frame.classList.add('animate-in');
      },
      onLeaveBack: () => {
        console.log(`🌄 Text-frame ${index + 1} uscito dal viewport (giù)`);
        frame.classList.remove('animate-in');
      }
    });
  });
  
  console.log(`✅ ${textFrames.length} text-frame configurati per scroll animations`);
}

// ===== TEXT COMPOSE ANIMATION SYSTEM =====
// Animazione GSAP che compone il testo frase per frase (più veloce)
function initTextComposeAnimations() {
  console.log('📝 Inizializzazione Text Compose Animation System');
  
  // Trova tutti gli elementi con classe .text-compose
  const textComposeElements = document.querySelectorAll('.text-compose');
  
  if (textComposeElements.length === 0) {
    console.log('❌ Nessun elemento .text-compose trovato');
    return;
  }
  
  textComposeElements.forEach((element, index) => {
    console.log(`📝 Configurando text-compose ${index + 1}`);
    
    // Legge animation-delay dal CSS inline
    const computedStyle = window.getComputedStyle(element);
    let customDelay = 0;
    
    // Prova a leggere l'animation-delay dallo style inline
    if (element.style.animationDelay) {
      customDelay = parseFloat(element.style.animationDelay);
      console.log(`⏱️ Delay personalizzato trovato: ${customDelay}s`);
    }
    
    // Trova tutti i paragrafi all'interno dell'elemento, o l'elemento stesso se è un titolo
    let sentences = element.querySelectorAll('.editorial-body, .pullquote, .content-block-title');
    
    // Se non troviamo elementi figli, controlla se l'elemento stesso è animabile
    if (sentences.length === 0 && (element.classList.contains('editorial-body') || 
                                   element.classList.contains('pullquote') || 
                                   element.classList.contains('content-block-title'))) {
      sentences = [element];
    }
    
    if (sentences.length === 0) {
      console.log(`⚠️ Nessuna frase trovata in text-compose ${index + 1}`);
      return;
    }
    
    console.log(`📝 Trovate ${sentences.length} frasi da animare`);
    
    // ScrollTrigger per animare le frasi in sequenza (più veloce)
    ScrollTrigger.create({
      trigger: element,
      start: "top 80%", // Quando l'elemento entra nel viewport (80% dall'alto)
      end: "bottom 20%", // Quando l'elemento esce dal viewport (20% dal basso)
      toggleActions: "play none none reverse",
      onEnter: () => {
        console.log(`✨ Text-compose ${index + 1} entrato nel viewport - iniziando animazione frasi con delay ${customDelay}s`);
        
        // Anima ogni frase con un delay progressivo più veloce + delay personalizzato
        sentences.forEach((sentence, sentenceIndex) => {
          gsap.to(sentence, {
            opacity: 1,
            y: 0,
            duration: 0.4, // Ridotto da 0.8 a 0.4
            delay: customDelay + (sentenceIndex * 0.1), // Aggiunge il delay personalizzato
            ease: "power2.out",
            onComplete: () => {
              sentence.classList.add('composed');
              console.log(`📝 Frase ${sentenceIndex + 1} composta`);
            }
          });
          
          // Assicura che gli elementi strong rimangano sempre visibili
          const strongElements = sentence.querySelectorAll('strong');
          strongElements.forEach(strong => {
            gsap.set(strong, { opacity: 1, visibility: 'visible' });
          });
        });
      },
      onLeave: () => {
        console.log(`🌅 Text-compose ${index + 1} uscito dal viewport (su)`);
        sentences.forEach(sentence => {
          sentence.classList.remove('composed');
          gsap.set(sentence, { opacity: 0, y: 15 });
        });
      },
      onEnterBack: () => {
        console.log(`🔄 Text-compose ${index + 1} rientrato nel viewport (giù)`);
        
        // Riavvia l'animazione delle frasi con delay personalizzato
        sentences.forEach((sentence, sentenceIndex) => {
          gsap.to(sentence, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: customDelay + (sentenceIndex * 0.08), // Aggiunge il delay personalizzato anche qui
            ease: "power2.out",
            onComplete: () => {
              sentence.classList.add('composed');
            }
          });
          
          // Assicura che gli elementi strong rimangano sempre visibili
          const strongElements = sentence.querySelectorAll('strong');
          strongElements.forEach(strong => {
            gsap.set(strong, { opacity: 1, visibility: 'visible' });
          });
        });
      },
      onLeaveBack: () => {
        console.log(`🌄 Text-compose ${index + 1} uscito dal viewport (giù)`);
        sentences.forEach(sentence => {
          sentence.classList.remove('composed');
          gsap.set(sentence, { opacity: 0, y: 15 });
        });
      }
    });
  });
  
  console.log(`✅ ${textComposeElements.length} text-compose elementi configurati`);
}

// ===== TEXT COLLAPSE SYSTEM =====
// Sistema accordion che si apre al hover
function initTextCollapseSystem() {
  console.log('📚 Inizializzazione Text Collapse System (Accordion Hover)');
  
  const collapseElements = document.querySelectorAll('.text-collapse');
  
  if (collapseElements.length === 0) {
    console.log('❌ Nessun elemento .text-collapse trovato');
    return;
  }
  
  collapseElements.forEach((element, index) => {
    console.log(`📚 Configurando text-collapse ${index + 1}`);
    
    const content = element.querySelector('.collapse-content');
    const header = element.querySelector('.collapse-header');
    
    if (!content) {
      console.log(`⚠️ Struttura incompleta per text-collapse ${index + 1}`);
      return;
    }
    
    // Event listener per hover
    element.addEventListener('mouseenter', () => {
      element.classList.add('expanded');
      console.log(`📚 Text-collapse ${index + 1} espanso (hover)`);
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('expanded');
      console.log(`📚 Text-collapse ${index + 1} collassato (leave)`);
    });
    
    // Optional: click toggle per dispositivi touch
    if (header) {
      header.addEventListener('click', () => {
        element.classList.toggle('expanded');
        console.log(`📚 Text-collapse ${index + 1} toggle (click)`);
      });
    }
  });
  
  console.log(`✅ ${collapseElements.length} text-collapse elementi configurati`);
}

// ===== LINE COMPOSE ANIMATION SYSTEM =====
function initLineComposeAnimations() {
  console.log('🎯 Inizializzazione Line Compose Animation System...');
  
  const lineComposeElements = document.querySelectorAll('.line-compose');
  
  if (lineComposeElements.length === 0) {
    console.log('ℹ️ Nessun elemento .line-compose trovato');
    return;
  }
  
  lineComposeElements.forEach((container, index) => {
    console.log(`🎯 Configurazione line-compose container ${index + 1}`);
    
    // Seleziona tutti gli elementi di testo da animare
    const textElements = container.querySelectorAll('.editorial-body, .pullquote, .editorial-heading, .editorial-subheading, p');
    
    textElements.forEach((element, elementIndex) => {
      // Forza la visibilità degli elementi strong
      const strongElements = element.querySelectorAll('strong');
      strongElements.forEach(strong => {
        gsap.set(strong, {
          opacity: 1,
          visibility: 'visible',
          color: 'rgba(0, 212, 255, 0.9)'
        });
      });
      
      // Configura ScrollTrigger per ogni elemento di testo
      ScrollTrigger.create({
        trigger: element,
        start: "top 90%", // 🎯 Cambia qui per viewport diversa (70%, 80%, 90%, etc.)
        end: "top 20%",
        onEnter: () => {
          element.classList.add('line-visible');
          console.log(`✨ Line-compose elemento ${elementIndex + 1} animato (enter)`);
        },
        onLeave: () => {
          element.classList.remove('line-visible');
          console.log(`🌙 Line-compose elemento ${elementIndex + 1} nascosto (leave)`);
        },
        onEnterBack: () => {
          element.classList.add('line-visible');
          console.log(`✨ Line-compose elemento ${elementIndex + 1} ri-animato (enter back)`);
        },
        onLeaveBack: () => {
          element.classList.remove('line-visible');
          console.log(`🌙 Line-compose elemento ${elementIndex + 1} ri-nascosto (leave back)`);
        }
      });
    });
  });
  
  console.log(`✅ ${lineComposeElements.length} line-compose containers configurati`);
}

// ===== GESTIONE CONFLITTI DETAILS/TEXT-COLLAPSE =====
function handleDetailsConflicts() {
  console.log('🔧 Inizializzazione gestione conflitti details/text-collapse...');
  
  const detailsElements = document.querySelectorAll('details');
  
  detailsElements.forEach((details, index) => {
    console.log(`🔧 Configurazione details ${index + 1}`);
    
    details.addEventListener('toggle', () => {
      console.log(`📖 Details ${index + 1} toggled - Aggiornamento ScrollTrigger`);
      
      // Piccolo delay per permettere al DOM di aggiornarsi
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
          console.log('🔄 ScrollTrigger refreshed per conflitto details');
        }
      }, 100);
    });
  });
  
  console.log(`✅ ${detailsElements.length} elements details configurati per gestione conflitti`);
}

// ===== SUPPORT STICKY BUTTON SYSTEM =====
function initSupportStickyButton() {
  console.log('🛍️ Inizializzazione Support Sticky Button System');
  
  const supportButton = document.getElementById('supportStickyButton');
  if (!supportButton) {
    console.log('⚠️ Support button non trovato nel DOM');
    return;
  }
  
  const progressBar = supportButton.querySelector('.support-progress-bar');
  const footer = document.querySelector('.site-footer');
  
  let isVisible = false;
  let scrollProgress = 0;
  
  // Calcola la progress bar e visibilità
  function updateStickyButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const footerRect = footer ? footer.getBoundingClientRect() : null;
    const footerInView = footerRect ? footerRect.top < window.innerHeight : false;
    
    // Calcola progresso scroll (0-100%)
    scrollProgress = Math.min((scrollTop / documentHeight) * 100, 100);
    
    // Aggiorna progress bar
    if (progressBar) {
      progressBar.style.width = `${scrollProgress}%`;
    }
    
    // Logica visibilità: mostra dopo 10% scroll, nascondi quando footer è visibile o scroll al 100%
    const shouldShow = scrollProgress > 10 && scrollProgress < 100 && !footerInView;
    
    if (shouldShow && !isVisible) {
      showSupportButton();
    } else if (!shouldShow && isVisible) {
      hideSupportButton();
    }
  }
  
  // Mostra il button con animazione
  function showSupportButton() {
    isVisible = true;
    supportButton.classList.remove('hidden');
    supportButton.classList.add('visible', 'fade-in');
    
    // Rimuovi classe fade-in dopo animazione
    setTimeout(() => {
      supportButton.classList.remove('fade-in');
    }, 600);
    
    console.log('🛍️ Support button mostrato');
  }
  
  // Nascondi il button con animazione
  function hideSupportButton() {
    isVisible = false;
    supportButton.classList.remove('visible');
    supportButton.classList.add('hidden', 'fade-out');
    
    // Rimuovi classe fade-out dopo animazione
    setTimeout(() => {
      supportButton.classList.remove('fade-out');
    }, 400);
    
    console.log('🛍️ Support button nascosto');
  }
  
  // Aggiungi effetto pulse occasionale per attirare attenzione
  function addPulseEffect() {
    if (isVisible && Math.random() > 0.7) { // 30% di possibilità
      supportButton.querySelector('.support-button').classList.add('pulse');
      setTimeout(() => {
        supportButton.querySelector('.support-button').classList.remove('pulse');
      }, 2000);
    }
  }
  
  // Event listeners
  window.addEventListener('scroll', updateStickyButton, { passive: true });
  window.addEventListener('resize', updateStickyButton, { passive: true });
  
  // Pulse effect ogni 15 secondi
  setInterval(addPulseEffect, 15000);
  
  // Inizializzazione
  updateStickyButton();
  
  console.log('✅ Support Sticky Button System inizializzato');
}

// ===== INIZIALIZZAZIONE PRINCIPALE =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Inizializzazione completa Animation System');
  
  // Forza la visibilità di tutti gli elementi strong
  const allStrongElements = document.querySelectorAll('.text-compose strong, .text-collapse strong, .line-compose strong');
  allStrongElements.forEach(strong => {
    strong.style.opacity = '1';
    strong.style.visibility = 'visible';
    strong.style.color = 'rgba(0, 212, 255, 0.9)';
  });
  
  // Inizializza tutti i sistemi di animazione
  initTextFrameAnimations();
  initTextComposeAnimations();
  initTextCollapseSystem();
  initLineComposeAnimations();
  handleDetailsConflicts();
  initSupportStickyButton();
  
  console.log('✅ Tutti i sistemi di animazione inizializzati');
  console.log(`✅ ${allStrongElements.length} elementi strong forzati come visibili`);
});
