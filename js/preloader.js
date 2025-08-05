/**
 * AIceberg Mind Preloader
 * Cinematic loading experience with algorithm visualization
 */

class AicebergPreloader {
  constructor() {
    this.currentPhase = 0;
    this.countdown = 10;
    this.isComplete = false;
    
    // DOM Elements
    this.container = document.getElementById('preloaderContainer');
    this.canvas = document.getElementById('preloaderCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Phase Elements
    this.countdownPhase = document.getElementById('countdownPhase');
    this.algorithmPhase = document.getElementById('algorithmPhase');
    this.logoRevealPhase = document.getElementById('logoRevealPhase');
    this.transitionPhase = document.getElementById('transitionPhase');
    
    // Specific Elements
    this.countdownNumber = document.getElementById('countdownNumber');
    this.iceParticles = document.getElementById('iceParticles');
    this.codeLines = document.getElementById('codeLines');
    this.algorithmProgress = document.getElementById('algorithmProgress');
    this.algorithmStatus = document.getElementById('algorithmStatus');
    this.logoWireframe = document.getElementById('logoWireframe');
    this.logoSvg = document.getElementById('logoSvg');
    this.enterSiteBtn = document.getElementById('enterSiteBtn');
    this.skipBtn = document.getElementById('skipBtn');
    
    // Animation state
    this.particles = [];
    this.codeLineIndex = 0;
    
    this.init();
  }
  
  init() {
    console.log('🚀 AIceberg Preloader starting...');
    this.setupCanvas();
    this.createParticles();
    this.bindEvents();
    this.startSequence();
  }
  
  setupCanvas() {
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
  }
  
  createParticles() {
    // Create ice crystal particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        life: Math.random() * 100 + 50
      });
    }
  }
  
  animateParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.life--;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Create glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, `rgba(94, 228, 195, ${particle.opacity})`);
      gradient.addColorStop(1, 'rgba(94, 228, 195, 0)');
      
      // Draw particle
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Reset particle when life ends
      if (particle.life <= 0) {
        particle.x = Math.random() * this.canvas.width;
        particle.y = -10;
        particle.life = Math.random() * 100 + 50;
      }
    });
    
    requestAnimationFrame(() => this.animateParticles());
  }
  
  bindEvents() {
    // Skip button
    this.skipBtn.addEventListener('click', () => {
      this.skipToSite();
    });
    
    // Enter site button (final phase)
    this.enterSiteBtn.addEventListener('click', () => {
      this.completePreloader();
    });
    
    // Skip on space or enter
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        this.skipToSite();
      }
    });
  }
  
  startSequence() {
    this.animateParticles();
    
    // Start with countdown phase
    gsap.set([this.algorithmPhase, this.logoRevealPhase, this.transitionPhase], {
      display: 'none',
      opacity: 0
    });
    
    this.runCountdownPhase();
  }
  
  runCountdownPhase() {
    console.log('🚀 Starting countdown phase');
    
    const tl = gsap.timeline();
    
    // Animate countdown numbers
    const countdownInterval = setInterval(() => {
      // Sunset effect - number sinks below imaginary horizon line
      gsap.to(this.countdownNumber, {
        y: 120, // Sinks below horizon
        opacity: 0,
        scaleY: 0.7, // Compressed vertically as it disappears
        scaleX: 1.1, // Slightly wider like perspective
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          // Reset position and show new number
          this.countdown--;
          
          if (this.countdown >= 0) {
            this.countdownNumber.textContent = this.countdown;
            
            // Reset position above horizon for sunrise effect
            gsap.set(this.countdownNumber, {
              y: -80,
              opacity: 0,
              scaleY: 0.7,
              scaleX: 1.1
            });
            
            // Sunrise effect - new number emerges from horizon
            gsap.to(this.countdownNumber, {
              y: 0,
              opacity: 1,
              scaleY: 1,
              scaleX: 1,
              duration: 0.9,
              ease: "power2.out"
            });
          }
        }
      });
      
      // Create ice particles burst
      this.createIceParticlesBurst();
      
      if (this.countdown < 0) {
        clearInterval(countdownInterval);
        setTimeout(() => this.transitionToAlgorithm(), 800);
      }
    }, 1200); // Slightly longer for dramatic effect
  }
  
  createIceParticlesBurst() {
    // Create temporary ice particles around countdown
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'ice-particle';
      particle.style.left = `${50 + (Math.random() - 0.5) * 20}%`;
      particle.style.top = `${50 + (Math.random() - 0.5) * 20}%`;
      this.iceParticles.appendChild(particle);
      
      // Animate particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }
  
  transitionToAlgorithm() {
    console.log('🔄 Transitioning to algorithm phase');
    
    const tl = gsap.timeline();
    
    // Fade out countdown
    tl.to(this.countdownPhase, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.in"
    })
    .set(this.countdownPhase, { display: 'none' })
    .set(this.algorithmPhase, { display: 'flex' })
    .to(this.algorithmPhase, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => this.runAlgorithmPhase()
    });
  }
  
  runAlgorithmPhase() {
    console.log('💻 Starting algorithm phase');
    
    this.animateCodeLines();
    this.animateProgress();
    // Start logo formation animation
    this.animateLogoFormation();
    
    // Transition to logo after 4 seconds
    setTimeout(() => {
      this.transitionToLogo();
    }, 4000);
  }
  
  animateCodeLines() {
    const lines = this.codeLines.querySelectorAll('.code-line');
    const tl = gsap.timeline();
    
    lines.forEach((line, index) => {
      tl.to(line, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      }, index * 0.3);
    });
  }
  
  animateProgress() {
    const statusMessages = [
      "Mapping the landscape of thought...",
      "Exploring beneath the surface...",
      "Crafting pathways to discovery...",
      "Weaving connections unseen...",
      "Nurturing depths of wonder...",
      "The iceberg awakens..."
    ];
    
    let messageIndex = 0;
    
    // Animate progress bar
    gsap.to(this.algorithmProgress, {
      width: '100%',
      duration: 3.5,
      ease: "power2.out"
    });
    
    // Update status messages
    const statusInterval = setInterval(() => {
      if (messageIndex < statusMessages.length) {
        gsap.to(this.algorithmStatus, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            this.algorithmStatus.textContent = statusMessages[messageIndex];
            gsap.to(this.algorithmStatus, {
              opacity: 1,
              duration: 0.2
            });
          }
        });
        messageIndex++;
      } else {
        clearInterval(statusInterval);
      }
    }, 600);
  }
  
  animateLogoFormation() {
    console.log('🎨 Starting logo formation animation');
    
    // Aspettiamo che l'SVG sia caricato completamente
    setTimeout(() => {
      // Cerchiamo i gruppi SVG dentro il logo wireframe
      const logoSvg = this.logoWireframe;
      console.log('🔍 Logo SVG element:', logoSvg);
      
      if (logoSvg) {
        // Cerchiamo i gruppi g con le classi specifiche
        const whiteWireframe = logoSvg.querySelector('g.cls-white-wireframe');
        const icebergWireframe = logoSvg.querySelector('g.cls-iceberg-wireframe');
        const whiteDetail = logoSvg.querySelector('g.cls-white-detail');
        
        console.log('� SVG Groups found:', {
          whiteWireframe: !!whiteWireframe,
          icebergWireframe: !!icebergWireframe,
          whiteDetail: !!whiteDetail,
          logoSvg: logoSvg.tagName
        });
        
        if (whiteWireframe || icebergWireframe || whiteDetail) {
          console.log('✅ Found at least one SVG group, starting animations');
          
          // Set initial state for found elements
          if (whiteWireframe) {
            gsap.set(whiteWireframe, { opacity: 0, scale: 0.3, transformOrigin: "center" });
          }
          if (icebergWireframe) {
            gsap.set(icebergWireframe, { opacity: 0, scale: 0.3, transformOrigin: "center" });
          }
          if (whiteDetail) {
            gsap.set(whiteDetail, { opacity: 0, scale: 0.3, transformOrigin: "center" });
          }
          
          // Animation sequence
          let delay = 0;
          
          if (whiteWireframe) {
            gsap.to(whiteWireframe, {
              opacity: 1,
              scale: 1,
              duration: 1.8,
              ease: "back.out(1.7)",
              delay: delay
            });
            delay += 1.5;
            console.log('🎬 Animating white wireframe');
          }
          
          if (icebergWireframe) {
            gsap.to(icebergWireframe, {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              delay: delay
            });
            delay += 1.2;
            console.log('🎬 Animating iceberg wireframe');
          }
          
          if (whiteDetail) {
            gsap.to(whiteDetail, {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              delay: delay
            });
            console.log('🎬 Animating white details');
          }
          
        } else {
          console.log('⚠️ No SVG groups found, animating whole logo');
          // Fallback: anima tutto il logo insieme
          gsap.set(logoSvg, { opacity: 0, scale: 0.7 });
          gsap.to(logoSvg, {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "back.out(1.7)",
            delay: 1
          });
        }
      } else {
        console.log('❌ Logo SVG not found');
      }
      
      // Add floating animation to whole logo after construction
      setTimeout(() => {
        if (this.logoWireframe) {
          gsap.to(this.logoWireframe, {
            y: -10,
            rotation: 1,
            duration: 4,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      }, 6000);
      
    }, 1000); // Increased timeout to ensure SVG is loaded
  }
  
  transitionToLogo() {
    console.log('🎨 Transitioning to logo phase');
    
    const tl = gsap.timeline();
    
    // Fade out algorithm
    tl.to(this.algorithmPhase, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.in"
    })
    .set(this.algorithmPhase, { display: 'none' })
    .set(this.logoRevealPhase, { display: 'flex' })
    .to(this.logoRevealPhase, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => this.runLogoPhase()
    });
  }
  
  runLogoPhase() {
    console.log('🎭 Starting logo reveal phase');
    
    // Load logo dynamically
    this.loadLogo();
    
    const tl = gsap.timeline();
    
    // Animate logo container
    tl.to('.logo-container', {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
    // Animate brand name letters
    .to('.ai-part', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6")
    .to('.ceberg-part', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to('.mind-part', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    // Animate tagline
    .to('.brand-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");
    
    // Transition to final phase after 3 seconds
    setTimeout(() => {
      this.transitionToFinal();
    }, 3000);
  }
  
  loadLogo() {
    console.log('🎨 Animating logo...');
    
    // Set initial state
    gsap.set(this.logoSvg, { 
      opacity: 0, 
      scale: 0.8,
      rotation: -10 
    });
    
    // Animate logo appearance
    gsap.to(this.logoSvg, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    });
    
    console.log('🎯 Logo animation started');
  }
  
  transitionToFinal() {
    console.log('✨ Transitioning to final phase');
    
    const tl = gsap.timeline();
    
    // Fade out logo
    tl.to(this.logoRevealPhase, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.in"
    })
    .set(this.logoRevealPhase, { display: 'none' })
    .set(this.transitionPhase, { display: 'flex' })
    .to(this.transitionPhase, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => this.runFinalPhase()
    });
  }
  
  runFinalPhase() {
    console.log('🎯 Starting final phase');
    
    const tl = gsap.timeline();
    
    // Animate final elements
    tl.to('.ready-message', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to('.enter-site-btn', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");
    
    this.isComplete = true;
  }
  
  skipToSite() {
    if (this.isComplete) return;
    
    console.log('⏭️ Skipping directly to main site');
    
    // Kill all animations
    gsap.globalTimeline.clear();
    
    // Immediate redirect to main site
    window.location.href = 'index.html';
  }
  
  completePreloader() {
    console.log('🎉 Preloader complete - redirecting to main site');
    
    // Add completion effect
    gsap.to(this.container, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Redirect to main site
        window.location.href = 'index.html';
      }
    });
  }
}

// Initialize preloader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing AIceberg Mind Preloader');
  new AicebergPreloader();
});

// Add some debug info
console.log(`
  🧊 AIceberg Mind Preloader
  ========================
  Press SPACE or ENTER to skip
  Click "Enter AIceberg Mind" when ready
  
  Phases:
  1. Countdown (10-1)
  2. Algorithm Visualization  
  3. Logo Reveal
  4. Final Transition
`);
