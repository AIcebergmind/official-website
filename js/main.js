// === MAIN.JS - Modularized JavaScript ===
// Version: 2025-07-31 - Simplified

class AicebergMind {
  constructor() {
    this.isInitialized = false;
    this.modules = {};
    this.config = {
      animations: true,
      performance: 'auto', // auto, high, low
      colorCycle: false
    };
  }

  async init() {
    if (this.isInitialized) return;
    
    console.log('🚀 AicebergMind starting initialization...');
    
    try {
      // Carica solo i moduli effettivamente esistenti
      await this.loadEffectsModules();
      
      this.isInitialized = true;
      console.log('🚀 AicebergMind initialized successfully');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
    }
  }

  async loadEffectsModules() {
    try {
      console.log('✨ Loading modules...');
      
      // Load iceberg and neural network modules only
      const { IcebergModule } = await import('./modules/iceberg.js');
      const { createIcebergEffects } = await import('./modules/iceberg-effects.js');
      const { NeuralNetwork } = await import('./modules/neural-network.js');

      this.modules.iceberg = new IcebergModule();
      this.modules.icebergEffects = createIcebergEffects(this.modules.iceberg, {
        enabled: true,
        surfaces: {
          enabled: true,
          opacity: 0.4
        }
      });
      this.modules.neuralNetwork = new NeuralNetwork();

      // Initialize video integration
      this.setupVideoIntegration();

      window.iceberg = this.modules.iceberg;
      window.icebergEffects = this.modules.icebergEffects;
      window.neuralNetwork = this.modules.neuralNetwork;

      console.log('✅ All modules loaded successfully');
    } catch (error) {
      console.error('❌ Error loading modules:', error);
      console.error('Error details:', error.message);
    }
  }

  // Video integration setup
  setupVideoIntegration() {
    // Wait for video controller to be available
    const waitForVideoController = () => {
      if (window.videoController) {
        this.modules.video = window.videoController;
        console.log('🎥 Video controller integrated');
        
        // Setup video-related event handlers
        this.setupVideoEvents();
      } else {
        setTimeout(waitForVideoController, 100);
      }
    };
    
    waitForVideoController();
  }

  setupVideoEvents() {
    // Pause video when user scrolls away from subhero
    let videoSection = document.querySelector('#subhero');
    if (!videoSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (this.modules.video) {
          if (entry.isIntersecting) {
            // Section visible - video can play
            this.modules.video.ensureVideoActive();
          } else {
            // Section not visible - consider pausing for performance
            // Only pause if we're far from the section
            const rect = entry.boundingClientRect;
            if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) {
              this.modules.video.pauseVideoForPerformance();
            }
          }
        }
      });
    }, {
      threshold: 0,
      rootMargin: '100px'
    });

    observer.observe(videoSection);
  }

  // Configuration updates
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    
    // Notify modules of config change
    Object.values(this.modules).forEach(module => {
      if (module.updateConfig) {
        module.updateConfig(this.config);
      }
    });
  }

  // Event system for modules communication
  emit(eventName, data) {
    Object.values(this.modules).forEach(module => {
      if (module.handleEvent) {
        module.handleEvent(eventName, data);
      }
    });
  }

  cleanup() {
    Object.values(this.modules).forEach(module => {
      if (module.cleanup) module.cleanup();
    });
    
    // Clear event listeners
    window.removeEventListener('beforeunload', this.cleanup.bind(this));
  }
}

// Inizializzazione globale
window.AicebergMind = new AicebergMind();

// Auto-start
document.addEventListener('DOMContentLoaded', () => {
  window.AicebergMind.init();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  window.AicebergMind.cleanup();
});

// Error handling
window.addEventListener('error', (event) => {
  console.error('🚨 Global error:', event.error);
  
  // Optional: Send error to analytics
  if (window.AicebergMind.modules.analytics) {
    window.AicebergMind.modules.analytics.trackError(event.error);
  }
});

// Export for potential use in other modules
export { AicebergMind };
