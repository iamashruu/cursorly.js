export function initCursor(lib) {
    lib.cursorImage = new Image();
    lib.cursorLoaded = false;
    lib.cursorImage.onload = () => { lib.cursorLoaded = true; };
}

export function drawCursor(lib) {
    if (!lib.enabled || !lib.cursorLoaded) return;
    const size = lib.options.cursorSize || 24;
    lib.ctx.drawImage(
        lib.cursorImage,
        lib.mouse.x - size / 2,
        lib.mouse.y - size / 2,
        size,
        size
    );
}
