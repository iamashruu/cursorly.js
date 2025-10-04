// Example: add emoji particle
import { Particle } from './particles.js';

export function addEmojiParticle(lib, x, y, emoji, options = {}) {
    lib.particles.push(new Particle(x, y, {
        ...options,
        shape: emoji
    }));
}
