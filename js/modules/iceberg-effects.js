// === ICEBERG EFFECTS MODULE - Superfici e Effetti Avanzati ===

export class IcebergEffects {
  constructor(icebergModule) {
    console.log('🎨 IcebergEffects constructor called with:', icebergModule);
    
    if (!icebergModule) {
      console.error('❌ No iceberg module provided to IcebergEffects');
      throw new Error('Iceberg module is required');
    }
    
    this.iceberg = icebergModule;
    this.enabled = false;
    
    // Configurazione effetti
    this.config = {
      surfaces: {
        enabled: true,
        opacity: 0.4,
        gradientIntensity: 0.8
      },
      facets: {
        enabled: true,
        minDistance: 20,  // Molto più permissivo
        maxDistance: 600  // Molto più grande
      },
      animation: {
        colorShift: true,
        breathingEffect: false,
        speed: 0.003
      }
    };
    
    // Stato animazione
    this.time = 0;
    this.breathingOffset = 0;
    
    // Cache per facce stabili
    this.cachedFaces = null;
    this.lastPointsLength = 0;
    
    console.log('🎨 IcebergEffects module initialized');
  }

  // ===== CONFIGURAZIONE =====
  enable() {
    this.enabled = true;
    console.log('🎨 Iceberg surface effects enabled');
  }

  disable() {
    this.enabled = false;
    console.log('🎨 Iceberg surface effects disabled');
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    console.log('🎨 Effects config updated:', this.config);
  }

  // ===== CALCOLO FACCE MASSIMIZZATO =====
  findTriangularFaces(points) {
    // Cache delle facce per evitare sfarfallio
    if (this.cachedFaces && this.lastPointsLength === points.length) {
      return this.cachedFaces;
    }
    
    const faces = [];
    
    if (points.length < 6) {
      console.log('🎨 Not enough points for faces:', points.length);
      return faces;
    }
    
    console.log('🎨 Creating maximum faces from', points.length, 'points');
    
    // Approccio 1: TUTTI i triangoli consecutivi possibili
    for (let i = 0; i < points.length; i++) {
      for (let offset = 1; offset <= 3; offset++) {
        const p1 = points[i];
        const p2 = points[(i + offset) % points.length];
        const p3 = points[(i + offset + 1) % points.length];
        
        if (p1 && p2 && p3) {
          const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
          
          // Filtri molto permissivi
          if (area > 20 && area < 15000) {
            const centerX = (p1.x + p2.x + p3.x) / 3;
            const centerY = (p1.y + p2.y + p3.y) / 3;
            
            faces.push({
              points: [p1, p2, p3],
              center: { x: centerX, y: centerY },
              area: area,
              distances: [
                Math.hypot(p1.x - p2.x, p1.y - p2.y),
                Math.hypot(p1.x - p3.x, p1.y - p3.y),
                Math.hypot(p2.x - p3.x, p2.y - p3.y)
              ]
            });
          }
        }
      }
    }
    
    // Approccio 2: Pattern a raggiera dal centro (potenziato)
    if (points.length >= 6) {
      const centerPoint = this.calculateCenterPoint(points);
      
      // Crea triangoli dal centro con ogni coppia di punti adiacenti
      for (let i = 0; i < points.length; i++) {
        const p1 = centerPoint;
        const p2 = points[i];
        const p3 = points[(i + 1) % points.length];
        
        const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
        
        if (area > 50 && area < 12000) {
          const centerX = (p1.x + p2.x + p3.x) / 3;
          const centerY = (p1.y + p2.y + p3.y) / 3;
          
          faces.push({
            points: [p1, p2, p3],
            center: { x: centerX, y: centerY },
            area: area,
            distances: [
              Math.hypot(p1.x - p2.x, p1.y - p2.y),
              Math.hypot(p1.x - p3.x, p1.y - p3.y),
              Math.hypot(p2.x - p3.x, p2.y - p3.y)
            ]
          });
        }
      }
    }
    
    // Approccio 3: Pattern saltando punti (nuovo)
    for (let skip = 2; skip <= 5; skip++) {
      for (let i = 0; i < points.length; i += skip) {
        const p1 = points[i];
        const p2 = points[(i + skip) % points.length];
        const p3 = points[(i + skip * 2) % points.length];
        
        if (p1 && p2 && p3) {
          const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
          
          if (area > 100 && area < 10000) {
            const centerX = (p1.x + p2.x + p3.x) / 3;
            const centerY = (p1.y + p2.y + p3.y) / 3;
            
            // Verifica che non sia troppo allungato
            const d12 = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            const d13 = Math.hypot(p1.x - p3.x, p1.y - p3.y);
            const d23 = Math.hypot(p2.x - p3.x, p2.y - p3.y);
            
            const maxSide = Math.max(d12, d13, d23);
            const minSide = Math.min(d12, d13, d23);
            
            if (maxSide < 600 && minSide > 10 && maxSide / minSide < 15) {
              faces.push({
                points: [p1, p2, p3],
                center: { x: centerX, y: centerY },
                area: area,
                distances: [d12, d13, d23]
              });
            }
          }
        }
      }
    }
    
    // Approccio 4: Pattern incrociati (nuovo)
    if (points.length >= 12) {
      for (let i = 0; i < points.length; i += 3) {
        for (let j = i + 6; j < points.length; j += 3) {
          const p1 = points[i];
          const p2 = points[j % points.length];
          const p3 = points[(j + 3) % points.length];
          
          if (p1 && p2 && p3) {
            const area = Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
            
            if (area > 200 && area < 8000) {
              const centerX = (p1.x + p2.x + p3.x) / 3;
              const centerY = (p1.y + p2.y + p3.y) / 3;
              
              faces.push({
                points: [p1, p2, p3],
                center: { x: centerX, y: centerY },
                area: area,
                distances: [
                  Math.hypot(p1.x - p2.x, p1.y - p2.y),
                  Math.hypot(p1.x - p3.x, p1.y - p3.y),
                  Math.hypot(p2.x - p3.x, p2.y - p3.y)
                ]
              });
            }
          }
        }
      }
    }
    
    // Rimuovi duplicati con tolleranza più bassa (per mantenere più facce)
    const uniqueFaces = this.removeDuplicateFaces(faces, 30); // Soglia ridotta da 50 a 30
    
    // Cache il risultato
    this.cachedFaces = uniqueFaces;
    this.lastPointsLength = points.length;
    
    console.log(`🎨 MAXIMUM triangulation created ${uniqueFaces.length} faces from ${faces.length} candidates`);
    return uniqueFaces;
  }
  
