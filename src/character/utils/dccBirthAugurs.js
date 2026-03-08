// Birth Augur data
const luckySignData = [
  { id: 0, name: "Harsh winter", effect: "All attack rolls" },
  { id: 1, name: "The bull", effect: "Melee attack rolls" },
  { id: 2, name: "Fortunate date", effect: "Missile fire attack rolls" },
  { id: 3, name: "Raised by wolves", effect: "Unarmed attack rolls" },
  { id: 4, name: "Conceived on horseback", effect: "Mounted attack rolls" },
  { id: 5, name: "Born on the battlefield", effect: "Damage rolls" },
  { id: 6, name: "Path of the bear", effect: "Melee damage rolls" },
  { id: 7, name: "Hawkeye", effect: "Missile damage rolls" },
  { id: 8, name: "Pack hunter", effect: "Attack & damage rolls for 0-level starting weapon" },
  { id: 9, name: "Born under the loom", effect: "Skill checks" },
  { id: 10, name: "Fox's cunning", effect: "Find/disable traps" },
  { id: 11, name: "Four-leafed clover", effect: "Find secret doors" },
  { id: 12, name: "Seventh son", effect: "Spell checks" },
  { id: 13, name: "The raging storm", effect: "Spell damage" },
  { id: 14, name: "Righteous heart", effect: "Turn unholy checks" },
  { id: 15, name: "Survived the plague", effect: "Magical healing" },
  { id: 16, name: "Luck sign", effect: "Saving throws" },
  { id: 17, name: "Guardian angel", effect: "Saving throws to escape traps" },
  { id: 18, name: "Survived a spider bite", effect: "Saving throws against poison" },
  { id: 19, name: "Struck by Lightning", effect: "Reflex saving throws" },
  { id: 20, name: "Lived through famine", effect: "Fortitude saving throws" },
  { id: 21, name: "Resisted temptation", effect: "Will saving throws" },
  { id: 22, name: "Charmed house", effect: "Armour class" },
  { id: 23, name: "Speed of the Cobra", effect: "Initiative" },
  { id: 24, name: "Bountiful Harvest", effect: "Hits points/each level" },
  { id: 25, name: "Warrior's arm", effect: "Critical hit tables" },
  { id: 26, name: "Unholy house", effect: "Corruption rolls" },
  { id: 27, name: "The Broken Star", effect: "Fumbles" },
  { id: 28, name: "Birdsong", effect: "Number of Languages" },
  { id: 29, name: "Wild child", effect: "Speed" }
];

export const getLuckySign = (input) => {
  return luckySignData[input];
};

export const getBirthAugur = () => {
  const select = Math.floor(Math.random() * 30);
  return getLuckySign(select);
};

export const getSpeed = (luckMod, luckySign) => {
  const speedBonus = 5 * luckMod;
  let baseSpeed = 30;

  if (luckySign === 29) {
    baseSpeed += speedBonus;
  }

  return baseSpeed;
};

export const getCritMod = (luckMod, luckySign) => {
  const modBonus = 2 * luckMod;
  let bonus = luckMod;

  if (luckySign === 25) {
    bonus = modBonus;
  }

  return bonus || '';
};

export const getFumbleMod = (luckMod, luckySign) => {
  const modBonus = 2 * luckMod;
  let bonus = luckMod;

  if (luckySign === 27) {
    bonus = modBonus;
  }

  return bonus || '';
};

export const getInit = (agiMod, luckMod, luckySign) => {
  let bonus = agiMod;

  if (luckySign === 23) {
    bonus += luckMod;
  }

  return bonus;
};

export const getAC = (agiMod, luckMod, luckySign) => {
  let bonus = 10 + agiMod;

  if (luckySign === 22) {
    bonus += luckMod;
  }

  return bonus;
};

export const getHitPointLuck = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 24) {
    bonus += luckMod;
  }

  return bonus;
};

export const getRefLuckBonus = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 16 || luckySign === 19) {
    bonus += luckMod;
  }

  return bonus;
};

export const getFortLuckBonus = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 16 || luckySign === 20) {
    bonus += luckMod;
  }

  return bonus;
};

export const getWillLuckBonus = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 16 || luckySign === 21) {
    bonus += luckMod;
  }

  return bonus;
};

export const meleeAttackLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 0 || luckySign === 1) {
    bonus += luckMod;
  }

  return bonus;
};

export const missileAttackLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 0 || luckySign === 2) {
    bonus += luckMod;
  }

  return bonus;
};

export const meleeDamageLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 5 || luckySign === 6) {
    bonus += luckMod;
  }

  return bonus;
};

export const missileDamageLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 5 || luckySign === 7) {
    bonus += luckMod;
  }

  return bonus;
};

// Legacy export for backward compatibility
export const birthAugurs = luckySignData.map(sign => `${sign.name}: ${sign.effect}`);