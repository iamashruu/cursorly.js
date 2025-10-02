export class Particle {
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
