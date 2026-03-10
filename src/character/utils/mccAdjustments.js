// mccAdjustments.js

// ── Genotype ──────────────────────────────────────────────────────────────

export const getGenotype = () => {
  const roll = Math.floor(Math.random() * 100);
  if (roll <= 31) return 'Pure Strain Human';
  if (roll <= 65) return 'Mutant';
  if (roll <= 87) return 'Manimal';
  return 'Plantient';
};

// ── Languages ─────────────────────────────────────────────────────────────

export const getBaseLanguages = (species, intelligence) => {
  let baseLanguage = 'Nu-Speak';
  if (species === 'Manimal' && intelligence >= 8) {
    baseLanguage = 'Nu-Speak, Manimal dialect';
  } else if (species === 'Plantient' && intelligence >= 8) {
    baseLanguage = 'Nu-Speak, Plantient dialect';
  }
  return baseLanguage;
};

export const getBonusLanguages = (intelligence) => {
  if (intelligence >= 13 && intelligence <= 15) return ' & 1 additional language';
  if (intelligence >= 16 && intelligence <= 17) return ' & 2 additional languages';
  if (intelligence === 18)                       return ' & 3 additional languages';
  return '';
};

// ── Profession ────────────────────────────────────────────────────────────

const professionData = [
  { role: 'Hunter',   weapon: 'Wood spear', damage: '1d5', equipment: ''                  },
  { role: 'Gatherer', weapon: '',           damage: '',    equipment: 'Large leather sack' },
];

export const getProfession = () => {
  return professionData[Math.floor(Math.random() * professionData.length)];
};

// ── Weapons ───────────────────────────────────────────────────────────────

const weaponData = [
  { id: 1, weapon: 'Bone club',          damage: '1d6' },
  { id: 2, weapon: 'Flint dagger',       damage: '1d4' },
  { id: 3, weapon: 'Stone axe',          damage: '1d7' },
  { id: 4, weapon: 'Stone-tipped spear', damage: '1d6' },
  { id: 5, weapon: 'Wooden club',        damage: '1d5' },
  { id: 6, weapon: 'Blowgun & 12 darts', damage: '1d3' },
  { id: 7, weapon: 'Bow & 12 arrows',    damage: '1d6' },
  { id: 8, weapon: 'Leather sling',      damage: '1d4' },
];

export const addRandomWeapon = () => {
  return weaponData[Math.floor(Math.random() * weaponData.length)];
};

// Weapon damage modifier — strMod: Strength modifier;
// meleeDamageBonus / missileDamageBonus: lucky-sign bonuses
export const randomWeaponDamage = (weapon, strMod, meleeDamageBonus, missileDamageBonus) => {
  const rangedWeapons = ['Blowgun & 12 darts', 'Bow & 12 arrows', 'Leather sling'];
  const isRanged = rangedWeapons.includes(weapon.weapon);
  const bonus = isRanged ? missileDamageBonus : strMod + meleeDamageBonus;
  return bonus >= 0 ? `+${bonus}` : `${bonus}`;
};

// ── Equipment Items ───────────────────────────────────────────────────────

const itemData = [
  { id: 1,  item: '' },
  { id: 2,  item: '' },
  { id: 3,  item: '' },
  { id: 4,  item: '' },
  { id: 5,  item: 'Flint fire starter' },
  { id: 6,  item: 'Hemp rope, 50 ft.' },
  { id: 7,  item: 'Jerked roxen meat' },
  { id: 8,  item: 'Leather rucksack' },
  { id: 9,  item: 'Torch (x3)' },
  { id: 10, item: 'Bone necklace' },
  { id: 11, item: 'Conch shell trumpet' },
  { id: 12, item: 'Magic sticky rock (loadstone)' },
  { id: 13, item: 'Paints & dyes' },
  { id: 14, item: 'Bag of sea shells' },
  { id: 15, item: 'Small shiny thing (trinket non-functional artifact)' },
  { id: 16, item: 'Large shiny thing (trinket non-functional artifact)' },
  { id: 17, item: 'A telepathic rat (pet)/1d3 attacks' },
];

export const addItem = () => {
  return itemData[Math.floor(Math.random() * itemData.length)];
};

// ── Armour ────────────────────────────────────────────────────────────────

// id 1-4 = armour type; id 5-6 = no armour
export const getMccArmourRoll = () => {
  return { id: Math.floor(Math.random() * 6) + 1 };
};

export const getMccArmour = (item) => {
  if (item.id === 1) return 'Fur cloak';
  if (item.id === 2) return 'Hide armour';
  if (item.id === 3) return 'Leather shield';
  if (item.id === 4) return 'Antler hood';
  return '';
};

export const getArmourACBonus = (item) => {
  if (item.id === 1) return 2;
  if (item.id === 2) return 3;
  if (item.id === 3 || item.id === 4) return 1;
  return 0;
};

export const getArmourACBonusString = (item) => {
  if (item.id === 1) return '+2';
  if (item.id === 2) return '+3';
  if (item.id === 3 || item.id === 4) return '+1';
  return '';
};

// Returns '' for no armour — use to test whether the character is unarmoured
export const getFumble = (item) => {
  if (item.id === 1) return 'd8';
  if (item.id === 2) return 'd12';
  if (item.id === 3 || item.id === 4) return 'd8';
  return '';
};

// Returns 'd4' as default when no armour is worn
export const getFumbleDie = (item) => {
  if (item.id === 1) return 'd8';
  if (item.id === 2) return 'd12';
  if (item.id === 3 || item.id === 4) return 'd8';
  return 'd4';
};

// Returns '' when no armour — caller applies its own default
export const getArmourFumbleDie = (item) => {
  if (item.id === 1) return 'd8';
  if (item.id === 2) return 'd12';
  if (item.id === 3 || item.id === 4) return 'd8';
  return '';
};

// ── Physical Description ──────────────────────────────────────────────────
// TODO: implement once getMutantAppearance(), getManimalType(), getPlantient()
// are available in separate files.

export const getPhysicalDescription = (character) => {
  const appearanceRoll = Math.floor(Math.random() * 30); // eslint-disable-line no-unused-vars
  return '';
};

// ── Max Tech Level ────────────────────────────────────────────────────────

export const getMaxTechLevel = (intelligence) => {
  if (intelligence >= 3  && intelligence <= 7)  return 1;
  if (intelligence >= 8  && intelligence <= 9)  return 2;
  if (intelligence >= 10 && intelligence <= 11) return 3;
  if (intelligence >= 12 && intelligence <= 14) return 4;
  if (intelligence >= 15 && intelligence <= 17) return 5;
  if (intelligence >= 18 && intelligence <= 23) return 6;
  return 7;
};

// ── Hit Point Adjust Per Level ────────────────────────────────────────────

export const hitPointAdjustPerLevel = (luckySign, luckModifier) => {
  let adjust = 0;
  if (luckySign !== undefined && luckySign.luckySign === 'The Ecobot') {
    adjust = luckModifier;
  }
  return adjust;
};