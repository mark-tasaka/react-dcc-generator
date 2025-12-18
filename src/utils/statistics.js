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

// Converted PHP functions
export const getAbilityModifier = (score) => {
  if (score === 3) {
    return -3;
  } else if (score >= 4 && score <= 5) {
    return -2;
  } else if (score >= 6 && score <= 8) {
    return -1;
  } else if (score >= 9 && score <= 12) {
    return 0;
  } else if (score >= 13 && score <= 15) {
    return 1;
  } else if (score >= 16 && score <= 17) {
    return 2;
  } else if (score === 18) {
    return 3;
  }
  
  return 0; // fallback for unexpected values
};
