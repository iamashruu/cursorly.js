import { iconsData,getIcon, preloadIcons } from './lib/icons.js';
import { effectsList, getEffectDefaults } from './lib/effects.js';
import { initCanvas } from './lib/canvas.js';
import { Particle } from './lib/particles.js';
import { animate } from './lib/animation.js';
import * as API from './lib/api.js';

class Cursorly {
    constructor(options = {}) {
        this.options = Object.assign({ cursor: 0, effect: {} }, options);
        this.effects = effectsList;

        const defaultEffect = getEffectDefaults(this.options.effect.name || 'trail');
        this.options.effect = Object.assign({}, defaultEffect, this.options.effect || {});
        if (!this.effects.includes(this.options.effect.name)) {
            this.options.effect = getEffectDefaults('trail');
        }

        this.enabled = true;
        this.particlesEnabled = this.options.effect.name !== 'none';
        this.hue = 0;
        this.particles = [];
        this.ParticleClass = Particle;

        // Initialize canvas first
        initCanvas(this);

        // Create the cursor image element
        this.cursorIcons = iconsData;
        this.cursorImage = document.createElement('img');
        this.cursorImage.style.position = 'fixed';
        this.cursorImage.style.pointerEvents = 'none';
        this.cursorImage.style.zIndex = '99999';
        this.cursorImage.style.width = '32px';
        this.cursorImage.style.height = '32px';
        this.cursorImage.style.transform = 'translate(-50%, -50%)'; 
        this.cursorImage.src = getIcon(this.options.cursor);

        preloadIcons();

        // Track mouse to move the cursor
        window.addEventListener('mousemove', e => {
            this.cursorImage.style.left = `${e.clientX}px`;
            this.cursorImage.style.top = `${e.clientY}px`;

            if (this.particlesEnabled && this.options.effect.name !== 'none') {
                for (let i = 0; i < this.options.effect.density; i++) {
                    this.particles.push(new this.ParticleClass(this));
                }
            }
        });

        animate(this);
    }

    setIcon(index) { API.setIcon(this, index); }
    setEffect(effectObj) { API.setEffect(this, effectObj); }
    enable() { API.enable(this); }
    disable() { API.disable(this); }
    enableEffect() { this.particlesEnabled = true; }
    disableEffect() { this.particlesEnabled = false; }
}

// Global Init
window.Cursorly = {
    init: (options) => new Cursorly(options)
};
