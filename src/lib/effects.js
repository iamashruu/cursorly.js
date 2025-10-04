// import effectsData from '../data/effects.json';

// export const effectsList = (effectsData.effects || []).map(e => e.name);

// export function getEffectDefaults(name) {
//   const effect = (effectsData.effects || []).find(e => e.name === name);
//   return effect ? { ...effect } : { name: 'trail', color: 'rainbow', density: 6, size: [2,8], decay:0.95, hueStep:3 };
// }

// import effectsData from '../data/effects.json';

// export const effectsList = (effectsData.effects || []).map(e => e.name);

// export function getEffectDefaults(name) {
//     const effect = (effectsData.effects || []).find(e => e.name === name);
//     return effect ? { ...effect } : {
//         name: 'trail',
//         color: 'rainbow',
//         density: 4,
//         size: [2, 8],
//         decay: 0.95,
//         hueStep: 3,
//         shape: '●',
//         motion: 'trail'
//     };
// }

export const effectsData = [
  {
    "name": "trail",
    "color": "rainbow",
    "density": 6,
    "size": [2, 8],
    "decay": 0.95,
    "hueStep": 3,
    "type": "default"
  },
  {
    "name": "sparkle",
    "color": "white",
    "density": 8,
    "size": [2, 6],
    "decay": 0.9,
    "hueStep": 0,
    "type": "default"
  },
  {
    "name": "emoji",
    "shape": "✨",
    "color": "white",
    "density": 3,
    "size": [1, 4],
    "decay": 0.8,
    "type": "emoji"
  },
  {
    "name": "firing",
    "color": ["#ff4500", "#ffa500", "#ff0000"],
    "density": 10,
    "size": [2, 6],
    "decay": 0.85,
    "type": "firing"
  },
  {
    "name": "circle",
    "color": "#00ffcc",
    "density": 6,
    "size": [4, 10],
    "decay": 0.95,
    "type": "circle"
  },
  {
    "name": "none",
    "color": "none",
    "density": 0,
    "size": [0, 0],
    "decay": 1,
    "type": "default"
  },

  // --- New Normal Effects ---
  {
    "name": "neonGlow",
    "color": ["#00ffff", "#ff00ff", "#ffff00"],
    "density": 7,
    "size": [3, 9],
    "decay": 0.92,
    "type": "default"
  },
  {
    "name": "fireworks",
    "color": ["#ff007f", "#00ffff", "#ffbf00"],
    "density": 12,
    "size": [3, 7],
    "decay": 0.85,
    "type": "default"
  },
  {
    "name": "snowfall",
    "color": "#ffffff",
    "density": 9,
    "size": [2, 5],
    "decay": 0.97,
    "type": "default"
  },
  {
    "name": "aura",
    "color": ["#ff66cc", "#66ccff", "#99ff99"],
    "density": 5,
    "size": [6, 12],
    "decay": 0.9,
    "type": "default"
  },
  {
    "name": "comet",
    "color": ["#ffffff", "#99ccff"],
    "density": 5,
    "size": [3, 10],
    "decay": 0.88,
    "type": "default"
  },

  // --- New Emoji Effects ---
  {
    "name": "emojiHearts",
    "shape": "💖",
    "color": "white",
    "density": 3,
    "size": [3, 6],
    "decay": 0.85,
    "type": "emoji"
  },
  {
    "name": "emojiStars",
    "shape": "⭐",
    "color": "white",
    "density": 3,
    "size": [2, 5],
    "decay": 0.9,
    "type": "emoji"
  },
  {
    "name": "emojiFire",
    "shape": "🔥",
    "color": "white",
    "density": 3,
    "size": [3, 6],
    "decay": 0.8,
    "type": "emoji"
  },
  {
    "name": "emojiSnow",
    "shape": "❄️",
    "color": "white",
    "density": 3,
    "size": [1, 2],
    "decay": 0.95,
    "type": "emoji"
  },
  {
    "name": "emojiMagic",
    "shape": "🪄",
    "color": "white",
    "density": 3,
    "size": [2, 4],
    "decay": 0.95,
    "type": "emoji"
  }
];


export const effectsList = effectsData.map(e => e.name);

export function getEffectDefaults(name) {
    const effect = effectsData.find(e => e.name === name);
    return effect ? { ...effect } : effectsData[0];
}
