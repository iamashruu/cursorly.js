export const iconsData = [
        "https://img.icons8.com/softteal-color/24/blue-pointer.png",
        "https://img.icons8.com/keek/100/cursor.png",
        "https://img.icons8.com/quill/100/cursor.png",
        "https://img.icons8.com/quill/100/cursor.png",
        "https://img.icons8.com/neon/96/cursor.png",
        "https://img.icons8.com/liquid-glass/48/cursor.png",
        "https://img.icons8.com/plasticine/100/cursor.png",
        "https://img.icons8.com/dotty/80/move.png",
        "https://img.icons8.com/nolan/64/move.png",
        "https://img.icons8.com/color/48/move.png",
        "https://img.icons8.com/nolan/64/scene-builder.png",
        "https://img.icons8.com/skeuomorphism/32/color-wheel-pointer.png",
        "https://img.icons8.com/skeuomorphism/32/duotone-pointer.png",
        "https://img.icons8.com/windows/32/crosshair.png",
        "https://img.icons8.com/dotty/80/crosshair.png",
        "https://img.icons8.com/ios/50/circled-dot.png",
        "https://img.icons8.com/color/48/circled-dot.png",
        "https://img.icons8.com/office/40/circled-dot.png",
        "https://img.icons8.com/ios/50/define-location--v1.png",
        "https://img.icons8.com/ios-filled/50/define-location--v1.png",
        "https://img.icons8.com/color/48/define-location--v1.png",
        "https://img.icons8.com/sf-regular-filled/48/one-finger.png",
        "https://img.icons8.com/stamp/32/one-finger.png",
        "https://img.icons8.com/ultraviolet/40/one-finger--v1.png",
        "https://img.icons8.com/keek/100/one-finger.png",
        "https://img.icons8.com/external-bluetone-bomsymbols-/91/external-arrow-cursor-digital-design-bluetone-set-1-bluetone-bomsymbols--2.png",
        "https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/external-mouse-cursor-input-movable-device-directional-navigation-selection-green-tal-revivo.png",
        "https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/32/external-top-page-movement-of-mouse-cursor-arrow-selection-tritone-tal-revivo.png",
        "https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/external-top-page-movement-of-mouse-cursor-arrow-selection-regular-tal-revivo.png",
        "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-top-page-movement-of-mouse-cursor-arrow-selection-shadow-tal-revivo.png",
        "https://img.icons8.com/external-vectorslab-glyph-vectorslab/53/external-Mouse-gaming-vectorslab-glyph-vectorslab.png",
        "https://img.icons8.com/emoji/48/mouse-body-emoji.png",
        "https://img.icons8.com/external-tal-revivo-fresh-tal-revivo/56/external-mouse-double-click-for-access-an-application-selection-fresh-tal-revivo.png",
        "https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-click-touch-gestures-those-icons-lineal-those-icons.png",
        "https://img.icons8.com/bubbles/50/electrified-cursor.png",
        "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-mouse-double-click-for-access-an-application-selection-shadow-tal-revivo.png",
        "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-sand-cursors-soft-fill-soft-fill-juicy-fish.png",
        "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-vector-cursors-soft-fill-soft-fill-juicy-fish.png",
        "https://img.icons8.com/external-soft-fill-juicy-fish/60/external-move-cursors-soft-fill-soft-fill-juicy-fish-2.png",
        "https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/64/external-click-on-touchscreen-isolate-on-a-white-background-touch-tritone-tal-revivo.png",
        "https://img.icons8.com/external-tal-revivo-green-tal-revivo/36/external-click-on-touchscreen-isolate-on-a-white-background-touch-green-tal-revivo.png",
        "https://img.icons8.com/external-avoca-kerismaker/64/external-Direct-cursor-creativity-avoca-kerismaker.png"
    ];

export function getIcon(index = 0) {
    const safeIndex = Math.max(0, Math.min(index, iconsData.length - 1));
    return iconsData[safeIndex];
}

export function preloadIcons() {
    iconsData.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

