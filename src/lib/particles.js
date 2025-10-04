// export class Particle {
//     constructor(lib) {
//         const [minSize, maxSize] = lib.options.effect.size;
//         this.x = lib.mouse.x;
//         this.y = lib.mouse.y;
//         this.size = Math.random() * (maxSize - minSize) + minSize;

//         if (lib.options.effect.name === "sparkle") {
//             this.speedX = (Math.random() - 0.5) * 4;
//             this.speedY = (Math.random() - 0.5) * 4;
//         } else {
//             this.speedX = Math.random() * 2 - 1;
//             this.speedY = Math.random() * 2 - 1;
//         }

//         this.color = lib.options.effect.color === "rainbow"
//             ? `hsl(${lib.hue},100%,60%)`
//             : lib.options.effect.color;

//         this.lib = lib;
//     }

//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         this.size *= this.lib.options.effect.decay;
//     }

//     draw() {
//         const ctx = this.lib.ctx;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = this.color;
//         ctx.fill();
//     }
// }

export class Particle {
    constructor(lib) {
        const effect = lib.options.effect || { name: 'trail', color: 'rainbow', size: [2, 8], density: 6, decay: 0.95, hueStep: 3, type: 'default' };
        const [minSize, maxSize] = effect.size || [2, 8];
        this.size = Math.random() * (maxSize - minSize) + minSize;

        this.x = lib.mouse.x;
        this.y = lib.mouse.y;

        this.type = effect.type || 'default';
        this.shape = effect.shape || null;

        switch (this.type) {
            case 'emoji':
                this.speedX = (Math.random() - 0.5) * 8;
                this.speedY = (Math.random() - 0.5) * 8;
                break;
            case 'firing':
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = -Math.random() * 4 - 2; // fire rises upward
                break;
            case 'circle':
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
                break;
            default:
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
        }

        if (Array.isArray(effect.color)) {
            this.color = effect.color[Math.floor(Math.random() * effect.color.length)];
        } else if (effect.color === 'rainbow') {
            this.color = `hsl(${lib.hue}, 100%, 60%)`;
        } else {
            this.color = effect.color;
        }

        this.lib = lib;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= this.lib.options.effect.decay || 0.95;
    }

    draw() {
        const ctx = this.lib.ctx;
        if (!ctx) return;

        if (this.type === 'emoji' && this.shape) {
            ctx.font = `${this.size * 4}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.shape, this.x, this.y);
        } else if (this.type === 'circle') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else { // default + firing
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}