  // Helper per calcolare punto centrale
  calculateCenterPoint(points) {
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    return {
      x: sumX / points.length,
      y: sumY / points.length
    };
  }
  
  // Helper per rimuovere facce duplicate (con soglia configurabile)
  removeDuplicateFaces(faces, threshold = 50) {
    const unique = [];
    
    for (const face of faces) {
      const isDuplicate = unique.some(existing => {
        const distance = Math.hypot(
          face.center.x - existing.center.x,
          face.center.y - existing.center.y
        );
        return distance < threshold;
      });
      
      if (!isDuplicate) {
        unique.push(face);
      }
    }
    
    return unique;
  }

  // ===== GENERAZIONE GRADIENTI =====
  createIceGradient(ctx, face, time) {
    const { center, area } = face;
    
    // Parametri gradiente basati su posizione e tempo
    const angleBase = Math.atan2(center.y, center.x);
    const angleShift = this.config.animation.colorShift ? Math.sin(time * 0.5) * 0.5 : 0;
    const angle = angleBase + angleShift;
    
    // Raggio proporzionale all'area
    const radius = Math.sqrt(area) * 0.8;
    
    // Posizioni gradiente
    const startX = center.x - Math.cos(angle) * radius;
    const startY = center.y - Math.sin(angle) * radius;
    const endX = center.x + Math.cos(angle) * radius;
    const endY = center.y + Math.sin(angle) * radius;
    
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    
    // Colori ghiaccio con variazioni
    const hueShift = Math.sin(time * 0.3 + center.x * 0.001) * 20;
    const brightness = 0.9 + Math.sin(time * 0.4 + center.y * 0.001) * 0.1;
    
    gradient.addColorStop(0, `hsla(${190 + hueShift}, 80%, ${brightness * 95}%, 0.1)`);
    gradient.addColorStop(0.3, `hsla(${195 + hueShift}, 70%, ${brightness * 85}%, 0.3)`);
    gradient.addColorStop(0.7, `hsla(${200 + hueShift}, 60%, ${brightness * 75}%, 0.4)`);
    gradient.addColorStop(1, `hsla(${210 + hueShift}, 80%, ${brightness * 65}%, 0.2)`);
    
    return gradient;
  }

