// import { drawCursor } from './cursor.js';

// export function animate(lib) {
//     lib.ctx.clearRect(0, 0, lib.canvas.width, lib.canvas.height);

//     if (lib.particlesEnabled) lib.hue += lib.options.effect.hueStep;

//     if (lib.particlesEnabled) {
//         for (let i = 0; i < lib.particles.length; i++) {
//             lib.particles[i].update();
//             lib.particles[i].draw();
//             if (lib.particles[i].size < 0.5) {
//                 lib.particles.splice(i, 1);
//                 i--;
//             }
//         }
//     }

//     if (lib.enabled) drawCursor(lib);
//     requestAnimationFrame(() => animate(lib));
// }
export function animate(lib) {
    // Clear the canvas each frame
    lib.ctx.clearRect(0, 0, lib.canvas.width, lib.canvas.height);

    // Update hue if rainbow effect
    if (lib.particlesEnabled && lib.options.effect.color === 'rainbow') {
        lib.hue = (lib.hue + (lib.options.effect.hueStep || 3)) % 360;
    }

    // Update and draw particles
    if (lib.particlesEnabled) {
        for (let i = lib.particles.length - 1; i >= 0; i--) {
            const p = lib.particles[i];
            p.update();
            p.draw(lib.ctx, lib.hue);

            // Remove small/dead particles
            if (p.size < 0.5 || p.life <= 0) {
                lib.particles.splice(i, 1);
            }
        }
    }

    // Draw cursor image
    if (lib.enabled && lib.cursorImage && lib.cursorImage.complete) {
        lib.ctx.drawImage(
            lib.cursorImage,
            lib.mouse.x - (lib.options.cursorSize || 24) / 2,
            lib.mouse.y - (lib.options.cursorSize || 24) / 2,
            lib.options.cursorSize || 24,
            lib.options.cursorSize || 24
        );
    }

    requestAnimationFrame(() => animate(lib));
}
