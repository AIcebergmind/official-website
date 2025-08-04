// === PENGUIN MODULE - Three.js 3D Penguin ===

export class PenguinModule {
  constructor(config = {}) {
    this.config = {
      containerId: 'penguin-container',
      modelPath: null, // We'll create programmatic penguin if no model
      enableAnimation: true,
      enableInteraction: true,
      autoRotate: true,
      enableMobile: false,
      ...config
    };
    
    // Three.js core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.penguin = null;
    this.mixer = null;
    
    // Animation
    this.clock = new THREE.Clock();
    this.isAnimating = false;
    this.animationId = null;
    
    // Interaction
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.isMouseDown = false;
    this.previousMousePosition = new THREE.Vector2();
    
    // Performance
    this.lastFrameTime = 0;
    this.frameSkip = 0;
    this.maxFPS = 60;
    
    // Events (for cleanup)
    this.eventHandlers = {
      resize: null,
      mouseMove: null,
      mouseDown: null,
      mouseUp: null,
      click: null
    };
    
    this.init();
  }

  init() {
    // Check if mobile and disabled
    if (this.isMobileDevice() && !this.config.enableMobile) {
      console.log('🐧 PenguinModule: Disabled on mobile for performance');
      return;
    }
    
    this.createContainer();
    this.setupScene();
    this.createPenguin();
    this.setupLighting();
    this.setupCamera();
    this.setupRenderer();
    this.bindEvents();
    this.startAnimation();
    
    console.log('🐧 PenguinModule initialized');
  }

