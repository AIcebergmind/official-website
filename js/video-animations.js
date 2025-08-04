/**
 * ========================================
 * VIDEO ANIMATIONS CONTROLLER
 * ========================================
 */

class VideoController {
  constructor() {
    this.video = null;
    this.videoContainer = null;
    this.toggleBtn = null;
    this.isPlaying = true;
    this.hasError = false;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupVideo());
    } else {
      this.setupVideo();
    }
  }
  
  setupVideo() {
    this.video = document.getElementById('heroVideo');
    this.videoContainer = document.querySelector('.video-container');
    this.toggleBtn = document.getElementById('videoToggle');
    
    if (!this.video || !this.videoContainer || !this.toggleBtn) {
      console.warn('Video elements not found');
      return;
    }
    
    this.setupEventListeners();
    this.handleVideoLoad();
    this.setupMobileOptimizations();
    this.addVideoReloadMechanism();
  }
  
  setupEventListeners() {
    // Toggle play/pause
    this.toggleBtn.addEventListener('click', () => this.toggleVideo());
    
    // Handle keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.isVideoSectionVisible()) {
        e.preventDefault();
        this.toggleVideo();
      }
    });
    
    // Handle video load errors
    this.video.addEventListener('error', () => this.handleVideoError());
    
    // Handle successful load
    this.video.addEventListener('load', () => {
      console.log('Video loaded successfully');
      this.removeLoadingState();
    });
    
    // Handle intersection observer for performance
    this.setupIntersectionObserver();
  }
  
  toggleVideo() {
    try {
      const videoContainer = this.video.parentNode;
      const overlay = videoContainer.querySelector('.video-overlay');
      
      if (this.isPlaying) {
        // "Pause" video with visual effects
        this.video.style.opacity = '0.2';
        this.video.style.filter = 'blur(2px) grayscale(50%)';
        
        if (overlay) {
          overlay.style.background = 'rgba(0, 0, 0, 0.8)';
          overlay.style.backdropFilter = 'blur(5px)';
        }
        
        // Add pause indicator
        this.addPauseIndicator(videoContainer);
        
        this.isPlaying = false;
        this.toggleBtn.classList.add('video-paused');
        
        console.log('Video paused (visual effect)');
      } else {
        // "Resume" video
        this.video.style.opacity = '1';
        this.video.style.filter = 'none';
        
        if (overlay) {
          overlay.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.65) 30%, rgba(15, 23, 42, 0.8) 100%)';
          overlay.style.backdropFilter = 'blur(1px)';
        }
        
        // Remove pause indicator
        this.removePauseIndicator(videoContainer);
        
        this.isPlaying = true;
        this.toggleBtn.classList.remove('video-paused');
        
        console.log('Video resumed');
      }
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  }
  
  addPauseIndicator(container) {
    // Remove existing indicator
    const existing = container.querySelector('.pause-indicator');
    if (existing) existing.remove();
    
    // Create pause indicator
    const indicator = document.createElement('div');
    indicator.className = 'pause-indicator';
    indicator.innerHTML = `
      <div class="pause-icon">
        <div class="pause-bar"></div>
        <div class="pause-bar"></div>
      </div>
    `;
    container.appendChild(indicator);
  }
  
  removePauseIndicator(container) {
    const indicator = container.querySelector('.pause-indicator');
    if (indicator) indicator.remove();
  }
  
  handleVideoLoad() {
    // Add loading indicator
    this.addLoadingState();
    
    // Remove loading after a delay (since YouTube iframe doesn't have perfect load events)
    setTimeout(() => {
      this.removeLoadingState();
    }, 3000);
  }
  
  handleVideoError() {
    console.error('Video failed to load');
    this.hasError = true;
    
    // Add error class to section for fallback styling
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
      videoSection.classList.add('video-error');
    }
    
    // Hide video controls
    if (this.toggleBtn) {
      this.toggleBtn.style.display = 'none';
    }
    
    this.removeLoadingState();
  }
  
  addLoadingState() {
    const loadingEl = document.createElement('div');
    loadingEl.className = 'video-loading';
    loadingEl.innerHTML = 'Loading video...';
    
    this.videoContainer.appendChild(loadingEl);
  }
  
  removeLoadingState() {
    const loadingEl = document.querySelector('.video-loading');
    if (loadingEl) {
      loadingEl.remove();
    }
  }
  
  isVideoSectionVisible() {
    const videoSection = document.querySelector('.video-section');
    if (!videoSection) return false;
    
    const rect = videoSection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  
  setupIntersectionObserver() {
    const videoSection = document.querySelector('.video-section');
    if (!videoSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section is visible, ensure video is active
          this.ensureVideoActive();
        } else {
          // Section is not visible, could pause for performance
          this.handleVideoOutOfView();
        }
      });
    }, {
      threshold: 0.1
    });
    
    observer.observe(videoSection);
  }
  
  ensureVideoActive() {
    if (!this.hasError && this.video) {
      // Ensure video source is correct when section becomes visible
      const src = this.video.src;
      if (!src.includes('autoplay=1') && this.isPlaying) {
        this.video.src = src.replace('autoplay=0', 'autoplay=1');
      }
    }
  }
  
  handleVideoOutOfView() {
    // Optional: pause video when not in view for performance
    // Uncomment the line below if you want this behavior
    // this.pauseVideoForPerformance();
  }
  
  pauseVideoForPerformance() {
    if (this.video && this.isPlaying) {
      const currentSrc = this.video.src;
      const pausedSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
      this.video.src = pausedSrc;
    }
  }
  
  setupMobileOptimizations() {
    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
      // Show controls more prominently on mobile
      const controls = document.querySelector('.video-controls');
      if (controls) {
        controls.style.opacity = '0.8';
        
        // Auto-hide controls after interaction
        let hideTimeout;
        const showControls = () => {
          controls.style.opacity = '1';
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            controls.style.opacity = '0.8';
          }, 3000);
        };
        
        // Show controls on touch
        document.addEventListener('touchstart', showControls);
        this.toggleBtn.addEventListener('click', showControls);
      }
    }
  }
  
  // Public methods for external control
  play() {
    if (!this.isPlaying) {
      this.toggleVideo();
    }
  }
  
  pause() {
    if (this.isPlaying) {
      this.toggleVideo();
    }
  }
  
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      hasError: this.hasError,
      element: this.video
    };
  }
  
  addVideoReloadMechanism() {
    // Alternative method: completely remove and recreate iframe for better control
    this.originalVideoHTML = this.video.outerHTML;
  }
  
  forceVideoReload() {
    const container = this.video.parentNode;
    const newVideo = document.createElement('div');
    newVideo.innerHTML = this.originalVideoHTML;
    const newIframe = newVideo.firstChild;
    
    // Update src based on play state
    if (this.isPlaying) {
      newIframe.src = newIframe.src.replace('autoplay=0', 'autoplay=1');
    } else {
      newIframe.src = newIframe.src.replace('autoplay=1', 'autoplay=0');
    }
    
    container.removeChild(this.video);
    container.appendChild(newIframe);
    this.video = newIframe;
  }
}

// Initialize video controller
let videoController;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    videoController = new VideoController();
  });
} else {
  videoController = new VideoController();
}

// Export for use in other modules (if needed)
if (typeof window !== 'undefined') {
  window.VideoController = VideoController;
  window.videoController = videoController;
}
