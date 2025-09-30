(function () {
    class CursorFX {
        constructor(options = {}) {
            this.options = Object.assign({
                color: "rainbow",          // "rainbow" or fixed color
                density: 5,                // particles per mouse move
                size: [1, 6],              // min/max particle size
                decay: 0.96,               // particle shrink factor
                hueStep: 3,                // rainbow hue increment
                cursorIcon: "https://img.icons8.com/softteal-color/24/blue-pointer.png",
                cursorSize: 24,            // size of cursor icon
            }, options);

            // Hide default cursor
            document.body.style.cursor = "none";
            document.documentElement.style.cursor = "none";

            // Create canvas
            this.canvas = document.createElement("canvas");
            this.canvas.id = "cursorCanvas";
            this.canvas.style.position = "fixed";
            this.canvas.style.top = "0";
            this.canvas.style.left = "0";
            this.canvas.style.width = "100%";
            this.canvas.style.height = "100%";
            this.canvas.style.pointerEvents = "none"; // allow clicking through
            this.canvas.style.zIndex = "9999";
            document.body.appendChild(this.canvas);

            this.ctx = this.canvas.getContext("2d");

            // Resize canvas
            this.resize();
            window.addEventListener("resize", () => this.resize());

            // Mouse position
            this.mouse = { x: -100, y: -100 };
            window.addEventListener("mousemove", (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                if (this.particlesEnabled) {
                    for (let i = 0; i < this.options.density; i++) {
                        this.particles.push(new Particle(this));
                    }
                }
            });

            // Particle system
            this.particles = [];
            this.hue = 0;

            // Cursor image
            this.cursorImage = new Image();
            this.cursorImage.src = this.options.cursorIcon;

            // Effect toggles
            this.enabled = true;          // cursor + particles
            this.particlesEnabled = true; // particles only

            // Animation loop
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth || document.body.clientWidth;
            this.canvas.height = window.innerHeight || document.body.clientHeight;
        }

        drawCursor() {
            if (!this.enabled) return; // disabled completely
            if (!this.cursorImage.complete) return;
            this.ctx.drawImage(
                this.cursorImage,
                this.mouse.x - this.options.cursorSize / 2,
                this.mouse.y - this.options.cursorSize / 2,
                this.options.cursorSize,
                this.options.cursorSize
            );
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.particlesEnabled) this.hue += this.options.hueStep;

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

        // Enable both cursor and particles
        enable() {
            this.enabled = true;
            this.particlesEnabled = true;
            document.body.style.cursor = "none";
            document.documentElement.style.cursor = "none";
        }

        // Disable both cursor and particles
        disable() {
            this.enabled = false;
            this.particlesEnabled = false;
            document.body.style.cursor = "default";
            document.documentElement.style.cursor = "default";
        }

        // Enable only particles
        enableParticles() {
            this.particlesEnabled = true;
        }

        // Disable only particles (cursor still visible)
        disableParticles() {
            this.particlesEnabled = false;
        }
    }

    class Particle {
        constructor(lib) {
            const [minSize, maxSize] = lib.options.size;
            this.x = lib.mouse.x;
            this.y = lib.mouse.y;
            this.size = Math.random() * (maxSize - minSize) + minSize;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = lib.options.color === "rainbow"
                ? `hsl(${lib.hue}, 100%, 60%)`
                : lib.options.color;
            this.lib = lib;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= this.lib.options.decay;
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
    console.log("CursorFX loaded with toggle options");
})();
