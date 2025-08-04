// 🚀 GSAP PARALLAX SYSTEM - File dedicato per migliore organizzazione
// Assicuriamoci che GSAP sia caricato prima di inizializzare

function initGSAPParallax() {
  // Verifica che GSAP sia disponibile
  if (typeof gsap === 'undefined') {
    console.error('❌ GSAP non è caricato! Assicurati di includere la libreria GSAP prima di questo script.');
    return;
  }

  // Registra i plugin necessari
  gsap.registerPlugin(ScrollTrigger);
  console.log('🚀 Inizializzazione GSAP Parallax System');
  
  // 📝 PARALLAX TESTI con GSAP - Effetti più sofisticati
  const parallaxTexts = gsap.utils.toArray('.parallax-text:not(.hero .parallax-text)');
  console.log(`📝 GSAP: Trovati ${parallaxTexts.length} testi parallax`);
  
  parallaxTexts.forEach((text, index) => {
    // Inizializza stato nascosto con variazioni casuali
    const randomDelay = Math.random() * 0.3;
    const randomY = 30 + (Math.random() * 40);
    
    gsap.set(text, {
      opacity: 0,
      y: randomY,
      scale: 0.95,
      rotationX: 5
    });
    
    // Animazione di entrata più dinamica
    gsap.to(text, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.2 + randomDelay,
      ease: "power3.out",
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
  
  // 🖼️ PARALLAX IMMAGINI con GSAP - Effetti più elaborati
  const parallaxImages = gsap.utils.toArray('.parallax-image:not(.hero .parallax-image)');
  console.log(`🖼️ GSAP: Trovate ${parallaxImages.length} immagini parallax`);
  
  parallaxImages.forEach((image, index) => {
    gsap.set(image, {
      opacity: 0,
      scale: 0.8,
      y: 80,
      rotationY: 10
    });
    
    gsap.to(image, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationY: 0,
      duration: 1.8,
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
    
    // Parallax movimento 3D durante scroll
    gsap.to(image, {
      y: -50,
      rotationX: 5,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  });
  
  // 🎭 PARALLAX MOVIMENTO per elementi speciali - Design moderno
  const parallaxElements = gsap.utils.toArray('.parallax-img, .card-scroll, .ethics-card, .project-card-modern, .narrative-block');
  
  parallaxElements.forEach((element, index) => {
    // Movimento parallax più interessante
    gsap.to(element, {
      y: -30,
      rotationZ: 1,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8
      }
    });
    
    // Effetto hover 3D
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.02,
        rotationY: 5,
        z: 50,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
  
  // 🌊 PARALLAX SFONDI con effetti dinamici
  const bgElements = gsap.utils.toArray('.parallax-section');
  
  bgElements.forEach((section, index) => {
    gsap.to(section, {
      backgroundPosition: "0% 30%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  });
  
  // ✨ ANIMAZIONI PER NUOVI LAYOUT AUDACI
  
  // Narrative blocks con stagger effect
  const narrativeBlocks = gsap.utils.toArray('.narrative-block');
  narrativeBlocks.forEach((block, index) => {
    gsap.from(block, {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      rotationZ: index % 2 === 0 ? -3 : 3,
      duration: 1,
      delay: index * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: block,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });
  
  // Philosophy cards con rotazione
  const philosophyCards = gsap.utils.toArray('.philosophy-card');
  philosophyCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.5,
      rotation: 180,
      duration: 1.2,
      delay: index * 0.15,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
  
  // ✨ SEZIONI con fade in progressivo
  const sections = gsap.utils.toArray('section:not(.hero)');
  sections.forEach((section, index) => {
    gsap.from(section, {
      opacity: 0.2,
      duration: 1.5,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "top 30%",
        scrub: 1
      }
    });
  });
  
  // 🎯 ELEMENTI CON CLASSI UTILITY
  
  // Fade in up
  const fadeInUpElements = gsap.utils.toArray('.fade-in-up');
  fadeInUpElements.forEach((element, index) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: index * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => element.classList.add('visible')
      }
    });
  });
  
  // Slide in left
  const slideInLeftElements = gsap.utils.toArray('.slide-in-left');
  slideInLeftElements.forEach((element, index) => {
    gsap.from(element, {
      opacity: 0,
      x: -80,
      duration: 1,
      delay: index * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => element.classList.add('visible')
      }
    });
  });
  
  // Scale in
  const scaleInElements = gsap.utils.toArray('.scale-in');
  scaleInElements.forEach((element, index) => {
    gsap.from(element, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      delay: index * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => element.classList.add('visible')
      }
    });
  });
  
  // 🖼️ SUBHERO FRAME ANIMATION - Editorial breathing effect with GSAP
  const subheroElement = document.querySelector('.subhero');
  if (subheroElement) {
    console.log('�️ GSAP: Creazione animazione cornice SubHero');
    
    // Crea un elemento per la cornice se non esiste
    let frameElement = subheroElement.querySelector('.subhero-frame');
    if (!frameElement) {
      frameElement = document.createElement('div');
      frameElement.classList.add('subhero-frame');
      frameElement.style.cssText = `
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: 2px solid var(--text-primary);
        border-radius: 8px;
        pointer-events: none;
        z-index: 10;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
      `;
      subheroElement.appendChild(frameElement);
    }
    
    // Animazione GSAP breathing effect
    gsap.to(frameElement, {
      opacity: 0.6,
      scale: 1.008,
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.3)",
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
    
    gsap.set(frameElement, {
      opacity: 0.2
    });
  }

  console.log('✅ GSAP Parallax System inizializzato con successo!');
}

// 🔄 FUNZIONE DI REFRESH per riottimizzare dopo cambiamenti
function refreshGSAPParallax() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
    console.log('🔄 GSAP ScrollTrigger aggiornato');
  }
}

// 🧹 FUNZIONE DI PULIZIA per destroy quando necessario
function destroyGSAPParallax() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    console.log('🧹 GSAP Parallax pulito');
  }
}

// 🔄 INIZIALIZZAZIONE AUTOMATICA
document.addEventListener('DOMContentLoaded', () => {
  // Piccolo ritardo per assicurarsi che tutto sia caricato
  setTimeout(() => {
    initGSAPParallax();
  }, 500);
});

// Refresh dopo il caricamento completo
window.addEventListener('load', () => {
  refreshGSAPParallax();
});

// Esponi le funzioni globalmente per uso esterno se necessario
window.initGSAPParallax = initGSAPParallax;
window.refreshGSAPParallax = refreshGSAPParallax;
window.destroyGSAPParallax = destroyGSAPParallax;
