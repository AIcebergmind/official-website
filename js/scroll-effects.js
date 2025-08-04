// Scroll Effects and GSAP Animations

// Funzioni per avviare/fermare animazioni project
function startProjectAnimations() {
  // Logica per avviare animazioni dei progetti
  console.log('🎨 Project animations started');
}

function stopProjectAnimations() {
  // Logica per fermare animazioni dei progetti
  console.log('🎨 Project animations stopped');
}

// Mouse tracking per effetti interattivi
let angleOffset = 0, mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", e => {
  const canvas = document.getElementById('iceberg');
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  mouseX = ((e.clientX - rect.left) / canvas.width - 0.5) * 2;
  mouseY = ((e.clientY - rect.top) / canvas.height - 0.5) * 2;
});

// Gestione resize per canvas
window.addEventListener("resize", () => {
  if (typeof resizeCanvas === 'function') {
    resizeCanvas();
  }
  if (typeof generatePoints === 'function') {
    generatePoints();
  }
});

// Export functions to global scope
window.startProjectAnimations = startProjectAnimations;
window.stopProjectAnimations = stopProjectAnimations;
