(function () {
    class CursorFX {
        constructor(options = {}) {
            // Predefined cursor icons
            this.cursorIcons = [
                "https://img.icons8.com/softteal-color/24/blue-pointer.png",
                "https://img.icons8.com/color/48/000000/mouse-pointer.png",
                "https://img.icons8.com/emoji/48/hand-pointer.png"
            ];

            // Preload all icons
            this.cursorIcons.forEach(url => {
                const img = new Image();
                img.src = url;
            });

            // Supported effects
            this.effects = ["trail", "sparkle", "none"];

            // Default effect values
            const defaultEffect = {
                name: "trail",
                color: "rainbow",
                density: 6,
                size: [2, 8],
                decay: 0.95,
                hueStep: 3
            };

            // Merge user options
            this.options = Object.assign({
                cursor: 0,
                effect: {}
            }, options);

            // Merge effect with defaults (optional keys)
            this.options.effect = Object.assign({}, defaultEffect, this.options.effect || {});

            // Validate effect name
            if (!this.effects.includes(this.options.effect.name)) {
                this.options.effect.name = "trail";
            }

            // Validate cursor index
            if (this.options.cursor < 0 || this.options.cursor >= this.cursorIcons.length) {
                this.options.cursor = 0;
            }

            // Hide default cursor
            document.body.style.cursor = "none";
            document.documentElement.style.cursor = "none";

            // Canvas setup
            this.canvas = document.createElement("canvas");
            this.canvas.style.position = "fixed";
            this.canvas.style.top = "0";
            this.canvas.style.left = "0";
            this.canvas.style.width = "100%";
            this.canvas.style.height = "100%";
            this.canvas.style.pointerEvents = "none";
            this.canvas.style.zIndex = "9999";
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");

            this.resize();
            window.addEventListener("resize", () => this.resize());

            // Mouse
            this.mouse = { x: -100, y: -100 };
            window.addEventListener("mousemove", e => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                if (this.particlesEnabled && this.options.effect.name !== "none") {
                    for (let i = 0; i < this.options.effect.density; i++) {
                        this.particles.push(new Particle(this));
                    }
                }
            });

            // Particle system
            this.particles = [];
            this.hue = 0;

            // Cursor image
            this.cursorImage = new Image();
            this.cursorLoaded = false;
            this.cursorImage.onload = () => {
                this.cursorLoaded = true;
            };
            this.cursorImage.src = this.cursorIcons[this.options.cursor];

            // Enable flags
            this.enabled = true;
            this.particlesEnabled = this.options.effect.name !== "none";

            // Start animation
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth || document.body.clientWidth;
            this.canvas.height = window.innerHeight || document.body.clientHeight;
        }

        drawCursor() {
            if (!this.enabled) return;
            if (!this.cursorLoaded) return; // Wait until image is loaded

            this.ctx.drawImage(
                this.cursorImage,
                this.mouse.x - (this.options.cursorSize || 24) / 2,
                this.mouse.y - (this.options.cursorSize || 24) / 2,
                this.options.cursorSize || 24,
                this.options.cursorSize || 24
            );
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.particlesEnabled) this.hue += this.options.effect.hueStep;

            // Draw particles
            if (this.particlesEnabled) {
                for (let i = 0; i < this.particles.length; i++) {
                    this.particles[i].update();
                    this.particles[i].draw();
                    if (this.particles[i].size < 0.5) {
                        this.particles.splice(i, 1);
                        i--;
                    }
                }
            }

            // Draw cursor
            if (this.enabled) this.drawCursor();

            requestAnimationFrame(() => this.animate());
        }

        enable() {
            this.enabled = true;
            this.particlesEnabled = this.options.effect.name !== "none";
            document.body.style.cursor = "none";
            document.documentElement.style.cursor = "none";
        }

        disable() {
            this.enabled = false;
            this.particlesEnabled = false;
            document.body.style.cursor = "default";
            document.documentElement.style.cursor = "default";
        }

        enableParticles() {
            this.particlesEnabled = true;
        }

        disableParticles() {
            this.particlesEnabled = false;
        }

        setCursorIcon(index) {
            if (index >= 0 && index < this.cursorIcons.length) {
                this.options.cursor = index;
                this.cursorLoaded = false;
                this.cursorImage.onload = () => { this.cursorLoaded = true; };
                this.cursorImage.src = this.cursorIcons[index];
            }
        }

        setEffect(effectObj) {
            if (!effectObj) return;
            // Only name and color are mandatory
            if (effectObj.name && this.effects.includes(effectObj.name)) {
                this.options.effect.name = effectObj.name;
                this.particlesEnabled = effectObj.name !== "none";
            }
            if (effectObj.color) this.options.effect.color = effectObj.color;

            // Optional overrides
            if (effectObj.density) this.options.effect.density = effectObj.density;
            if (effectObj.size) this.options.effect.size = effectObj.size;
            if (effectObj.decay) this.options.effect.decay = effectObj.decay;
            if (effectObj.hueStep) this.options.effect.hueStep = effectObj.hueStep;
        }
    }

    class Particle {
        constructor(lib) {
            const [minSize, maxSize] = lib.options.effect.size;
            this.x = lib.mouse.x;
            this.y = lib.mouse.y;
            this.size = Math.random() * (maxSize - minSize) + minSize;

            if (lib.options.effect.name === "sparkle") {
                this.speedX = (Math.random() - 0.5) * 4;
                this.speedY = (Math.random() - 0.5) * 4;
            } else {
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }

            this.color = lib.options.effect.color === "rainbow"
                ? `hsl(${lib.hue},100%,60%)`
                : lib.options.effect.color;

            this.lib = lib;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= this.lib.options.effect.decay;
        }

        draw() {
            const ctx = this.lib.ctx;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Global init
    window.CursorFX = {
        init: (options) => new CursorFX(options)
    };
})();
