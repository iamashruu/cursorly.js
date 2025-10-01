(function () {
    class Cursorly {
        constructor(options = {}) {
            // Predefined cursor icons
            this.cursorIcons = [
                "https://img.icons8.com/softteal-color/24/blue-pointer.png",
                "https://img.icons8.com/keek/100/cursor.png",
                "https://img.icons8.com/quill/100/cursor.png",
                "https://img.icons8.com/quill/100/cursor.png",
                "https://img.icons8.com/neon/96/cursor.png",
                "https://img.icons8.com/liquid-glass/48/cursor.png",
                "https://img.icons8.com/plasticine/100/cursor.png",
                "https://img.icons8.com/dotty/80/move.png",
                "https://img.icons8.com/nolan/64/move.png",
                "https://img.icons8.com/color/48/move.png",
                "https://img.icons8.com/nolan/64/scene-builder.png",
                "https://img.icons8.com/skeuomorphism/32/color-wheel-pointer.png",
                "https://img.icons8.com/skeuomorphism/32/duotone-pointer.png",
                "https://img.icons8.com/windows/32/crosshair.png",
                "https://img.icons8.com/dotty/80/crosshair.png",
                "https://img.icons8.com/ios/50/circled-dot.png",
                "https://img.icons8.com/color/48/circled-dot.png",
                "https://img.icons8.com/office/40/circled-dot.png",
                "https://img.icons8.com/ios/50/define-location--v1.png",
                "https://img.icons8.com/ios-filled/50/define-location--v1.png",
                "https://img.icons8.com/color/48/define-location--v1.png",
                "https://img.icons8.com/sf-regular-filled/48/one-finger.png",
                "https://img.icons8.com/stamp/32/one-finger.png",
                "https://img.icons8.com/ultraviolet/40/one-finger--v1.png",
                "https://img.icons8.com/keek/100/one-finger.png",
                "https://img.icons8.com/external-bluetone-bomsymbols-/91/external-arrow-cursor-digital-design-bluetone-set-1-bluetone-bomsymbols--2.png",
                "https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/external-mouse-cursor-input-movable-device-directional-navigation-selection-green-tal-revivo.png",
                "https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/32/external-top-page-movement-of-mouse-cursor-arrow-selection-tritone-tal-revivo.png",
                "https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/external-top-page-movement-of-mouse-cursor-arrow-selection-regular-tal-revivo.png",
                "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-top-page-movement-of-mouse-cursor-arrow-selection-shadow-tal-revivo.png",
                "https://img.icons8.com/external-vectorslab-glyph-vectorslab/53/external-Mouse-gaming-vectorslab-glyph-vectorslab.png",
                "https://img.icons8.com/emoji/48/mouse-body-emoji.png",
                "https://img.icons8.com/external-tal-revivo-fresh-tal-revivo/56/external-mouse-double-click-for-access-an-application-selection-fresh-tal-revivo.png",
                "https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-click-touch-gestures-those-icons-lineal-those-icons.png",
                "https://img.icons8.com/bubbles/50/electrified-cursor.png",
                "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-mouse-double-click-for-access-an-application-selection-shadow-tal-revivo.png",
                "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-sand-cursors-soft-fill-soft-fill-juicy-fish.png",
                "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-vector-cursors-soft-fill-soft-fill-juicy-fish.png",
                "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-move-cursors-soft-fill-soft-fill-juicy-fish-2.png",
                "https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/64/external-click-on-touchscreen-isolate-on-a-white-background-touch-tritone-tal-revivo.png",
                "https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/external-click-on-touchscreen-isolate-on-a-white-background-touch-green-tal-revivo.png",
                "https://img.icons8.com/external-avoca-kerismaker/64/external-Direct-cursor-creativity-avoca-kerismaker.png"
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
            document.querySelectorAll("a, button").forEach(el => {
            el.style.cursor = "none";
            });


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
            document.querySelectorAll("a, button").forEach(el => {
                el.style.cursor = "pointer";
                });
    
        }

        enableEffect() {
            this.particlesEnabled = true;
        }

        disableEffect() {
            this.particlesEnabled = false;
        }

        setIcon(index) {
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
    window.Cursorly = {
        init: (options) => new Cursorly(options)
    };
})();
