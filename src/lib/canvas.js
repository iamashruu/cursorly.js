export function initCanvas(lib) {
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";
    document.querySelectorAll("a, button").forEach(el => el.style.cursor = "none");

    lib.canvas = document.createElement("canvas");
    lib.canvas.style.position = "fixed";
    lib.canvas.style.top = "0";
    lib.canvas.style.left = "0";
    lib.canvas.style.width = "100%";
    lib.canvas.style.height = "100%";
    lib.canvas.style.pointerEvents = "none";
    lib.canvas.style.zIndex = "9999";
    document.body.appendChild(lib.canvas);
    lib.ctx = lib.canvas.getContext("2d");

    lib.resize = () => {
        lib.canvas.width = window.innerWidth || document.body.clientWidth;
        lib.canvas.height = window.innerHeight || document.body.clientHeight;
    };
    lib.resize();
    window.addEventListener("resize", lib.resize);

    lib.mouse = { x: -100, y: -100 };
    window.addEventListener("mousemove", e => {
        lib.mouse.x = e.clientX;
        lib.mouse.y = e.clientY;
        if (lib.particlesEnabled && lib.options.effect.name !== "none") {
            for (let i = 0; i < lib.options.effect.density; i++) {
                lib.particles.push(new lib.ParticleClass(lib));
            }
        }
    });
}
