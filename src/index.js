import { effectsList, getEffectDefaults } from './lib/effects.js';
import { initCanvas } from './lib/canvas.js';
import { initCursor } from './lib/cursor.js';
import { Particle } from './lib/particles.js';
import { animate } from './lib/animation.js';
import * as API from './lib/api.js';

class Cursorly {
    constructor(options = {}) {
        this.options = Object.assign({ cursor: 0, effect: {} }, options);
    
        this.effects = effectsList;
        this.options = Object.assign({ cursor: 0, effect: {} }, options);

        // Merge user effect with defaults from effects.json
        const userEffectName = this.options.effect.name || 'trail';
        const defaultEffect = getEffectDefaults(userEffectName);
        this.options.effect = Object.assign({}, defaultEffect, this.options.effect || {});

        if (!this.effects.includes(this.options.effect.name)) {
        this.options.effect.name = 'trail';
        }

        this.cursorIcons = [];
        this.enabled = true;
        this.particlesEnabled = this.options.effect.name !== "none";
        this.hue = 0;
        this.particles = [];
        this.ParticleClass = Particle;

        initCanvas(this);
        initCursor(this);

        // Load icons.json automatically
        fetch('./src/data/icons.json')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.icons)) {
                    this.cursorIcons = data.icons;
                    this.cursorImage.src = this.cursorIcons[this.options.cursor];
                    // Preload images
                    this.cursorIcons.forEach(url => { const img = new Image(); img.src = url; });
                } else console.error("icons.json does not contain 'icons' array");
            })
            .catch(err => console.error("Failed to load icons.json:", err));

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
