// mccLuckySign.js

// MCC Lucky Sign data
const mccLuckySignData = [
  { id: 0,  name: "Nuclear Winter",          effect: "All attack rolls" },
  { id: 1,  name: "The Roxen",               effect: "All melee attack rolls" },
  { id: 2,  name: "The Triffid",             effect: "Missile fire attack rolls" },
  { id: 3,  name: "The Beast",               effect: "Unarmed attack rolls" },
  { id: 4,  name: "The Millisteed",          effect: "Mounted attack rolls" },
  { id: 5,  name: "The Apocalypse",          effect: "All damage rolls" },
  { id: 6,  name: "Ragnarok",                effect: "Melee damage rolls" },
  { id: 7,  name: "Revelations",             effect: "Missile damage rolls" },
  { id: 8,  name: "The Hunter",              effect: "Attack & damage rolls 0-level starting weapons" },
  { id: 9,  name: "The Gatherer",            effect: "Stealth/hiding rolls" },
  { id: 10, name: "The Outsider",            effect: "Find/disable traps" },
  { id: 11, name: "The Sensor",              effect: "Find secret doors" },
  { id: 12, name: "The Genomorph",           effect: "Mutation checks" },
  { id: 13, name: "The Alpha Striker",       effect: "Mutation damage rolls" },
  { id: 14, name: "The Programmer",          effect: "AI recognition rolls" },
  { id: 15, name: "The Hypospray",           effect: "Healing rolls" },
  { id: 16, name: "The Survivor",            effect: "All Saving throws" },
  { id: 17, name: "The Multitool",           effect: "Escape traps" },
  { id: 18, name: "The Healer",              effect: "Saving throws against poison" },
  { id: 19, name: "The Scientist",           effect: "Reflex saving throws" },
  { id: 20, name: "The Glow",               effect: "Fortitude saving throws" },
  { id: 21, name: "The Esper",              effect: "Willpower saving throws" },
  { id: 22, name: "The Bunker",             effect: "Armour class" },
  { id: 23, name: "The CPU",               effect: "Initiative" },
  { id: 24, name: "The Ecobot",            effect: "Hit points/each level" },
  { id: 25, name: "The War-Bot",           effect: "Critical hit tables (double luck mod)" },
  { id: 26, name: "The Unchanging",        effect: "Defect rolls" },
  { id: 27, name: "The Backup Disk",       effect: "Fumbles (double luck mod)" },
  { id: 28, name: "The Universal Translator", effect: "Number of Languages" },
  { id: 29, name: "The Accelerant",        effect: "Speed" }
];

export const getMccLuckySign = (input) => {
  return mccLuckySignData[input];
};

export const getMccBirthAugur = () => {
  const select = Math.floor(Math.random() * 30);
  return getMccLuckySign(select);
};

// ── Combat stat modifiers ──────────────────────────────────────────────────

export const getSpeed = (luckMod, luckySign) => {
  const speedBonus = 5 * luckMod;
  let baseSpeed = 30;

  if (luckySign === 29) {   // The Accelerant
    baseSpeed += speedBonus;
  }

  return baseSpeed;
};

export const getCritMod = (luckMod, luckySign) => {
  const modBonus = 2 * luckMod;
  let bonus = luckMod;

  if (luckySign === 25) {   // The War-Bot
    bonus = modBonus;
  }

  return bonus || '';
};

export const getFumbleMod = (luckMod, luckySign) => {
  const modBonus = 2 * luckMod;
  let bonus = luckMod;

  if (luckySign === 27) {   // The Backup Disk
    bonus = modBonus;
  }

  return bonus || '';
};

export const getInit = (agiMod, luckMod, luckySign) => {
  let bonus = agiMod;

  if (luckySign === 23) {   // The CPU
    bonus += luckMod;
  }

  return bonus;
};

export const getAC = (agiMod, luckMod, luckySign) => {
  let bonus = 10 + agiMod;

  if (luckySign === 22) {   // The Bunker
    bonus += luckMod;
  }

  return bonus;
};

export const getHitPointLuck = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 24) {   // The Ecobot
    bonus += luckMod;
  }

  return bonus;
};

// ── Saving throw luck bonuses ──────────────────────────────────────────────

export const getRefLuckBonus = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 16 || luckySign === 19) {   // The Survivor | The Scientist
    bonus += luckMod;
  }

  return bonus;
};

export const getFortLuckBonus = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 16 || luckySign === 20) {   // The Survivor | The Glow
    bonus += luckMod;
  }

  return bonus;
};

export const getWillLuckBonus = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 16 || luckySign === 21) {   // The Survivor | The Esper
    bonus += luckMod;
  }

  return bonus;
};

// ── Attack & damage luck bonuses ───────────────────────────────────────────

export const meleeAttackLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 0 || luckySign === 1) {   // Nuclear Winter | The Roxen
    bonus += luckMod;
  }

  return bonus;
};

export const missileAttackLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 0 || luckySign === 2) {   // Nuclear Winter | The Triffid
    bonus += luckMod;
  }

  return bonus;
};

export const meleeDamageLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 5 || luckySign === 6) {   // The Apocalypse | Ragnarok
    bonus += luckMod;
  }

  return bonus;
};

export const missileDamageLuckSign = (luckMod, luckySign) => {
  let bonus = 0;

  if (luckySign === 5 || luckySign === 7) {   // The Apocalypse | Revelations
    bonus += luckMod;
  }

  return bonus;
};