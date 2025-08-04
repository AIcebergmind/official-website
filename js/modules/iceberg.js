// === ICEBERG MODULE - Core Canvas & Color System ===

export class IcebergModule {
  constructor(config = {}) {
    this.config = config;
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.isActive = false;
    
    // Iceberg state
    this.scrollScale = 1;
    this.bgTransitionProgress = 1;
    this.numPoints = 10; // Ridotto da 10 a 6 per meno complessità
    this.lineDistance = 500;
    this.points = [];
    this.angleOffset = 0;
    this.mouse = { x: 0, y: 0 };
    
    // Color system - DISATTIVATO
    this.colorCycleActive = false;
    this.colorChangeInterval = null;
    this.dynamicPalette = [
      "#00f5d4", "#3a0ca3", "#4361ee", "#4cc9f0", "#5ee4c3",
      "#f72585", "#7209b7", "#2b2d42", "#edf2f4", "#b5179e"
    ];
    this.bgColor = this.dynamicPalette[0];
    this.contrastColor = this.dynamicPalette[1];
    this.bgColorOld = this.bgColor;
    this.bgColorNew = this.contrastColor;
    
    this.init();
  }

  init() {
    this.canvas = document.getElementById("iceberg");
    if (!this.canvas) {
      console.warn('⚠️ Iceberg canvas not found');
      return;
    }
    
    console.log('🧊 Canvas found:', this.canvas);
    
    // Aggiungi stili CSS al canvas
    this.addCanvasStyles();
    
    this.ctx = this.canvas.getContext("2d");
    this.setupCanvas();
    this.generatePoints();
    this.bindEvents();
    // this.startColorCycle(); // DISATTIVATO - sistema colore rimosso
    this.start();
    
    console.log('🧊 IcebergModule initialized');
  }
  
  addCanvasStyles() {
    // Applica stili direttamente al canvas
    Object.assign(this.canvas.style, {
      width: '100%',
      height: '100%',
      display: 'block',
      transformOrigin: 'center center'
      // backgroundColor rimosso per trasparenza
    });
  }

  setupCanvas() {
    this.resizeCanvas();
    
    // Performance optimization
    this.canvas.style.transform = 'translateZ(0)';
    this.canvas.style.backfaceVisibility = 'hidden';
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }

  generatePoints() {
    this.points = [];
    const radius = Math.min(this.canvas.width, this.canvas.height) / 4;
    
    for (let i = 0; i < this.numPoints; i++) {
      const angle = (Math.PI * 2 * i) / this.numPoints;
      const x = Math.cos(angle) * radius * (0.5 + Math.random());
      const y = Math.sin(angle) * radius * (0.5 + Math.random());
      this.points.push({ x, y });
    }
  }

  bindEvents() {
    // Resize handler
    this.resizeHandler = () => {
      this.resizeCanvas();
      this.generatePoints();
    };
    window.addEventListener("resize", this.resizeHandler);

    // Mouse tracking
    this.mouseHandler = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / this.canvas.clientWidth - 0.5) * 2;
      this.mouse.y = ((e.clientY - rect.top) / this.canvas.clientHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", this.mouseHandler);
  }

  // Color system
  lerpColor(a, b, t) {
    const ah = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
    const bh = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
    const rh = ah.map((v, i) => Math.round(v + (bh[i] - v) * t).toString(16).padStart(2, '0'));
    return `#${rh.join('')}`;
  }

  changeColors() {
    // DISATTIVATO - Sistema colore rimosso
    return;
    
    if (!this.colorCycleActive) return;
    
    const bgIndex = Math.floor(Math.random() * this.dynamicPalette.length);
    let contrastIndex;
    do { contrastIndex = Math.floor(Math.random() * this.dynamicPalette.length); }
    while (contrastIndex === bgIndex);

    this.bgColorOld = this.bgColor;
    this.bgColorNew = this.dynamicPalette[bgIndex];
    this.bgTransitionProgress = 0;
    this.bgColor = this.bgColorNew;
    this.contrastColor = this.dynamicPalette[contrastIndex];

    // Update hero text color
    const heroText = document.querySelector(".hero-text");
    if (heroText) heroText.style.color = this.contrastColor;
    
    // Emit color change event
    if (window.AicebergMind) {
      window.AicebergMind.emit('colorChange', {
        bgColor: this.bgColor,
        contrastColor: this.contrastColor
      });
    }
  }

  startColorCycle() {
    // DISATTIVATO - Sistema colore rimosso
    return;
    
    this.colorChangeInterval = setInterval(() => {
      this.changeColors();
    }, 2000);
  }

  stopColorCycle() {
    if (this.colorChangeInterval) {
      clearInterval(this.colorChangeInterval);
    }
  }

  // Drawing methods
  draw() {
    if (!this.ctx || !this.isActive) {
      console.log('🧊 Draw stopped - ctx:', !!this.ctx, 'isActive:', this.isActive);
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // High contrast mode
    if (document.body.classList.contains('high-contrast')) {
      this.drawHighContrast();
    } else {
      this.drawNormal();
    }
    
    this.animationId = requestAnimationFrame(() => this.draw());
  }

  drawHighContrast() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawIceberg('#ffffff', 1);
    this.drawIcebergReflection('#ffffff', 0.3);
  }

