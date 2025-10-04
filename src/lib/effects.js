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
      "density": 6,
      "size": [2, 4],
      "decay": 0.6,
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
    }
  ];

export const effectsList = effectsData.map(e => e.name);

export function getEffectDefaults(name) {
    const effect = effectsData.find(e => e.name === name);
    return effect ? { ...effect } : effectsData[0];
}
