// === NEURAL NETWORK MODULE - Sistema completo per particles-background ===

export class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('particles-background');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.codes = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;

        this.config = {
            particleCount: 80,
            maxDistance: 120,
            particleSize: 3,
            particleSpeed: 0.5,
            connectionOpacity: 0.8,
            pulseSpeed: 0.02,
            codeCount: 15,
            codeSpeed: 0.3,
            colors: {
                particles: ['#888888', '#999999', '#777777', '#666666', '#aaaaaa','#fff'],
                connections: '#cccccc',
                codes: '#888888'
            }
        };

        this.time = 0;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.createCodes();
        this.bindEvents();
        this.animate();
        
        console.log('🧠 NeuralNetwork initialized with', this.particles.length, 'particles and', this.codes.length, 'codes');
        console.log('🎯 Canvas dimensions:', this.canvas.width, 'x', this.canvas.height);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateRandomCode() {
        const types = ['binary', 'hex', 'alpha'];
        const type = types[Math.floor(Math.random() * types.length)];

        switch(type) {
            case 'binary':
                return Array.from({length: 6 + Math.floor(Math.random() * 6)}, () => Math.random() < 0.5 ? '0' : '1').join('');
            case 'hex':
                const hexChars = '0123456789ABCDEF';
                return Array.from({length: 4 + Math.floor(Math.random() * 4)}, () => hexChars[Math.floor(Math.random() * hexChars.length)]).join('');
            case 'alpha':
                const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                return Array.from({length: 3 + Math.floor(Math.random() * 4)}, () => alphaChars[Math.floor(Math.random() * alphaChars.length)]).join('');
            default:
                return '101010';
        }
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                size: Math.random() * this.config.particleSize + 1,
                color: this.config.colors.particles[Math.floor(Math.random() * this.config.colors.particles.length)],
                pulse: Math.random() * Math.PI * 2,
                activity: Math.random()
            });
        }
    }

    createCodes() {
        this.codes = [];
        for (let i = 0; i < this.config.codeCount; i++) {
            this.codes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.codeSpeed,
                vy: (Math.random() - 0.5) * this.config.codeSpeed,
                text: this.generateRandomCode(),
                opacity: 0.3 + Math.random() * 0.4,
                life: 300 + Math.random() * 200,
                maxLife: 300 + Math.random() * 200,
                size: 10 + Math.random() * 4
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
            this.createCodes();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Movimento base
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Effetto mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
                particle.activity = Math.min(1, particle.activity + 0.02);
            } else {
                particle.activity = Math.max(0, particle.activity - 0.005);
            }

            // Limitazione velocità
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 2) {
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }

            // Bordi del canvas
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Aggiornamento pulsazione
            particle.pulse += this.config.pulseSpeed;
        });
    }

    updateCodes() {
        this.codes.forEach((code, index) => {
            // Movimento
            code.x += code.vx;
            code.y += code.vy;

            // Vita del codice
            code.life--;
            code.opacity = (code.life / code.maxLife) * 0.7;

            // Bordi del canvas
            if (code.x < -50 || code.x > this.canvas.width + 50) {
                code.vx *= -1;
            }
            if (code.y < -20 || code.y > this.canvas.height + 20) {
                code.vy *= -1;
            }

            // Rigenera codice se morto
            if (code.life <= 0) {
                code.x = Math.random() * this.canvas.width;
                code.y = Math.random() * this.canvas.height;
                code.text = this.generateRandomCode();
                code.life = code.maxLife;
                code.opacity = 0.3 + Math.random() * 0.4;
            }

            // Cambia codice occasionalmente
            if (Math.random() < 0.001) {
                code.text = this.generateRandomCode();
            }
        });
    }

    drawConnections() {
        this.ctx.strokeStyle = this.config.colors.connections;
        this.ctx.lineWidth = 1.2;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];

                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.maxDistance) {
                    const opacity = (1 - distance / this.config.maxDistance) * this.config.connectionOpacity;
                    const activity = (p1.activity + p2.activity) / 2;

                    // Effetto pulsazione nelle connessioni
                    const pulse = Math.sin(this.time * 0.01 + distance * 0.01) * 0.3 + 0.7;

                    const finalOpacity = opacity * pulse * (0.5 + activity * 0.5);
                    this.ctx.globalAlpha = Math.min(finalOpacity, 0.8);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();

                    // Segnali neurali che viaggiano lungo le connessioni
                    if (Math.random() < 0.001 + activity * 0.01) {
                        this.drawNeuralSignal(p1, p2, distance);
                    }
                }
            }
        }
    }

    drawNeuralSignal(p1, p2, distance) {
        const progress = (this.time * 0.02) % 1;
        const x = p1.x + (p2.x - p1.x) * progress;
        const y = p1.y + (p2.y - p1.y) * progress;

        this.ctx.globalAlpha = Math.sin(progress * Math.PI) * 0.9;
        this.ctx.fillStyle = '#ffffff';
        
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 8;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.shadowBlur = 0;
    }

    drawParticles() {
        this.particles.forEach(particle => {
            const pulseScale = 1 + Math.sin(particle.pulse) * 0.3 * particle.activity;
            const size = particle.size * pulseScale;

            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10 + particle.activity * 15;

            this.ctx.globalAlpha = 0.7 + particle.activity * 0.3;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.globalAlpha = 0.9;
            this.ctx.fillStyle = '#bbbbbb';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size * 0.3, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 0;
        });
    }

    drawCodes() {
        // Salva lo stato del context
        this.ctx.save();

        this.ctx.font = '12px "Courier New", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.codes.forEach(code => {
            this.ctx.globalAlpha = code.opacity;
            this.ctx.fillStyle = this.config.colors.codes;

            // Effetto leggero glow per i codici
            this.ctx.shadowColor = this.config.colors.codes;
            this.ctx.shadowBlur = 5;

            this.ctx.fillText(code.text, code.x, code.y);

            this.ctx.shadowBlur = 0;
        });

        // Ripristina lo stato del context
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateParticles();
        this.updateCodes();
        this.drawConnections();
        this.drawParticles();
        this.drawCodes();

        this.time++;
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // Metodi pubblici per compatibilità (non più necessari)
    update() {
        this.updateParticles();
        this.updateCodes();
        this.time++;
    }

    // Metodo pubblico per renderizzare (non più necessario)
    render() {
        if (this.codes.length > 0) {
            this.drawCodes();
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resizeCanvas);
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
}
