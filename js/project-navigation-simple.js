/* === PROJECT NAVIGATION FUNCTIONALITY - DEBUG VERSION === */

console.log('📜 Script project-navigation-simple.js caricato');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inizializzazione Project Navigation SIMPLE');
    
    // Debug: verifica tutti gli elementi
    console.log('🔍 Controllo elementi nel DOM...');
    
    const projectsGrid = document.querySelector('.projects-grid');
    console.log('projects-grid found:', !!projectsGrid, projectsGrid);
    
    const prevBtn = document.querySelector('.project-nav-prev');
    console.log('project-nav-prev found:', !!prevBtn, prevBtn);
    
    const nextBtn = document.querySelector('.project-nav-next');
    console.log('project-nav-next found:', !!nextBtn, nextBtn);
    
    const projectCards = document.querySelectorAll('.project-card');
    console.log('project-cards found:', projectCards.length, projectCards);
    
    const indicators = document.querySelectorAll('.indicator-dot');
    console.log('indicators found:', indicators.length, indicators);
    
    // Verifica che gli elementi esistano
    if (!projectsGrid) {
        console.error('❌ projects-grid non trovato');
        return;
    }
    
    if (!prevBtn) {
        console.error('❌ project-nav-prev non trovato');
        console.log('🔍 Tutti i pulsanti nell\'HTML:', document.querySelectorAll('button'));
        return;
    }
    
    if (!nextBtn) {
        console.error('❌ project-nav-next non trovato');
        return;
    }
    
    // Variabili di navigazione
    let currentIndex = 0;
    const cardWidth = 370; // larghezza card + gap (350 + 20)
    const maxIndex = Math.max(0, projectCards.length - 1);
    
    console.log(`🎯 Range navigazione: 0 - ${maxIndex}, cardWidth: ${cardWidth}px`);
    console.log(`📏 Larghezza totale contenuto: ${projectCards.length * cardWidth}px`);
    
    // Funzione di scroll migliorata
    function scrollToIndex(index) {
        console.log(`🔄 Scrolling to index: ${index}`);
        
        const scrollLeft = index * cardWidth;
        console.log(`📐 Scroll position: ${scrollLeft}px`);
        
        // Usa scrollLeft diretto invece di scrollTo per evitare conflitti
        projectsGrid.style.transform = `translateX(-${scrollLeft}px)`;
        projectsGrid.style.transition = 'transform 0.5s ease';
        
        // Alternative: usa anche scrollTo per sicurezza
        setTimeout(() => {
            projectsGrid.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }, 50);
        
        // Aggiorna indicatori se esistono
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Aggiorna pulsanti
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index >= maxIndex);
        
        // Stile visivo per pulsanti disabilitati
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
        
        console.log(`✅ Scroll completato. Prev: ${prevBtn.disabled ? 'disabled' : 'enabled'}, Next: ${nextBtn.disabled ? 'disabled' : 'enabled'}`);
    }
    
    // Event listener SEMPLICI con logging dettagliato
    console.log('🔧 Aggiungendo event listeners...');
    
    prevBtn.addEventListener('click', function(event) {
        console.log('🖱️ CLICK RILEVATO su Previous button!');
        console.log('Event details:', event);
        console.log('Current index:', currentIndex);
        
        event.preventDefault();
        event.stopPropagation();
        
        if (currentIndex > 0) {
            currentIndex--;
            console.log('⬅️ Moving to previous card, new index:', currentIndex);
            scrollToIndex(currentIndex);
        } else {
            console.log('⚠️ Already at first card');
        }
    });
    
    nextBtn.addEventListener('click', function(event) {
        console.log('🖱️ CLICK RILEVATO su Next button!');
        console.log('Event details:', event);
        console.log('Current index:', currentIndex);
        
        event.preventDefault();
        event.stopPropagation();
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            console.log('➡️ Moving to next card, new index:', currentIndex);
            scrollToIndex(currentIndex);
        } else {
            console.log('⚠️ Already at last card');
        }
    });
    
    // Test event listeners alternativi
    prevBtn.addEventListener('mousedown', function() {
        console.log('🔍 MOUSEDOWN su prev button');
    });
    
    nextBtn.addEventListener('mousedown', function() {
        console.log('🔍 MOUSEDOWN su next button');
    });
    
    prevBtn.addEventListener('mouseup', function() {
        console.log('🔍 MOUSEUP su prev button');
    });
    
    nextBtn.addEventListener('mouseup', function() {
        console.log('🔍 MOUSEUP su next button');
    });
    
    // Test se i pulsanti sono cliccabili
    console.log('🧪 Test cliccabilità pulsanti...');
    console.log('Prev button style:', window.getComputedStyle(prevBtn));
    console.log('Next button style:', window.getComputedStyle(nextBtn));
    console.log('Prev button pointer-events:', window.getComputedStyle(prevBtn).pointerEvents);
    console.log('Next button pointer-events:', window.getComputedStyle(nextBtn).pointerEvents);
    
    // Inizializzazione
    scrollToIndex(0);
    
    console.log('✅ Project Navigation SIMPLE inizializzato completamente');
    
    // Test periodico per vedere se funziona
    setTimeout(() => {
        console.log('🧪 Test automatico: tentativo di andare al prossimo...');
        if (currentIndex < maxIndex) {
            currentIndex++;
            scrollToIndex(currentIndex);
        }
    }, 3000);
});