  createReflectionGradient(ctx, face, time) {
    const { center, area } = face;
    
    // Gradiente più sottile per riflesso
    const angleBase = Math.atan2(-center.y, center.x); // Invertito per riflesso
    const angleShift = this.config.animation.colorShift ? Math.sin(time * 0.4) * 0.3 : 0;
    const angle = angleBase + angleShift;
    
    const radius = Math.sqrt(area) * 0.6;
    
    const startX = center.x - Math.cos(angle) * radius;
    const startY = center.y - Math.sin(angle) * radius;
    const endX = center.x + Math.cos(angle) * radius;
    const endY = center.y + Math.sin(angle) * radius;
    
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    
    // Colori riflesso più tenui
    const hueShift = Math.sin(time * 0.2 + center.x * 0.0008) * 15;
    const brightness = 0.7 + Math.sin(time * 0.3 + center.y * 0.0008) * 0.1;
    
    gradient.addColorStop(0, `hsla(${185 + hueShift}, 60%, ${brightness * 85}%, 0.05)`);
    gradient.addColorStop(0.4, `hsla(${190 + hueShift}, 50%, ${brightness * 75}%, 0.15)`);
    gradient.addColorStop(0.8, `hsla(${195 + hueShift}, 40%, ${brightness * 65}%, 0.2)`);
    gradient.addColorStop(1, `hsla(${200 + hueShift}, 60%, ${brightness * 55}%, 0.1)`);
    
    return gradient;
  }

  // ===== RENDERING SUPERFICI STABILIZZATO =====
  drawSurfaces(ctx, points, isReflection = false) {
    if (!this.enabled || !this.config.surfaces.enabled) return;
    
    // Aggiorna tempo più lentamente per evitare sfarfallio
    this.time += this.config.animation.speed * 0.5;
    if (this.config.animation.breathingEffect) {
      this.breathingOffset = Math.sin(this.time * 2) * 0.1;
    }
    
    // Trova facce triangolari (ora con cache)
    const faces = this.findTriangularFaces(points);
    
    if (faces.length === 0) {
      return;
    }
    
    ctx.save();
    
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i];
      
      // Colori basati su posizione della faccia (stabili)
      const hueBase = Math.floor((face.center.x + face.center.y) / 100) % 40;
      const alpha = isReflection ? 0.25 : 0.4;
      const hue = 180 + hueBase;
      const lightness = 65 + (Math.floor(face.area / 1000) % 3) * 8;
      
      // Leggera animazione basata sul tempo (molto lenta)
      const timeOffset = Math.sin(this.time + i * 0.3) * 5;
      
      ctx.save();
      
      // Disegna superficie triangolare
      ctx.beginPath();
      ctx.moveTo(face.points[0].x, face.points[0].y);
      ctx.lineTo(face.points[1].x, face.points[1].y);
      ctx.lineTo(face.points[2].x, face.points[2].y);
      ctx.closePath();
      
      // Colore ghiaccio stabile con leggera variazione
      ctx.fillStyle = `hsla(${hue + timeOffset}, 50%, ${lightness}%, ${alpha})`;
      ctx.fill();
      
