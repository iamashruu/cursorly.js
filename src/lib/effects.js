import effectsData from '../data/effects.json';

export const effectsList = (effectsData.effects || []).map(e => e.name);

export function getEffectDefaults(name) {
  const effect = (effectsData.effects || []).find(e => e.name === name);
  return effect ? { ...effect } : { name: 'trail', color: 'rainbow', density: 6, size: [2,8], decay:0.95, hueStep:3 };
}
