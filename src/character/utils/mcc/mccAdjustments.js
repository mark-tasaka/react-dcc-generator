export const addSign = (modifier) => {
  if (modifier > 0)  return `+${modifier}`;
  if (modifier === 0) return '';
  return `${modifier}`;   // negative numbers already include '-' via template literal
};


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
  { id: 2, weapon: 'Stone axe',          damage: '1d7' },
  { id: 3, weapon: 'Stone-tipped spear', damage: '1d6' },
  { id: 4, weapon: 'Wooden club',        damage: '1d5' },
  { id: 5, weapon: 'Blowgun & 12 darts', damage: '1d3' },
  { id: 6, weapon: 'Bow & 12 arrows',    damage: '1d6' },
  { id: 7, weapon: 'Leather sling',      damage: '1d4' },
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

// Private helpers — not exported

const getMutantAppearance = () => {
  const appearance = [
    { mutation: 'Skin colour: bright red' },
    { mutation: 'Skin colour: snow white' },
    { mutation: 'Skin colour: lemon yellow' },
    { mutation: 'Skin colour: purple' },
    { mutation: 'Skin colour: green' },
    { mutation: 'Skin colour: translucent' },
    { mutation: 'Skin texture: is mottled' },
    { mutation: 'Skin texture: is reptilian' },
    { mutation: 'Skin texture: is chitinous' },
    { mutation: 'Skin texture: is rocky' },
    { mutation: 'Skin texture: is metallic' },
    { mutation: 'Skin texture: is invisible' },
    { mutation: 'Eyes: have slitted pupils' },
    { mutation: 'Eyes: have no pupils' },
    { mutation: 'Eyes: glow in the dark' },
    { mutation: 'Eyes: are a single eye' },
    { mutation: 'Eyes: have compound insect eyes' },
    { mutation: 'Eyes: are covered by semi-transparent skin' },
    { mutation: 'Mouth: is fanged' },
    { mutation: 'Mouth: a featureless slit' },
    { mutation: 'Mouth: a beak or bill' },              // typo fixed: 'break' → 'beak'
    { mutation: 'Mouth: is insectoid' },
    { mutation: 'Mouth: located in belly' },
    { mutation: 'Mouth: absent, replaced by porous skin' },
    { mutation: 'Head: is larger than normal' },
    { mutation: 'Head: is smaller than normal' },
    { mutation: 'Head: has craggy brow and ridged skull' },
    { mutation: 'Head: has small horns' },
    { mutation: 'Head: has antennae' },                 // typo fixed: 'antennaw' → 'antennae'
    { mutation: 'Head: retreats into body' },
    { mutation: 'Hair: stands on end' },
    { mutation: "Hair: grows into a lion's mane" },
    { mutation: 'Hair: grows over entire body' },
    { mutation: 'Hair: drips oil' },
    { mutation: 'Hair: is made of organic metal' },
    { mutation: 'Hair: is comprised of small leaves' },
    { mutation: 'Hands: have no nails' },
    { mutation: 'Hands: have only three fingers' },
    { mutation: 'Hands: have six fingers' },
    { mutation: 'Hands: are prehensile claws' },
    { mutation: 'Hands: are comprised of tentacles' },
    { mutation: 'Hands: absent, replaced with tentacle fingers' },
    { mutation: 'Feet: are overlarge and padded' },
    { mutation: 'Feet: have 12 toes' },
    { mutation: 'Feet: have claws' },
    { mutation: 'Feet: are bird talons' },
    { mutation: 'Feet: are hooves' },
    { mutation: 'Feet: absent, replaced with cilia clumps' },
    { mutation: 'Body: has a tail' },
    { mutation: 'Body: has four arms' },
    { mutation: 'Body: has four legs' },
    { mutation: 'Body: has ridged back' },
    { mutation: 'Body: has symbiotic twin in stomach' },
    { mutation: 'Body: is segmented like a worm' },
    { mutation: 'Form: is tripedal' },
    { mutation: 'Form: is quadrapedal' },
    { mutation: 'Form: is serpentine' },
    { mutation: 'Form: is insectoid' },
    { mutation: 'Form: is globular' },
    { mutation: 'Form: is a condensed ball of plasma that must inhabit clothes to maintain form' },
  ];
  return appearance[Math.floor(Math.random() * 60)];
};