      // Bordo sottile per definizione
      ctx.strokeStyle = `hsla(${hue + 15}, 30%, 85%, 0.3)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      
      ctx.restore();
    }
    
    ctx.restore();
  }

  // ===== INTEGRAZIONE CON ICEBERG MODULE =====
  enhanceIcebergDrawing() {
    if (!this.iceberg || !this.enabled) return;
    
    console.log('🎨 Enhancing iceberg drawing with surfaces...');
    
    // Salva i metodi originali
    const originalDrawIceberg = this.iceberg.drawIceberg.bind(this.iceberg);
    const originalDrawReflection = this.iceberg.drawIcebergReflection.bind(this.iceberg);
    
    // Sovrascrivi il metodo drawIceberg del modulo principale
    this.iceberg.drawIceberg = (color, alpha) => {
      // Salva il contesto corrente
      const ctx = this.iceberg.ctx;
      const offsetX = Math.sin(this.iceberg.angleOffset) * 20 + this.iceberg.mouse.x * 30;
      const offsetY = Math.cos(this.iceberg.angleOffset) * 20 + this.iceberg.mouse.y * 30;
      const rotate = Math.sin(this.iceberg.angleOffset) * 0.01;
      
      ctx.save();
      ctx.translate(this.iceberg.canvas.width / 2 + offsetX, this.iceberg.canvas.height / 2 + offsetY);
      ctx.rotate(rotate);
      ctx.scale(this.iceberg.scrollScale, this.iceberg.scrollScale);
      
      // Disegna prima le superfici
      this.drawSurfaces(ctx, this.iceberg.points, false);
      
      ctx.restore();
      
      // Poi disegna le linee originali
      originalDrawIceberg(color, alpha);
    };
    
    // Disabilita il riflesso - non disegnare nulla
    this.iceberg.drawIcebergReflection = (color, alpha) => {
      // Non fare nulla - riflesso disabilitato
      console.log('🎨 Reflection disabled - cleaner surface effect');
    };
    
    console.log('🎨 Iceberg drawing enhanced with surface effects (reflection disabled)');
  }

  // ===== METODI PUBBLICI =====
  toggleSurfaces() {
    this.config.surfaces.enabled = !this.config.surfaces.enabled;
    console.log('🎨 Surfaces toggled:', this.config.surfaces.enabled);
    return this.config.surfaces.enabled;
  }

  setSurfaceOpacity(opacity) {
    this.config.surfaces.opacity = Math.max(0, Math.min(1, opacity));
    console.log('🎨 Surface opacity set to:', this.config.surfaces.opacity);
  }

  setGradientIntensity(intensity) {
    this.config.gradientIntensity = Math.max(0, Math.min(1, intensity));
    console.log('🎨 Gradient intensity set to:', this.config.gradientIntensity);
  }
  
  // Debug method per testare le superfici
  testSurfaces() {
    console.log('🧪 Testing surfaces...');
    console.log('Iceberg module:', this.iceberg);
    console.log('Enabled:', this.enabled);
    console.log('Config:', this.config);
    
    if (this.iceberg && this.iceberg.ctx && this.iceberg.points) {
      console.log('Points:', this.iceberg.points.length);
      const faces = this.findTriangularFaces(this.iceberg.points);
      console.log('Faces found:', faces.length);
      
      if (faces.length > 0) {
        console.log('Sample face:', faces[0]);
        // Forza il ridisegno
        this.iceberg.draw();
      }
    } else {
      console.error('❌ Cannot test surfaces - missing data');
    }
  }
  
  // Forza il ridisegno con effetti
  forceRedraw() {
    if (this.iceberg) {
      this.iceberg.draw();
    }
  }
  
  // Reset cache facce
  resetFaceCache() {
    this.cachedFaces = null;
    this.lastPointsLength = 0;
    console.log('🎨 Face cache reset');
  }

  // ===== CLEANUP =====
  cleanup() {
    this.enabled = false;
    console.log('🎨 IcebergEffects cleaned up');
  }
}

// Funzione di utilità per inizializzazione facile
export function createIcebergEffects(icebergModule, config = {}) {
  console.log('🎨 Creating iceberg effects...', { icebergModule, config });
  
  if (!icebergModule) {
    console.error('❌ Iceberg module not provided');
    return null;
  }
  
  try {
    const effects = new IcebergEffects(icebergModule);
    
    if (config.enabled !== false) {
      console.log('🎨 Enabling effects...');
      effects.enable();
      effects.enhanceIcebergDrawing();
    }
    
    if (config.surfaces) {
      effects.updateConfig({ surfaces: config.surfaces });
    }
    
    console.log('✅ Iceberg effects created successfully');
    return effects;
  } catch (error) {
    console.error('❌ Error creating iceberg effects:', error);
    return null;
  }
}
