export function setIcon(lib, index) {
    if (index >= 0 && index < lib.cursorIcons.length) {
        lib.options.cursor = index;
        lib.cursorLoaded = false;
        lib.cursorImage.onload = () => { lib.cursorLoaded = true; };
        lib.cursorImage.src = lib.cursorIcons[index];
    }
}

export function setEffect(lib, effectObj) {
    if (!effectObj) return;
    if (effectObj.name && lib.effects.includes(effectObj.name)) {
        lib.options.effect.name = effectObj.name;
        lib.particlesEnabled = effectObj.name !== "none";
    }
    if (effectObj.color) lib.options.effect.color = effectObj.color;
    if (effectObj.density) lib.options.effect.density = effectObj.density;
    if (effectObj.size) lib.options.effect.size = effectObj.size;
    if (effectObj.decay) lib.options.effect.decay = effectObj.decay;
    if (effectObj.hueStep) lib.options.effect.hueStep = effectObj.hueStep;
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
    document.querySelectorAll("a, button").forEach(el => el.style.cursor = "pointer");
}