  drawNormal() {
    // Background rimosso per trasparenza completa
    // this.ctx.fillStyle = '#1a1a2e';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Iceberg wireframe con gradiente ghiaccio
    this.drawIceberg('gradient', 1);
    this.drawIcebergReflection('gradient', 0.3);
    
    // Update global colors - DISATTIVATO
    // this.updateGlobalColors(interpolatedColor, this.contrastColor);
  }

  drawIceberg(color, alpha) {
    const offsetX = Math.sin(this.angleOffset) * 20 + this.mouse.x * 30;
    const offsetY = Math.cos(this.angleOffset) * 20 + this.mouse.y * 30;
    const rotate = Math.sin(this.angleOffset) * 0.01;
    
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2 + offsetX, this.canvas.height / 2 + offsetY);
    this.ctx.rotate(rotate);
    this.ctx.scale(this.scrollScale, this.scrollScale);
    this.ctx.globalAlpha = alpha;
    
    // 🧊 Gradiente ghiaccio per effetto cristallino
    if (color === 'gradient') {
      const gradient = this.ctx.createLinearGradient(0, -200, 0, 200);
      gradient.addColorStop(0, '#E6F3FF');    // Bianco ghiaccio
      gradient.addColorStop(0.3, '#B3E5FC'); // Azzurro ghiaccio
      gradient.addColorStop(0.7, '#4DD0E1'); // Cyan ghiaccio
      gradient.addColorStop(1, '#00BCD4');   // Cyan profondo
      this.ctx.strokeStyle = gradient;
    } else {
      this.ctx.strokeStyle = color;
    }
    
    this.ctx.lineWidth = 1;
    
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const p1 = this.points[i], p2 = this.points[j];
        const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        
        if (distance < this.lineDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    
    this.ctx.restore();
    this.angleOffset += 0.005;
  }

  drawIcebergReflection(color, alpha) {
    const offsetX = Math.sin(this.angleOffset) * 20 + this.mouse.x * 30;
    const offsetY = Math.cos(this.angleOffset) * 20 + this.mouse.y * 30;
    const rotate = Math.sin(this.angleOffset) * 0.01;
    
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2 + offsetX, this.canvas.height / 2 + offsetY);
    this.ctx.rotate(-rotate);
    this.ctx.scale(this.scrollScale, -this.scrollScale);
    this.ctx.globalAlpha = alpha;
    
    // 🧊 Gradiente ghiaccio per riflesso (più tenue)
    if (color === 'gradient') {
      const gradient = this.ctx.createLinearGradient(0, -200, 0, 200);
      gradient.addColorStop(0, '#C7E8FF');    // Bianco ghiaccio più tenue
      gradient.addColorStop(0.3, '#9DDCF9'); // Azzurro ghiaccio più tenue
      gradient.addColorStop(0.7, '#39C5DA'); // Cyan ghiaccio più tenue
      gradient.addColorStop(1, '#00A8C4');   // Cyan profondo più tenue
      this.ctx.strokeStyle = gradient;
    } else {
      this.ctx.strokeStyle = color;
    }
    
    this.ctx.lineWidth = 0.5;
    
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const p1 = this.points[i], p2 = this.points[j];
        const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        
        if (distance < this.lineDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    
    this.ctx.restore();
  }

  updateGlobalColors(bgColor, textColor) {
    // DISATTIVATO - Sistema colore rimosso
    return;
    
    // Skip if high contrast is active
    if (document.body.classList.contains('high-contrast')) return;
    
    // Update sections
    document.querySelectorAll('.section, .parallax-section').forEach(section => {
      section.style.background = `linear-gradient(to bottom, ${bgColor}, ${bgColor})`;
      section.style.color = textColor;
    });
    
    // Update dynamic elements
    const dynamicBorder = document.querySelector('.dynamic-border');
    if (dynamicBorder) {
      dynamicBorder.style.borderColor = bgColor;
    }
  }

  // Public methods
  setScrollScale(scale) {
    this.scrollScale = scale;
  }

  setNumPoints(points) {
    this.numPoints = points;
    this.generatePoints();
  }

  setLineDistance(distance) {
    this.lineDistance = distance;
  }

  toggleColorCycle() {
    this.colorCycleActive = !this.colorCycleActive;
    
    if (this.colorCycleActive) {
      this.startColorCycle();
    } else {
      this.stopColorCycle();
    }
    
    return this.colorCycleActive;
  }

  start() {
    console.log('🧊 Starting iceberg animation...');
    this.isActive = true;
    this.draw();
  }

  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  handleEvent(eventName, data) {
    switch (eventName) {
      case 'scroll':
        this.setScrollScale(data.scale);
        break;
      case 'configUpdate':
        this.updateConfig(data);
        break;
    }
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    
    // Apply config changes
    if (newConfig.colorCycle !== undefined) {
      this.colorCycleActive = newConfig.colorCycle;
      if (this.colorCycleActive) {
        this.startColorCycle();
      } else {
        this.stopColorCycle();
      }
    }
  }

  cleanup() {
    this.stop();
    this.stopColorCycle();
    
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
    
    if (this.mouseHandler) {
      document.removeEventListener("mousemove", this.mouseHandler);
    }
    
    console.log('🧊 IcebergModule cleaned up');
  }
}