const getPlantient = () => {
  const subType = [
    { features: 'Deciduous: maple' },      
    { features: 'Deciduous: oak' },
    { features: 'Deciduous: sycamore' },
    { features: 'Deciduous: buckeye' },
    { features: 'Deciduous: chestnut' },
    { features: 'Conifer: cedar' },
    { features: 'Conifer: larch' },
    { features: 'Conifer: fir' },
    { features: 'Conifer: pine' },
    { features: 'Conifer: spruce' },
    { features: 'Conifer: yew' },
    { features: 'Fruit-Bearing: apple' },
    { features: 'Fruit-Bearing: pear' },
    { features: 'Fruit-Bearing: peach' },
    { features: 'Fruit-Bearing: cherry' },
    { features: 'Fruit-Bearing: plum' },
    { features: 'Fruit-Bearing: banana' },
    { features: 'Fern: horsetail' },
    { features: 'Fern: whisk fern' },
    { features: 'Fern: marratoid' },
    { features: 'Vine: ivy' },
    { features: 'Vine: honeysuckle' },
    { features: 'Vine: arrowroot' },
    { features: 'Vine: morning glory' },
    { features: 'Vine: grape' },
    { features: 'Vine: sweet pea' },
    { features: 'Shrub: sagebrush' },
    { features: 'Shrub: hibiscus' },
    { features: 'Shrub: blackberry' },
    { features: 'Shrub: huckleberry' },
    { features: 'Shrub: sumac' },
    { features: 'Shrub: yucca' },
    { features: 'Tropical: palm' },
    { features: 'Tropical: coconut' },
    { features: 'Tropical: bamboo' },
    { features: 'Tropical: teak' },
    { features: 'Cacti: barrel' },
    { features: 'Cacti: beavertail' },
    { features: 'Cacti: aloe' },
    { features: 'Cacti: prickly pear' },
    { features: 'Mosses: green moss' },
    { features: 'Mosses: liverwort' },
    { features: 'Mosses: hornwort' },
    { features: 'Fungi: mushroom' },
    { features: 'Fungi: toadstool' },
    { features: 'Fungi: fungus' },
    { features: 'Fungi: mold' },
  ];
  return subType[Math.floor(Math.random() * 47)];
};

const getManimalType = () => {
  const subType = [
    { features: 'Primate: gorilla' },
    { features: 'Primate: chimpanzee' },
    { features: 'Primate: orangutan' },
    { features: 'Primate: gibbon' },
    { features: 'Canine: dog' },
    { features: 'Canine: wolf' },
    { features: 'Canine: coyote' },
    { features: 'Canine: fox' },
    { features: 'Feline: lion' },
    { features: 'Feline: tiger' },
    { features: 'Feline: cheetah' },
    { features: 'Feline: panther' },
    { features: 'Ursine: brown bear' },
    { features: 'Ursine: grizzly bear' },
    { features: 'Ursine: polar bear' },
    { features: 'Bovine: cow' },
    { features: 'Bovine: bison' },
    { features: 'Bovine: buffalo' },
    { features: 'Bovine: antelope' },
    { features: 'Bovine: yak' },
    { features: 'Suidae: pig' },
    { features: 'Suidae: hog' },
    { features: 'Suidae: warthog' },                   // typo fixed: 'wartog' → 'warthog'
    { features: 'Rodentia: mouse' },
    { features: 'Rodentia: rat' },
    { features: 'Rodentia: squirrel' },
    { features: 'Rodentia: porcupine' },
    { features: 'Rodentia: beaver' },
    { features: 'Rodentia: rabbit' },
    { features: 'Amphibia: frog' },
    { features: 'Amphibia: toad' },
    { features: 'Amphibia: salamander' },
    { features: 'Avian: hawk' },
    { features: 'Avian: eagle' },
    { features: 'Avian: crow' },
    { features: 'Avian: owl' },
    { features: 'Avian: vulture' },
    { features: 'Avian: seagull' },
    { features: 'Insecta: roach' },
    { features: 'Insecta: ant' },
    { features: 'Insecta: fly' },
    { features: 'Insecta: grasshopper' },
    { features: 'Insecta: beetle' },
    { features: 'Insecta: moth' },
  ];
  return subType[Math.floor(Math.random() * 44)];
};

// Roll 0-29.  On 28-29 a second trait is appended (separated by \n for PDF).
// Pure Strain Human returns '' — no physical quirk generated.
export const getPhysicalDescription = (character) => {
  const appearanceRoll = Math.floor(Math.random() * 30);
  let appearance = '';

  if (character === 'Mutant' && appearanceRoll <= 27) {
    appearance = getMutantAppearance().mutation;
  } else if (character === 'Mutant' && appearanceRoll >= 28) {
    appearance = getMutantAppearance().mutation + '\n' + getMutantAppearance().mutation;
  } else if (character === 'Manimal' && appearanceRoll <= 27) {
    appearance = getManimalType().features;
  } else if (character === 'Manimal' && appearanceRoll >= 28) {
    appearance = getManimalType().features + '\n' + getMutantAppearance().mutation;
  } else if (character === 'Plantient' && appearanceRoll <= 28) {
    appearance = getPlantient().features;
  } else if (character === 'Plantient' && appearanceRoll >= 29) {
    appearance = getManimalType().features + '\n' + getMutantAppearance().mutation;
  }

  return appearance;
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