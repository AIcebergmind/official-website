/* ═══════════════════════════════════════════════════════════════
   HOTSPOT SYSTEM - Interactive Editorial Elements
   ═══════════════════════════════════════════════════════════════ */

class HotspotSystem {
  constructor() {
    this.hotspots = [];
    this.preview = null;
    this.previewImg = null;
    this.previewCaption = null;
    this.isGSAPReady = false;
    
    this.init();
  }

  init() {
    // Aspetta che GSAP sia disponibile
    this.waitForGSAP().then(() => {
      this.createPreviewContainer();
      this.initializeHotspots();
      this.bindEvents();
    });
  }

  waitForGSAP() {
    return new Promise((resolve) => {
      if (typeof gsap !== 'undefined') {
        this.isGSAPReady = true;
        resolve();
      } else {
        // Polling per GSAP
        const checkGSAP = setInterval(() => {
          if (typeof gsap !== 'undefined') {
            clearInterval(checkGSAP);
            this.isGSAPReady = true;
            resolve();
          }
        }, 100);
      }
    });
  }

  createPreviewContainer() {
    // Crea container per preview se non esiste
    if (!document.getElementById('hotspot-preview')) {
      const preview = document.createElement('div');
      preview.id = 'hotspot-preview';
      preview.className = 'hotspot-preview';
      
      const img = document.createElement('img');
      img.id = 'hotspot-img';
      img.alt = 'Hotspot Preview';
      
      const caption = document.createElement('div');
      caption.className = 'hotspot-preview-caption';
      
      preview.appendChild(img);
      preview.appendChild(caption);
      document.body.appendChild(preview);
      
      this.preview = preview;
      this.previewImg = img;
      this.previewCaption = caption;
    } else {
      this.preview = document.getElementById('hotspot-preview');
      this.previewImg = this.preview.querySelector('img');
      this.previewCaption = this.preview.querySelector('.hotspot-preview-caption');
    }
  }

  initializeHotspots() {
    this.hotspots = document.querySelectorAll('.hotspot');
    
    this.hotspots.forEach((hotspot, index) => {
      // Aggiungi attributi accessibility
      hotspot.setAttribute('tabindex', '0');
      hotspot.setAttribute('role', 'button');
      hotspot.setAttribute('aria-label', `Interactive hotspot ${index + 1}`);
      
      // Setup eventi
      this.setupHotspotEvents(hotspot);
    });
  }

  setupHotspotEvents(hotspot) {
    // Mouse events
    hotspot.addEventListener('mouseenter', (e) => this.showPreview(e.target));
    hotspot.addEventListener('mouseleave', (e) => this.hidePreview(e.target));
    
    // Keyboard events
    hotspot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.togglePreview(e.target);
      }
    });
    
    // Touch events for mobile
    hotspot.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.togglePreview(e.target);
    });
  }

  showPreview(hotspot) {
    const imgSrc = hotspot.getAttribute('data-image');
    const caption = hotspot.getAttribute('data-caption') || '';
    
    if (!imgSrc || !this.isGSAPReady) return;
    
    // Setup immagine
    this.previewImg.src = imgSrc;
    this.previewCaption.textContent = caption;
    
    // Mostra container
    this.preview.style.display = 'block';
    
    // Animazione GSAP
    gsap.fromTo(this.previewImg, 
      { 
        opacity: 0, 
        scale: 0.9,
        y: 20
      }, 
      { 
        opacity: 1, 
        scale: 1,
        y: 0,
        duration: 0.6, 
        ease: 'power3.out'
      }
    );
    
    // Animazione caption
    gsap.fromTo(this.previewCaption,
      { opacity: 0, y: 10 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.4,
        delay: 0.3,
        ease: 'power2.out'
      }
    );
    
    // Aggiungi classe attiva al hotspot
    hotspot.classList.add('hotspot-active');
  }

  hidePreview(hotspot) {
    if (!this.isGSAPReady) return;
    
    // Animazione uscita
    gsap.to(this.previewImg, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.4,
      ease: 'power2.in'
    });
    
    gsap.to(this.previewCaption, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.preview.style.display = 'none';
      }
    });
    
    // Rimuovi classe attiva
    hotspot.classList.remove('hotspot-active');
  }

  togglePreview(hotspot) {
    if (hotspot.classList.contains('hotspot-active')) {
      this.hidePreview(hotspot);
    } else {
      this.showPreview(hotspot);
    }
  }

  // Metodo per aggiungere hotspot dinamicamente
  addHotspot(container, options = {}) {
    const hotspot = document.createElement('div');
    hotspot.className = `hotspot ${options.position || 'hotspot-right'}`;
    hotspot.setAttribute('data-image', options.image || '');
    hotspot.setAttribute('data-caption', options.caption || '');
    
    const dot = document.createElement('div');
    dot.className = 'hotspot-dot';
    
    const label = document.createElement('div');
    label.className = 'hotspot-label';
    label.textContent = options.label || 'Explore';
    
    hotspot.appendChild(dot);
    hotspot.appendChild(label);
    container.appendChild(hotspot);
    
    // Setup eventi per il nuovo hotspot
    this.setupHotspotEvents(hotspot);
    
    return hotspot;
  }

  // Metodo per rimuovere hotspot
  removeHotspot(hotspot) {
    if (hotspot && hotspot.parentNode) {
      hotspot.parentNode.removeChild(hotspot);
    }
  }

  // Metodo per aggiornare immagine hotspot
  updateHotspotImage(hotspot, newImage, newCaption = '') {
    hotspot.setAttribute('data-image', newImage);
    hotspot.setAttribute('data-caption', newCaption);
  }
}

// Inizializzazione automatica quando DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  // Aspetta un po' per assicurarsi che GSAP sia caricato
  setTimeout(() => {
    window.hotspotSystem = new HotspotSystem();
  }, 500);
});

// Export per uso modulare
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HotspotSystem;
}
