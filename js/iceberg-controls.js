// Iceberg Controls and Configuration
let scrollScale = 1;
let bgTransitionProgress = 1;
let numPoints = 15;
let lineDistance = 500;
let points = [];

const canvas = document.getElementById("iceberg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generatePoints() {
  points = [];
  const radius = Math.min(canvas.width, canvas.height) / 4;
  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints;
    const x = Math.cos(angle) * radius * (0.5 + Math.random());
    const y = Math.sin(angle) * radius * (0.5 + Math.random());
    points.push({ x, y });
  }
}

function initPage() {
  resizeCanvas();
  generatePoints();

  document.getElementById("nodesRange").addEventListener("input", (e) => {
    numPoints = parseInt(e.target.value);
    document.getElementById("nodesValue").textContent = numPoints;
    generatePoints();
  });

  document.getElementById("distanceRange").addEventListener("input", (e) => {
    lineDistance = parseInt(e.target.value);
    document.getElementById("distanceValue").textContent = lineDistance;
  });

  document.getElementById("startBtn").addEventListener("click", () => {
    const preloader = document.getElementById("preloader");
    const penguinCanvas = document.getElementById("penguin-canvas");
    
    // Fix timing issue
    setTimeout(() => {
      preloader.style.opacity = "0";
      penguinCanvas.style.opacity = "1";
      
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 100);
  });

  // === CONTROLLO MODALITÀ COLORE (SYNAPSE) ===
  // Supporta sia il pulsante desktop che breadcrumb
  const colorToggleBtn = document.getElementById("colorToggle") || document.getElementById("breadcrumbColorToggle");
  
  // Variabile globale condivisa per evitare conflitti
  if (typeof window.colorCycleActive === 'undefined') {
    window.colorCycleActive = false;
  }
  
  if (colorToggleBtn) {
    const texts = {
      active: "FLOW ",
      frozen: "FROZEN "
    };
    
    // Gestione tooltip su mobile con touch
    let tooltipTimeout;
    
    // Touch devices: mostra tooltip temporaneamente
    colorToggleBtn.addEventListener("touchstart", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const currentTooltip = colorToggleBtn.querySelector('.tooltip');
        if (currentTooltip) {
          currentTooltip.style.opacity = '1';
          currentTooltip.style.visibility = 'visible';
          
          clearTimeout(tooltipTimeout);
          tooltipTimeout = setTimeout(() => {
            currentTooltip.style.opacity = '0';
            currentTooltip.style.visibility = 'hidden';
          }, 3000);
        }
      }
    });
    
    // Gestione hover su desktop
    colorToggleBtn.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        const currentTooltip = colorToggleBtn.querySelector('.tooltip');
        if (currentTooltip) {
          currentTooltip.style.opacity = '1';
          currentTooltip.style.visibility = 'visible';
        }
      }
    });
    
    colorToggleBtn.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        const currentTooltip = colorToggleBtn.querySelector('.tooltip');
        if (currentTooltip) {
          currentTooltip.style.opacity = '0';
          currentTooltip.style.visibility = 'hidden';
        }
        // Rimuovi anche il tooltip se in frozen state
        if (colorToggleBtn.classList.contains("frozen")) {
          colorToggleBtn.innerHTML = `${texts.frozen}${currentTooltip ? currentTooltip.outerHTML : ''}`;
        }
      }
    });
    
    // Gestione click
    colorToggleBtn.addEventListener("click", () => {
      window.colorCycleActive = !window.colorCycleActive;
      
      if (window.colorCycleActive) {
        colorToggleBtn.innerHTML = `${texts.active}<div class="tooltip">Controls the iceberg's dynamic color palette.<br><strong>SYNAPSE</strong> → <strong>FOCUS</strong> → <strong>LET IT FLOW</strong></div>`;
        colorToggleBtn.classList.remove("frozen");
        startColorCycle();
        startProjectAnimations(); // Attiva anche le nuove animazioni
      } else {
        colorToggleBtn.innerHTML = `${texts.frozen}<div class="tooltip">Color cycle paused.<br>Click to resume the flow.</div>`;
        colorToggleBtn.classList.add("frozen");
        stopColorCycle();
        stopProjectAnimations(); // Disattiva anche le nuove animazioni
      }
    });
  }

  // === CONTROLLO MODALITÀ CLARITY ===
  const clarityToggleBtn = document.getElementById("clarityToggle") || document.getElementById("breadcrumbClarityToggle");
  let clarityModeActive = false;
  
  console.log('🔧 CLARITY Debug:', {
    found: !!clarityToggleBtn,
    id: clarityToggleBtn?.id,
    element: clarityToggleBtn
  });
  
  if (clarityToggleBtn) {
    // Gestione tooltip su mobile con touch
    let clarityTooltipTimeout;
    
    // Touch devices: mostra tooltip temporaneamente
    clarityToggleBtn.addEventListener("touchstart", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const tooltip = clarityToggleBtn.querySelector('.tooltip');
        if (tooltip) {
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
          
          clearTimeout(clarityTooltipTimeout);
          clarityTooltipTimeout = setTimeout(() => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
          }, 3000);
        }
      }
    });
    
    // Gestione click per attivare/disattivare modalità high contrast
    clarityToggleBtn.addEventListener("click", () => {
      clarityModeActive = !clarityModeActive;
      
      if (clarityModeActive) {
        // Attiva modalità high contrast
        document.body.classList.add('high-contrast');
        clarityToggleBtn.classList.add('active');
        
        // Preserva il tooltip esistente, cambia solo il testo
        const existingTooltip = clarityToggleBtn.querySelector('.tooltip');
        if (existingTooltip) {
          clarityToggleBtn.innerHTML = 'CLARITY ✓';
          clarityToggleBtn.appendChild(existingTooltip);
          existingTooltip.innerHTML = 'High contrast mode active.<br>Click to return to normal view.';
        } else {
          clarityToggleBtn.innerHTML = 'CLARITY ✓<div class="tooltip">High contrast mode active.<br>Click to return to normal view.</div>';
        }
        
        // Salva preferenza
        localStorage.setItem('clarityMode', 'true');
        console.log('✅ CLARITY attivata - Modalità alto contrasto');
      } else {
        // Disattiva modalità high contrast
        document.body.classList.remove('high-contrast');
        clarityToggleBtn.classList.remove('active');
        
        // Ripristina il testo originale
        const existingTooltip = clarityToggleBtn.querySelector('.tooltip');
        if (existingTooltip) {
          clarityToggleBtn.innerHTML = 'CLARITY';
          clarityToggleBtn.appendChild(existingTooltip);
          existingTooltip.innerHTML = 'High contrast mode for better readability.<br>Black background with white text.';
        } else {
          clarityToggleBtn.innerHTML = 'CLARITY<div class="tooltip">High contrast mode for better readability.<br>Black background with white text.</div>';
        }
        
        // Rimuovi preferenza
        localStorage.removeItem('clarityMode');
        console.log('❌ CLARITY disattivata - Modalità normale');
      }
    });
    
    // Carica preferenza salvata
    if (localStorage.getItem('clarityMode') === 'true') {
      clarityToggleBtn.click();
    }
  }

    // Slider DEPTH (complessità iceberg)
    const depthSlider = document.getElementById("depthSlider");
    const depthValue = document.getElementById("depthValue");
    if (depthSlider && depthValue) {
      depthSlider.addEventListener("input", (e) => {
        const value = parseInt(e.target.value);
        depthValue.textContent = value;
        numPoints = value;
        generatePoints();
      });
    }

    // Slider NEURAL (background particles)
    const neuralSlider = document.getElementById("neuralSlider");
    const neuralValue = document.getElementById("neuralValue");
    if (neuralSlider && neuralValue) {
      neuralSlider.addEventListener("input", (e) => {
        const value = parseInt(e.target.value);
        neuralValue.textContent = value ? "On" : "Off";
        
        const particlesCanvas = document.getElementById("particles-background");
        if (particlesCanvas) {
          particlesCanvas.style.display = value ? "block" : "none";
        }
      });
    }

    // Slider FLOW (velocità iceberg)
    const flowSlider = document.getElementById("flowSlider");
    const flowValue = document.getElementById("flowValue");
    if (flowSlider && flowValue) {
      flowSlider.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value);
        flowValue.textContent = value;
        scrollScale = value;
      });
    }

    // Slider SYNC (connessioni iceberg)
    const syncSlider = document.getElementById("syncSlider");
    const syncValue = document.getElementById("syncValue");
    if (syncSlider && syncValue) {
      syncSlider.addEventListener("input", (e) => {
        const value = parseInt(e.target.value);
        syncValue.textContent = value;
        lineDistance = value;
      });
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
      generatePoints();
    });

    function drawIceberg() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Gradiente radiale rimosso per trasparenza completa
      // const gradient = ctx.createRadialGradient(
      //   centerX,
      //   centerY,
      //   0,
      //   centerX,
      //   centerY,
      //   Math.max(canvas.width, canvas.height) / 2
      // );

      // const currentColor = "dark";
      // const startColor = currentColor === "dark" ? "rgba(9, 17, 32, 0.8)" : "rgba(255, 255, 255, 0.1)";
      // const endColor = currentColor === "dark" ? "rgba(9, 17, 32, 0)" : "rgba(255, 255, 255, 0)";

      // gradient.addColorStop(0, startColor);
      // gradient.addColorStop(1, endColor);

      // ctx.fillStyle = gradient;
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineDistance) {
            const opacity = 1 - distance / lineDistance;
            ctx.strokeStyle = currentColor === "dark" 
              ? `rgba(100, 150, 255, ${opacity * 0.3})` 
              : `rgba(0, 100, 200, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX + points[i].x * scrollScale, centerY + points[i].y * scrollScale);
            ctx.lineTo(centerX + points[j].x * scrollScale, centerY + points[j].y * scrollScale);
            ctx.stroke();
          }
        }
      }

      for (const point of points) {
        ctx.fillStyle = currentColor === "dark" 
          ? "rgba(150, 200, 255, 0.8)" 
          : "rgba(0, 150, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(centerX + point.x * scrollScale, centerY + point.y * scrollScale, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(drawIceberg);
    }

    drawIceberg();

  // Gestione controlli della console
  if (typeof window.setupConsoleControls === 'function') {
    const buttons = ["P", "R", "O", "J", "E", "C", "T", "I", "O", "N"];
    buttons.forEach((button, index) => {
      const btn = document.getElementById(`btn${button}`);
      if (btn) {
        btn.addEventListener("click", () => {
          console.log(`Button ${button} clicked`);
          
          switch(button) {
            case "P":
              if (typeof toggleProjectView === 'function') {
                toggleProjectView();
              }
              break;
            case "R":
              if (typeof resetAllAnimations === 'function') {
                resetAllAnimations();
              }
              break;
            case "O":
              if (typeof openProjectOverlay === 'function') {
                openProjectOverlay();
              }
              break;
            case "J":
              if (typeof jumpToProject === 'function') {
                jumpToProject(index);
              }
              break;
            case "E":
              if (typeof enableExperimentMode === 'function') {
                enableExperimentMode();
              }
              break;
            case "C":
              if (typeof cycleColorTheme === 'function') {
                cycleColorTheme();
              }
              break;
            case "T":
              if (typeof toggleTextMode === 'function') {
                toggleTextMode();
              }
              break;
            case "I":
              if (typeof inspectProject === 'function') {
                inspectProject();
              }
              break;
            default:
              console.log(`${button} button clicked`);
          }
        });
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
