/**
 * ========================================
 * SUBPAGES JAVASCRIPT CONTROLLER
 * ========================================
 */

class SubpageController {
  constructor() {
    this.isLoaded = false;
    this.animationElements = [];
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupSubpage());
    } else {
      this.setupSubpage();
    }
  }
  
  setupSubpage() {
    this.setupAnimations();
    this.setupNavigation();
    this.setupInteractions();
    this.handlePageLoad();
  }
  
  setupAnimations() {
    // Trova tutti gli elementi da animare
    this.animationElements = document.querySelectorAll('.subpage-section, .subpage-card');
    
    // Applica le classi di animazione
    this.animationElements.forEach((element, index) => {
      element.classList.add('subpage-fade-in');
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }
  
  setupNavigation() {
    // Gestisce il link "back" 
    const backLink = document.querySelector('.subpage-back-link');
    if (backLink) {
      backLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateBack();
      });
    }
    
    // Gestisce i link interni alla pagina
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.smoothScrollTo(link.getAttribute('href'));
      });
    });
  }
  
  setupInteractions() {
    // Aggiungi effetti hover sui card
    const cards = document.querySelectorAll('.subpage-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
    });
    
    // Aggiungi scroll reveal per elementi che appaiono durante lo scroll
    this.setupScrollReveal();
  }
  
  setupScrollReveal() {
    // Osservatore per elementi che appaiono durante lo scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('subpage-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Osserva tutti gli elementi che devono apparire con lo scroll
    const scrollElements = document.querySelectorAll('.subpage-card:not(.subpage-fade-in)');
    scrollElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  navigateBack() {
    // Animazione di uscita
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      // Torna alla pagina principale
      window.location.href = '../index_02.08.2025.html';
    }, 300);
  }
  
  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  handlePageLoad() {
    // Animazione di entrata della pagina
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    // Fade in della pagina
    setTimeout(() => {
      document.body.style.transition = 'all 0.6s ease';
      document.body.style.opacity = '1';
      document.body.style.transform = 'translateY(0)';
    }, 100);
    
    this.isLoaded = true;
  }
  
  // Metodi utili per contenuto dinamico
  addSection(title, content, meta = '') {
    const container = document.querySelector('.subpage-content');
    const section = document.createElement('div');
    section.className = 'subpage-section subpage-fade-in';
    
    section.innerHTML = `
      <h3 class="subpage-section-title">${title}</h3>
      ${meta ? `<div class="subpage-section-meta">${meta}</div>` : ''}
      <div class="subpage-text">${content}</div>
    `;
    
    container.appendChild(section);
    return section;
  }
  
  addCard(title, content) {
    const container = document.querySelector('.subpage-content');
    const card = document.createElement('div');
    card.className = 'subpage-card subpage-fade-in';
    
    card.innerHTML = `
      <h4 class="subpage-card-title">${title}</h4>
      <div class="subpage-text">${content}</div>
    `;
    
    container.appendChild(card);
    return card;
  }
  
  // Metodo per aggiungere lista
  addList(items, container = null) {
    const listContainer = container || document.querySelector('.subpage-content');
    const list = document.createElement('ul');
    list.className = 'subpage-list';
    
    items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = 'subpage-list-item';
      listItem.innerHTML = item;
      list.appendChild(listItem);
    });
    
    listContainer.appendChild(list);
    return list;
  }
  
  // Metodo per aggiornare il titolo della pagina
  updatePageTitle(title, subtitle = '') {
    document.title = `${title} - AIceberg Mind`;
    
    const titleElement = document.querySelector('.subpage-title');
    const subtitleElement = document.querySelector('.subpage-subtitle');
    
    if (titleElement) titleElement.textContent = title;
    if (subtitleElement && subtitle) subtitleElement.textContent = subtitle;
  }
}

// Utilità per la gestione del tema (eredita dal sito principale)
class SubpageThemeManager {
  static applyTheme() {
    // Assicura che le variabili CSS siano coerenti con il sito principale
    const root = document.documentElement;
    
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--text-primary', 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.75)');
    root.style.setProperty('--text-tertiary', 'rgba(255, 255, 255, 0.6)');
    root.style.setProperty('--border-light', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--accent-subtle', 'rgba(255, 255, 255, 0.1)');
  }
}

// Inizializzazione automatica
let subpageController;

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    subpageController = new SubpageController();
    SubpageThemeManager.applyTheme();
  });
} else {
  subpageController = new SubpageController();
  SubpageThemeManager.applyTheme();
}

// Esporta per uso globale
if (typeof window !== 'undefined') {
  window.SubpageController = SubpageController;
  window.SubpageThemeManager = SubpageThemeManager;
  window.subpageController = subpageController;
}

// Gestione errori globale per le sottopagine
window.addEventListener('error', (event) => {
  console.error('Subpage Error:', event.error);
});

// Gestione del resize della finestra
window.addEventListener('resize', () => {
  // Riapplica eventuali layout responsive
  if (subpageController && subpageController.isLoaded) {
    // Aggiorna layout se necessario
  }
});
