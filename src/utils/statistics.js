import { getCritMod, getFumbleMod } from './dccBirthAugurs.js';

export const minHitPoints = (hp) => {
  return hp <= 0 ? 1 : hp;
};

export const formatCritDie = (luckMod, luckySign) => {
  const critMod = getCritMod(luckMod, luckySign);
  
  if (critMod === 0 || critMod === '') {
    return 'd4';
  } else if (critMod > 0) {
    return `d4+${critMod}`;
  } else {
    return `d4${critMod}`; // negative values already include the minus sign
  }
};

export const formatFumbleDie = (luckMod, luckySign) => {
  const fumbleMod = getFumbleMod(luckMod, luckySign);
  
  if (fumbleMod === 0 || fumbleMod === '') {
    return 'd4';
  } else if (fumbleMod > 0) {
    return `d4+${fumbleMod}`;
  } else {
    return `d4${fumbleMod}`; // negative values already include the minus sign
  }
};