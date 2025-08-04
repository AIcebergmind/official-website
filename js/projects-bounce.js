// ===== PROJECTS BOUNCE SYSTEM =====
// Sistema di slide continuo con rimbalzo dentro container

function initProjectsBounce() {
  console.log(' Inizializzazione Projects Bounce System...');
  
  const wrapper = document.querySelector('.projects-wrapper');
  const row1 = document.querySelector('.projects-row-1');
  const row2 = document.querySelector('.projects-row-2');
  
  if (!wrapper || !row1 || !row2) {
    console.log('⚠️ Elementi projects non trovati');
    return;
  }
  
  function calculateBounceDistance() {
    const wrapperWidth = wrapper.offsetWidth;
    const wrapperPadding = 48; // 1.5rem * 2 = 48px di padding totale
    const availableWidth = wrapperWidth - wrapperPadding;
    
    const row1Width = row1.scrollWidth;
    const row2Width = row2.scrollWidth;
    
    console.log('📏 Wrapper width:', wrapperWidth, '| Available:', availableWidth);
    console.log('📏 Row1 width:', row1Width);
    console.log('📏 Row2 width:', row2Width);
    
    // Calcola quanto può spostarsi a sinistra senza che il bordo destro esca
    // Distance = larghezza_row - larghezza_disponibile (ma mai negativa)
    let moveDistance1, moveDistance2;
    
    if (row1Width > availableWidth) {
      // Se la row è più larga, può muoversi della differenza
      moveDistance1 = row1Width - availableWidth;
    } else {
      // Se la row è più piccola, può muoversi poco
      moveDistance1 = availableWidth - row1Width;
    }
    
    if (row2Width > availableWidth) {
      moveDistance2 = row2Width - availableWidth;
    } else {
      moveDistance2 = availableWidth - row2Width;
    }
    
    // Assicuriamoci che le distanze siano positive e ragionevoli
    moveDistance1 = Math.max(50, Math.min(moveDistance1, 300)); // Min 50px, Max 300px
    moveDistance2 = Math.max(50, Math.min(moveDistance2, 300));
    
    console.log('✅ Final distances - Row1:', moveDistance1, '| Row2:', moveDistance2);
    
    // Aggiorna CSS custom properties per animazioni dinamiche
    document.documentElement.style.setProperty('--bounce-distance-1', `${moveDistance1}px`);
    document.documentElement.style.setProperty('--bounce-distance-2', `${moveDistance2}px`);
    
    return { moveDistance1, moveDistance2 };
  }
  
  // Calcola inizialmente
  calculateBounceDistance();
  
  // Ricalcola su resize
  window.addEventListener('resize', () => {
    console.log('📱 Resize - Ricalcolo distanze bounce');
    calculateBounceDistance();
  });
  
  // Pausa su hover
  [row1, row2].forEach((row, index) => {
    row.addEventListener('mouseenter', () => {
      row.style.animationPlayState = 'paused';
      console.log(`⏸️ Row ${index + 1} in pausa`);
    });
    
    row.addEventListener('mouseleave', () => {
      row.style.animationPlayState = 'running';
      console.log(`▶️ Row ${index + 1} ripresa`);
    });
  });
  
  console.log('✅ Projects Bounce System configurato');
}

// Inizializza quando DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  // Piccolo delay per assicurarsi che CSS sia caricato
  setTimeout(initProjectsBounce, 100);
});

// Anche su load per sicurezza
window.addEventListener('load', () => {
  setTimeout(initProjectsBounce, 200);
});
