import { drawCursor } from './cursor.js';

export function animate(lib) {
    lib.ctx.clearRect(0, 0, lib.canvas.width, lib.canvas.height);

    if (lib.particlesEnabled) lib.hue += lib.options.effect.hueStep;

    if (lib.particlesEnabled) {
        for (let i = 0; i < lib.particles.length; i++) {
            lib.particles[i].update();
            lib.particles[i].draw();
            if (lib.particles[i].size < 0.5) {
                lib.particles.splice(i, 1);
                i--;
            }
        }
    }

    if (lib.enabled) drawCursor(lib);
    requestAnimationFrame(() => animate(lib));
}