  createContainer() {
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      // Create container if it doesn't exist
      this.container = document.createElement('div');
      this.container.id = this.config.containerId;
      this.container.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 200px;
        height: 200px;
        z-index: 50;
        border-radius: 20px;
        overflow: hidden;
        background: rgba(15, 43, 58, 0.8);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(94, 228, 195, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        cursor: pointer;
      `;
      document.body.appendChild(this.container);
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent background
    
    // Add fog for depth
    this.scene.fog = new THREE.Fog(0x0f2b3a, 5, 15);
  }

  createPenguin() {
    // Create a stylized geometric penguin
    const penguinGroup = new THREE.Group();
    
    // Materials
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 30,
      specular: 0x222222
    });
    
    const bellyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 50,
      specular: 0x444444
    });
    
    const beakMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff6600,
      shininess: 80,
      specular: 0xff8833
    });
    
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      shininess: 100
    });
    
    // Body (main ellipsoid)
    const bodyGeometry = new THREE.SphereGeometry(1, 16, 12);
    bodyGeometry.scale(0.8, 1.2, 0.7);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    penguinGroup.add(body);
    
    // Belly (front white part)
    const bellyGeometry = new THREE.SphereGeometry(0.6, 12, 10);
    bellyGeometry.scale(0.8, 1.1, 0.3);
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(0, 0, 0.4);
    penguinGroup.add(belly);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.6, 12, 10);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 1.4;
    penguinGroup.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 8, 6);
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.5, 0.4);
    penguinGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.5, 0.4);
    penguinGroup.add(rightEye);
    
    // Beak
    const beakGeometry = new THREE.ConeGeometry(0.1, 0.3, 6);
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 1.3, 0.5);
    beak.rotation.x = Math.PI / 2;
    penguinGroup.add(beak);
    
    // Wings
    const wingGeometry = new THREE.SphereGeometry(0.3, 8, 6);
    wingGeometry.scale(0.3, 0.8, 0.6);
    
    const leftWing = new THREE.Mesh(wingGeometry, bodyMaterial);
    leftWing.position.set(-0.7, 0.2, 0);
    leftWing.rotation.z = -0.3;
    penguinGroup.add(leftWing);
    
    const rightWing = new THREE.Mesh(wingGeometry, bodyMaterial);
    rightWing.position.set(0.7, 0.2, 0);
    rightWing.rotation.z = 0.3;
    penguinGroup.add(rightWing);
    
    // Feet
    const footGeometry = new THREE.SphereGeometry(0.2, 8, 6);
    footGeometry.scale(1.5, 0.3, 0.8);
    
    const leftFoot = new THREE.Mesh(footGeometry, beakMaterial);
    leftFoot.position.set(-0.3, -1.2, 0.3);
    penguinGroup.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, beakMaterial);
    rightFoot.position.set(0.3, -1.2, 0.3);
    penguinGroup.add(rightFoot);
    
    // Scale and position the whole penguin
    penguinGroup.scale.setScalar(0.8);
    penguinGroup.position.y = -0.5;
    
    // Store references for animation
    this.penguinParts = {
      group: penguinGroup,
      body,
      head,
      leftWing,
      rightWing,
      leftEye,
      rightEye
    };
    
    this.penguin = penguinGroup;
    this.scene.add(penguinGroup);
    
    // Add idle animation
    this.setupIdleAnimation();
  }

  setupIdleAnimation() {
    // Create breathing animation
    this.breathingTween = {
      time: 0,
      speed: 0.02
    };
    
    // Wing flap animation
    this.wingFlapTween = {
      time: 0,
      speed: 0.03,
      amplitude: 0.2
    };
    
    // Head bob animation
    this.headBobTween = {
      time: 0,
      speed: 0.025,
      amplitude: 0.1
    };
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x5ee4c3, 0.4);
    this.scene.add(ambientLight);
    
    // Directional light (main)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 3, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight);
    
    // Point light for accent
    const pointLight = new THREE.PointLight(0x3ac8f5, 0.6, 10);
    pointLight.position.set(-2, 2, 2);
    this.scene.add(pointLight);
    
    // Rim light
    const rimLight = new THREE.DirectionalLight(0x5ee4c3, 0.3);
    rimLight.position.set(-1, 1, -1);
    this.scene.add(rimLight);
  }

  setupCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 4);
    this.camera.lookAt(0, 0, 0);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    // Applica stili CSS al canvas del renderer
    const canvas = this.renderer.domElement;
    Object.assign(canvas.style, {
      width: '400px',
      height: 'auto',
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      zIndex: '300',
      cursor: 'grab'
    });
    
    // Aggiunge classe per il dragging
    canvas.id = 'penguin-canvas';
    
    this.container.appendChild(canvas);
  }

  bindEvents() {
    // Resize handler
    this.eventHandlers.resize = () => {
      this.handleResize();
    };
    window.addEventListener('resize', this.eventHandlers.resize);
    
    if (this.config.enableInteraction) {
      // Mouse events
      this.eventHandlers.mouseMove = (event) => {
        this.handleMouseMove(event);
      };
      
      this.eventHandlers.mouseDown = (event) => {
        this.handleMouseDown(event);
      };
      
      this.eventHandlers.mouseUp = (event) => {
        this.handleMouseUp(event);
      };
      
      this.eventHandlers.click = (event) => {
        this.handleClick(event);
      };
      
      this.container.addEventListener('mousemove', this.eventHandlers.mouseMove);
      this.container.addEventListener('mousedown', this.eventHandlers.mouseDown);
      this.container.addEventListener('mouseup', this.eventHandlers.mouseUp);
      this.container.addEventListener('click', this.eventHandlers.click);
      
      // Touch events for mobile
      this.container.addEventListener('touchstart', this.eventHandlers.mouseDown, { passive: false });
      this.container.addEventListener('touchend', this.eventHandlers.mouseUp);
      this.container.addEventListener('touchmove', this.eventHandlers.mouseMove, { passive: false });
    }
  }

  handleResize() {
    if (!this.camera || !this.renderer) return;
    
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  handleMouseMove(event) {
    if (!this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Make penguin look at mouse
    if (this.penguin && this.penguinParts.head) {
      const lookX = this.mouse.x * 0.3;
      const lookY = this.mouse.y * 0.2;
      
      this.penguinParts.head.rotation.y = lookX;
      this.penguinParts.head.rotation.x = lookY;
      
      // Eyes follow mouse
      this.penguinParts.leftEye.rotation.y = lookX * 0.5;
      this.penguinParts.rightEye.rotation.y = lookX * 0.5;
    }
  }

  handleMouseDown(event) {
    this.isMouseDown = true;
    this.previousMousePosition.set(event.clientX, event.clientY);
    
    // Add excited animation
    this.triggerExcitedAnimation();
  }

  handleMouseUp(event) {
    this.isMouseDown = false;
  }

  handleClick(event) {
    // Wave animation on click
    this.triggerWaveAnimation();
    
    // Emit click event
    if (window.AicebergMind) {
      window.AicebergMind.emit('penguinClick', {
        position: this.mouse,
        timestamp: Date.now()
      });
    }
  }

  triggerWaveAnimation() {
    if (!this.penguinParts.leftWing || !this.penguinParts.rightWing) return;
    
    // Animate wings waving
    const duration = 1000;
    const startTime = Date.now();
    
    const animateWave = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const wave = Math.sin(progress * Math.PI * 4) * 0.5;
      
      this.penguinParts.leftWing.rotation.z = -0.3 + wave;
      this.penguinParts.rightWing.rotation.z = 0.3 - wave;
      
      if (progress < 1) {
        requestAnimationFrame(animateWave);
      } else {
        // Reset to idle position
        this.penguinParts.leftWing.rotation.z = -0.3;
        this.penguinParts.rightWing.rotation.z = 0.3;
      }
    };
    
    animateWave();
  }

  triggerExcitedAnimation() {
    if (!this.penguinParts.group) return;
    
    // Bounce animation
    const originalY = this.penguinParts.group.position.y;
    const duration = 500;
    const startTime = Date.now();
    
    const animateBounce = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const bounce = Math.sin(progress * Math.PI) * 0.2;
      
      this.penguinParts.group.position.y = originalY + bounce;
      
      if (progress < 1) {
        requestAnimationFrame(animateBounce);
      }
    };
    
    animateBounce();
  }

  startAnimation() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.animate();
  }

  animate() {
    if (!this.isAnimating) return;
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    
    // Frame rate limiting
    if (deltaTime < 1000 / this.maxFPS) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.lastFrameTime = currentTime;
    
    // Update animations
    this.updateIdleAnimations();
    
    // Auto-rotate if enabled
    if (this.config.autoRotate && this.penguin && !this.isMouseDown) {
      this.penguin.rotation.y += 0.005;
    }
    
    // Render
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateIdleAnimations() {
    if (!this.penguinParts.body) return;
    
    // Breathing
    this.breathingTween.time += this.breathingTween.speed;
    const breathScale = 1 + Math.sin(this.breathingTween.time) * 0.02;
    this.penguinParts.body.scale.set(breathScale, breathScale, breathScale);
    
    // Wing flap (subtle)
    this.wingFlapTween.time += this.wingFlapTween.speed;
    const wingFlap = Math.sin(this.wingFlapTween.time) * this.wingFlapTween.amplitude;
    
    if (this.penguinParts.leftWing && this.penguinParts.rightWing) {
      this.penguinParts.leftWing.rotation.x = wingFlap * 0.1;
      this.penguinParts.rightWing.rotation.x = wingFlap * 0.1;
    }
    
    // Head bob
    this.headBobTween.time += this.headBobTween.speed;
    const headBob = Math.sin(this.headBobTween.time) * this.headBobTween.amplitude;
    
    if (this.penguinParts.head && !this.isMouseDown) {
      this.penguinParts.head.position.y = 1.4 + headBob * 0.05;
    }
  }

  // Public API
  show() {
    if (this.container) {
      this.container.style.display = 'block';
      this.container.style.opacity = '1';
    }
  }

  hide() {
    if (this.container) {
      this.container.style.opacity = '0';
      setTimeout(() => {
        if (this.container) {
          this.container.style.display = 'none';
        }
      }, 300);
    }
  }

  setPosition(x, y) {
    if (this.container) {
      this.container.style.left = x + 'px';
      this.container.style.bottom = y + 'px';
    }
  }

  setSize(width, height) {
    if (this.container) {
      this.container.style.width = width + 'px';
      this.container.style.height = height + 'px';
      this.handleResize();
    }
  }

  // Performance monitoring
  getPerformanceInfo() {
    if (!this.renderer) return null;
    
    return {
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      geometries: this.renderer.info.memory.geometries,
      textures: this.renderer.info.memory.textures,
      fps: Math.round(1000 / (performance.now() - this.lastFrameTime))
    };
  }

  // Utility
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Event handling
  handleEvent(eventName, data) {
    switch (eventName) {
      case 'sectionChange':
        // Adjust penguin behavior based on section
        if (data.section === 'hero') {
          this.config.autoRotate = true;
        } else {
          this.config.autoRotate = false;
        }
        break;
      case 'configUpdate':
        this.updateConfig(data);
        break;
      case 'performanceMode':
        this.adjustPerformance(data.mode);
        break;
    }
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    
    // Apply config changes
    if (newConfig.hasOwnProperty('autoRotate')) {
      this.config.autoRotate = newConfig.autoRotate;
    }
    
    if (newConfig.hasOwnProperty('enableAnimation')) {
      if (newConfig.enableAnimation && !this.isAnimating) {
        this.startAnimation();
      } else if (!newConfig.enableAnimation && this.isAnimating) {
        this.stopAnimation();
      }
    }
  }

  adjustPerformance(mode) {
    switch (mode) {
      case 'high':
        this.maxFPS = 60;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        break;
      case 'medium':
        this.maxFPS = 30;
        this.renderer.setPixelRatio(1);
        break;
      case 'low':
        this.maxFPS = 15;
        this.renderer.setPixelRatio(0.5);
        break;
    }
  }

  stopAnimation() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  cleanup() {
    // Stop animation
    this.stopAnimation();
    
    // Remove event listeners
    Object.keys(this.eventHandlers).forEach(key => {
      const handler = this.eventHandlers[key];
      if (handler) {
        if (key === 'resize') {
          window.removeEventListener('resize', handler);
        } else {
          this.container?.removeEventListener(key.replace('mouse', '').toLowerCase(), handler);
        }
      }
    });
    
    // Dispose Three.js resources
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Remove container
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    
    console.log('🐧 PenguinModule cleaned up');
  }
}
