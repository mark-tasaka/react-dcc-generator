
export const getLanguages = (intMod, luckMod, luckySign) => {
  let bonusLanguages = 0;
  let languages = 'Common';

  // Calculate bonus languages from intelligence modifier
  if (intMod > 0) {
    bonusLanguages += intMod;
  }

  // Add luck bonus if lucky sign is 28
  if (luckySign === 28 && luckMod > 0) {
    bonusLanguages += luckMod;
  }

  if (bonusLanguages === 1) {
    languages += ' & 1 additional language';
  } else if (bonusLanguages > 1) {
    languages += ' & ' + bonusLanguages + ' additional languages';
  }

  return languages;
};