// export function setIcon(lib, index) {
//     if (index >= 0 && index < lib.cursorIcons.length) {
//         lib.options.cursor = index;
//         lib.cursorLoaded = false;
//         lib.cursorImage.onload = () => { lib.cursorLoaded = true; };
//         lib.cursorImage.src = lib.cursorIcons[index];
//     }
// }

// export function setEffect(lib, effectObj) {
//     if (!effectObj) return;
//     if (effectObj.name && lib.effects.includes(effectObj.name)) {
//         lib.options.effect.name = effectObj.name;
//         lib.particlesEnabled = effectObj.name !== "none";
//     }
//     if (effectObj.color) lib.options.effect.color = effectObj.color;
//     if (effectObj.density) lib.options.effect.density = effectObj.density;
//     if (effectObj.size) lib.options.effect.size = effectObj.size;
//     if (effectObj.decay) lib.options.effect.decay = effectObj.decay;
//     if (effectObj.hueStep) lib.options.effect.hueStep = effectObj.hueStep;
// }

// export function enable(lib) {
//     lib.enabled = true;
//     lib.particlesEnabled = lib.options.effect.name !== "none";
//     document.body.style.cursor = "none";
//     document.documentElement.style.cursor = "none";
// }

// export function disable(lib) {
//     lib.enabled = false;
//     lib.particlesEnabled = false;
//     document.body.style.cursor = "default";
//     document.documentElement.style.cursor = "default";
//     document.querySelectorAll("a, button").forEach(el => el.style.cursor = "pointer");
// }
import { getEffectDefaults, effectsList } from './effects.js';
import { preloadIcons } from './icons.js';

export function addIcon(lib, url) {
    if (typeof url === 'string' && url.startsWith('http')) {
        lib.cursorIcons.push(url);
        preloadIcons(url);
        return lib.cursorIcons.length - 1; // Return the index of the newly added icon
    }
}

export function setIcon(lib, index) {
    if (lib.cursorIcons[index]) {
        lib.options.cursor = index;
        lib.cursorImage.src = lib.cursorIcons[index];
    }
}

export function setEffect(lib, effectObj) {
    if (!effectObj || !effectObj.name) return;

    // Check if effect exists
    const effectName = effectsList.includes(effectObj.name) ? effectObj.name : 'trail';
    const defaultEffect = getEffectDefaults(effectName);

    // Merge user effect options
    lib.options.effect = Object.assign({}, defaultEffect, effectObj);

    // Enable particles if effect is not "none"
    lib.particlesEnabled = lib.options.effect.name !== 'none';
    lib.hue = 0;
}

export function enable(lib) {
    lib.enabled = true;
    lib.particlesEnabled = lib.options.effect.name !== "none";
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";
}

export function disable(lib) {
    lib.enabled = false;
    lib.particlesEnabled = false;
    document.body.style.cursor = "default";
    document.documentElement.style.cursor = "default";
    document.querySelectorAll("a, button").forEach((el) => {
        el.style.cursor = "pointer";
    });
}
