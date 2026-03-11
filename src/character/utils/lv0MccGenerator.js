import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import characterSheetBg from '../img/lvZeroMccCharacterSheet.jpg';
import characterSheetLn from '../img/lvZeroMccCharacterSheetLandscape.jpg';
import {
  getMccBirthAugur,
  getSpeed,
  getInit,
  getAC,
  getHitPointLuck,
  getRefLuckBonus,
  getFortLuckBonus,
  getWillLuckBonus,
  meleeAttackLuckSign,
  missileAttackLuckSign,
  meleeDamageLuckSign,
  missileDamageLuckSign,
} from './mccLuckySign.js';
import {
  minHitPoints,
  formatCritDie,
  formatFumbleDie,
  getAbilityModifier,
} from './statistics.js';
import {
  rollAbilityScores,
} from './abilityScoreGen.js';
import { dieRollMethodText, hitPointsMethodText } from './dccNotes.js';
import { getArchaicAlignment } from './archaicAlignment.js';
import { getGender, getNameGender } from './characterGender.js';
import { getName, getNameDescript } from './nameSelect.js';
import {
  getGenotype,
  getProfession,
  addRandomWeapon,
  addItem,
  getMccArmourRoll,
  getMccArmour,
  getArmourACBonus,
  getArmourACBonusString,
  getArmourFumbleDie,
  getBaseLanguages,
  getBonusLanguages,
  getMaxTechLevel,
} from './mccAdjustments.js';

Font.register({
  family: 'Roboto Mono',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vrtROW4.woff2',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Xvs_ROW4.woff2',
      fontWeight: 'bold',
    }
  ]
});

// Complete PDF Styles
const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  characterContainer: {
    position: 'absolute',
    width: '50%',
    height: '50%',
  },
  topLeft:     { top: '0%',  left: '0%'  },
  topRight:    { top: '0%',  left: '48%' },
  bottomLeft:  { top: '48%', left: '0%'  },
  bottomRight: { top: '48%', left: '48%' },

  text: {
    fontSize: 8,
    color: 'black',
    fontWeight: 'bold',
  },
  textTest: {
    fontSize: 8,
    color: 'red',
    fontWeight: 'bold',
  },
  mediumText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
  },
  largeTextWhite: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  testText: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 8,
    color: 'black',
  },
  xSmallText: {
    fontSize: 6,
    color: 'black',
  },

  name:       { position: 'absolute', top: 48,  left: 42  },
  gender:     { position: 'absolute', top: 48,  left: 138 },
  alignment:  { position: 'absolute', top: 68,  left: 125 },
  occupation: { position: 'absolute', top: 48,  left: 175 },
  critDie:    { position: 'absolute', top: 93,  left: 46  },
  fumble:     { position: 'absolute', top: 93,  left: 190 },

  str:  { position: 'absolute', top: 116, right: 135 },
  agi:  { position: 'absolute', top: 131, right: 135 },
  sta:  { position: 'absolute', top: 147, right: 135 },
  per:  { position: 'absolute', top: 162, right: 135 },
  int:  { position: 'absolute', top: 177, right: 135 },
  luck: { position: 'absolute', top: 193, right: 135 },

  strMod:  { position: 'absolute', top: 116, left: 175 },
  agiMod:  { position: 'absolute', top: 131, left: 175 },
  staMod:  { position: 'absolute', top: 147, left: 175 },
  perMod:  { position: 'absolute', top: 162, left: 175 },
  intMod:  { position: 'absolute', top: 177, left: 175 },
  luckMod: { position: 'absolute', top: 193, left: 175 },

  ac:            { position: 'absolute', top: 115, right: 196 },
  hp:            { position: 'absolute', top: 144, right: 200 },
  init:          { position: 'absolute', top: 110, left: 142 },
  melee:         { position: 'absolute', top: 183, left: 70 },
  missile:       { position: 'absolute', top: 195, left: 70 },
  meleeDamage:   { position: 'absolute', top: 183, left: 95 },
  missileDamage: { position: 'absolute', top: 195, left: 95 },

  reflex:    { position: 'absolute', top: 35, left: 235 },
  fortitude: { position: 'absolute', top: 35, left: 265 },
  will:      { position: 'absolute', top: 69, left: 235 },

  speed:            { position: 'absolute', top: 69,  left: 265 },
  wealth:           { position: 'absolute', top: 319, left: 25,  width: 80  },
  languages:        { position: 'absolute', top: 120, left: 217, width: 70  },
  birthAugur:       { position: 'absolute', top: 175, left: 217, width: 70  },
  weapon:           { position: 'absolute', top: 240, left: 28,  width: 100 },
  weaponDamage:     { position: 'absolute', top: 240, left: 113 },
  armour:           { position: 'absolute', top: 285, left: 28  },
  armourACBonus:    { position: 'absolute', top: 285, left: 98  },
  armourFumbleBase: { position: 'absolute', top: 285, left: 120 },
  equipment:        { position: 'absolute', top: 315, left: 28,  width: 120 },
  maxTechLevel:     { position: 'absolute', top: 93,  left: 155 },
  notes:            { position: 'absolute', top: 303, left: 125, width: 155 },
  message:          { position: 'absolute', bottom: 40, left: 125, width: 145 },
});

// Landscape styles
const landscapeStyles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  characterContainer: {
    position: 'absolute',
    width: '50%',
    height: '100%',
  },
  leftHalf:  { top: '0%', left: '0%'  },
  rightHalf: { top: '0%', left: '50%' },

  text: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  largeTextWhite: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
    color: 'black',
  },
  xSmallText: {
    fontSize: 7,
    color: 'black',
  },

  name:       { position: 'absolute', top: 97,  left: 40  },
  gender:     { position: 'absolute', top: 97,  left: 200 },
  alignment:  { position: 'absolute', top: 127, left: 40  },
  occupation: { position: 'absolute', top: 155, left: 40  },
  critDie:    { position: 'absolute', top: 127, left: 160 },
  fumble:     { position: 'absolute', top: 127, left: 230 },

  str:  { position: 'absolute', top: 307, left: 75, width: 25 },
  agi:  { position: 'absolute', top: 326, left: 75, width: 25 },
  sta:  { position: 'absolute', top: 346, left: 75, width: 25 },
  per:  { position: 'absolute', top: 367, left: 75, width: 25 },
  int:  { position: 'absolute', top: 388, left: 75, width: 25 },
  luck: { position: 'absolute', top: 408, left: 75, width: 25 },

  strMod:  { position: 'absolute', top: 307, left: 107, width: 35 },
  agiMod:  { position: 'absolute', top: 326, left: 107, width: 35 },
  staMod:  { position: 'absolute', top: 346, left: 107, width: 35 },
  perMod:  { position: 'absolute', top: 367, left: 107, width: 35 },
  intMod:  { position: 'absolute', top: 388, left: 107, width: 35 },
  luckMod: { position: 'absolute', top: 408, left: 107, width: 35 },

  ac:            { position: 'absolute', top: 210, right: 293 },
  hp:            { position: 'absolute', top: 253, left: 46  },
  init:          { position: 'absolute', top: 195, left: 185 },
  melee:         { position: 'absolute', top: 219, left: 175, width: 35 },
  missile:       { position: 'absolute', top: 237, left: 175, width: 35 },
  meleeDamage:   { position: 'absolute', top: 219, left: 198, width: 35 },
  missileDamage: { position: 'absolute', top: 237, left: 198, width: 35 },

  reflex:    { position: 'absolute', top: 100, left: 300 },
  fortitude: { position: 'absolute', top: 100, left: 340 },
  will:      { position: 'absolute', top: 140, left: 300 },

  speed:            { position: 'absolute', top: 140, left: 345 },
  wealth:           { position: 'absolute', top: 460, left: 30,  width: 110 },
  languages:        { position: 'absolute', top: 490, left: 30,  width: 110 },
  birthAugur:       { position: 'absolute', top: 202, left: 260, width: 100 },
  weapon:           { position: 'absolute', top: 288, left: 165 },
  weaponDamage:     { position: 'absolute', top: 288, left: 310 },
  armour:           { position: 'absolute', top: 343, left: 165 },
  armourACBonus:    { position: 'absolute', top: 343, left: 200 },
  armourFumbleBase: { position: 'absolute', top: 343, left: 200 },
  equipment:        { position: 'absolute', top: 378, left: 165, width: 190 },
  maxTechLevel:     { position: 'absolute', top: 343, left: 165 },
  notes:            { position: 'absolute', top: 440, left: 165, width: 190 },
  message:          { position: 'absolute', top: 488, left: 165, width: 190 },
});

// Helper: random name origin index when "Random" (100) is selected
const getRandomNameOrigin = (type) => {
  if (type === 'given') {
    return Math.floor(Math.random() * 50);
  } else {
    return Math.floor(Math.random() * 38);
  }
};

// ── Generate random character ─────────────────────────────────────────────

export const generateRandomCharacter = (options = {}) => {
  const {
    alignment: alignmentOption = 1,
    gender: genderOption = 1,
    abilityScore: abilityScoreOption = 1,
    hitPoints: hitPointsOption = 1,
    givenName: givenNameOption = 100,
    surname: surnameOption = 100
  } = options;

  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

  // ── Species & Profession ──────────────────────────────────────────────
  const species    = getGenotype();
  const profession = getProfession();

  // ── Weapon: use profession weapon when available, else random ─────────
  let weaponName, weaponDamage;
  if (profession.weapon) {
    weaponName   = profession.weapon;
    weaponDamage = profession.damage;
  } else {
    const randomWeapon = addRandomWeapon();
    weaponName   = randomWeapon.weapon;
    weaponDamage = randomWeapon.damage;
  }

  // ── Equipment ─────────────────────────────────────────────────────────
  const extraItem      = addItem();
  const equipmentParts = [profession.equipment, extraItem.item].filter(Boolean);
  const equipment      = equipmentParts.join(', ');

  // ── Armour ────────────────────────────────────────────────────────────
  const armourItem       = getMccArmourRoll();
  const armourName       = getMccArmour(armourItem);
  const armourACBonusStr = getArmourACBonusString(armourItem);
  const acBonus          = getArmourACBonus(armourItem);
  const armourFumbleBase = getArmourFumbleDie(armourItem);   // '' when no armour
  const fumbleBase       = armourFumbleBase || 'd4';         // d4 default for calculation only

  // ── Name ──────────────────────────────────────────────────────────────
  const gender          = getGender(genderOption);
  const nameGenderIndex = getNameGender(gender);

  let actualGivenName = givenNameOption;
  let actualSurname   = surnameOption;

  if (givenNameOption === 100) actualGivenName = getRandomNameOrigin('given');
  if (surnameOption   === 100) actualSurname   = getRandomNameOrigin('surname');

  const characterName = getName(actualGivenName, actualSurname, nameGenderIndex);
  const nameDescript  = getNameDescript(actualGivenName, actualSurname);

  // ── Ability scores ────────────────────────────────────────────────────
  const str  = rollAbilityScores(abilityScoreOption);
  const agi  = rollAbilityScores(abilityScoreOption);
  const sta  = rollAbilityScores(abilityScoreOption);
  const per  = rollAbilityScores(abilityScoreOption);
  const int  = rollAbilityScores(abilityScoreOption);
  const luck = rollAbilityScores(abilityScoreOption);

  const strMod  = getAbilityModifier(str);
  const agiMod  = getAbilityModifier(agi);
  const staMod  = getAbilityModifier(sta);
  const perMod  = getAbilityModifier(per);
  const intMod  = getAbilityModifier(int);
  const luckMod = getAbilityModifier(luck);

  // ── Lucky sign ────────────────────────────────────────────────────────
  const birthAugur = getMccBirthAugur();
  const luckySign  = birthAugur.id;

  // ── Hit points ────────────────────────────────────────────────────────
  let baseHp;
  if (hitPointsOption === 2) {
    baseHp = 4 + staMod + getHitPointLuck(luckMod, luckySign);
  } else {
    baseHp = rollDice(4) + staMod + getHitPointLuck(luckMod, luckySign);
  }
  const hp = minHitPoints(baseHp);

  // ── Combat stats ──────────────────────────────────────────────────────
  const baseAC     = getAC(agiMod, luckMod, luckySign);
  const init       = getInit(agiMod, luckMod, luckySign);
  const melee      = strMod + meleeAttackLuckSign(luckMod, luckySign);
  const meleeDmg   = strMod + meleeDamageLuckSign(luckMod, luckySign);
  const missile    = agiMod + missileAttackLuckSign(luckMod, luckySign);
  const missileDmg = agiMod + missileDamageLuckSign(luckMod, luckySign);

  // ── Saves ─────────────────────────────────────────────────────────────
  const reflex    = agiMod + getRefLuckBonus(luckMod, luckySign);
  const fortitude = staMod + getFortLuckBonus(luckMod, luckySign);
  const will      = perMod + getWillLuckBonus(luckMod, luckySign);
  const speed     = getSpeed(luckMod, luckySign);

  // ── Crit / Fumble ─────────────────────────────────────────────────────
  const critDie = formatCritDie(luckMod, luckySign);
  const fumble  = fumbleBase + formatFumbleDie(luckMod, luckySign);

  // ── Alignment & Languages ─────────────────────────────────────────────
  const alignment = getArchaicAlignment(alignmentOption, species);
  const languages = getBaseLanguages(species, int) + getBonusLanguages(int);

  // ── Max Tech Level & Message ──────────────────────────────────────────
  const maxTechLevel = getMaxTechLevel(int);
  const message      = dieRollMethodText(abilityScoreOption) + hitPointsMethodText(hitPointsOption) + nameDescript;

  return {
    name:         characterName,
    gender:       gender,
    alignment:    alignment,
    occupation:   profession.role,
    race:         species,
    weapon:       weaponName,
    weaponDamage: weaponDamage,
    equipment:    equipment,
    armour:       armourName,
    stats: {
      str:  { value: str,  modifier: strMod  },
      agi:  { value: agi,  modifier: agiMod  },
      sta:  { value: sta,  modifier: staMod  },
      per:  { value: per,  modifier: perMod  },
      int:  { value: int,  modifier: intMod  },
      luck: { value: luck, modifier: luckMod }
    },
    hp:            hp,
    ac:            String(baseAC + acBonus) + ' (' + baseAC + ')',
    init:          init,
    melee:         melee,
    meleeDamage:   meleeDmg,
    missile:       missile,
    missileDamage: missileDmg,
    critDie:       critDie + ' / I',
    fumble:        fumble,
    reflex:        reflex,
    fortitude:     fortitude,
    will:          will,
    speed:         speed,
    birthAugur:    `${birthAugur.name}: ${birthAugur.effect}`,
    birthAugurData: birthAugur,
    wealth:        '',
    languages:     languages,
    notes:         '',
    maxTechLevel:  maxTechLevel,
    message:       message,
    armourFumbleBase: armourFumbleBase,
    armourACBonus: armourACBonusStr,
  };
};


// ── Portrait layout — 4-up ────────────────────────────────────────────────

const Character = ({ character, position }) => (
  <View style={[styles.characterContainer, position]}>
    <Text style={[styles.text, styles.name]}>{character.name}</Text>
    <Text style={[styles.text, styles.gender]}>{character.gender}</Text>
    <Text style={[styles.text, styles.alignment]}>{character.alignment}</Text>
    <Text style={[styles.text, styles.occupation]}>{character.occupation}</Text>
    <Text style={[styles.text, styles.critDie]}>{character.critDie}</Text>
    <Text style={[styles.text, styles.fumble]}>{character.fumble}</Text>

    <Text style={[styles.mediumText, styles.str]}>{character.stats.str.value}</Text>
    <Text style={[styles.mediumText, styles.strMod]}>({character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier})</Text>

    <Text style={[styles.mediumText, styles.agi]}>{character.stats.agi.value}</Text>
    <Text style={[styles.mediumText, styles.agiMod]}>({character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier})</Text>

    <Text style={[styles.mediumText, styles.sta]}>{character.stats.sta.value}</Text>
    <Text style={[styles.mediumText, styles.staMod]}>({character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier})</Text>

    <Text style={[styles.mediumText, styles.per]}>{character.stats.per.value}</Text>
    <Text style={[styles.mediumText, styles.perMod]}>({character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier})</Text>

    <Text style={[styles.mediumText, styles.int]}>{character.stats.int.value}</Text>
    <Text style={[styles.mediumText, styles.intMod]}>({character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier})</Text>

    <Text style={[styles.mediumText, styles.luck]}>{character.stats.luck.value}</Text>
    <Text style={[styles.mediumText, styles.luckMod]}>({character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier})</Text>

    <Text style={[styles.largeText, styles.ac]}>{character.ac}</Text>
    <Text style={[styles.largeText, styles.hp]}>{character.hp}</Text>
    <Text style={[styles.text,       styles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[styles.mediumText, styles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[styles.mediumText, styles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    <Text style={[styles.mediumText, styles.meleeDamage]}>{character.meleeDamage >= 0 ? '+' : ''}{character.meleeDamage}</Text>
    <Text style={[styles.mediumText, styles.missileDamage]}>{character.missileDamage >= 0 ? '+' : ''}{character.missileDamage}</Text>

    <Text style={[styles.largeText,      styles.reflex]}>{character.reflex >= 0 ? '+' : ''}{character.reflex}</Text>
    <Text style={[styles.largeTextWhite, styles.fortitude]}>{character.fortitude >= 0 ? '+' : ''}{character.fortitude}</Text>
    <Text style={[styles.largeTextWhite, styles.will]}>{character.will >= 0 ? '+' : ''}{character.will}</Text>

    <Text style={[styles.largeText,  styles.speed]}>{character.speed + "'"}</Text>
    <Text style={[styles.smallText,  styles.wealth]}>{character.wealth}</Text>
    <Text style={[styles.smallText,  styles.languages]}>{character.languages}</Text>
    <Text style={[styles.smallText,  styles.birthAugur]}>{character.birthAugur}</Text>
    <Text style={[styles.smallText,  styles.weapon]}>{character.weapon}</Text>
    <Text style={[styles.smallText,  styles.weaponDamage]}>{character.weaponDamage}</Text>
    <Text style={[styles.smallText,  styles.equipment]}>{character.equipment}</Text>
    <Text style={[styles.smallText,  styles.armour]}>{character.armour}</Text>
    <Text style={[styles.smallText,  styles.armourACBonus]}>{character.armourACBonus}</Text>
    <Text style={[styles.smallText,  styles.armourFumbleBase]}>{character.armourFumbleBase}</Text>
    <Text style={[styles.text,       styles.maxTechLevel]}>{character.maxTechLevel}</Text>
    <Text style={[styles.smallText,  styles.notes]}>{character.notes}</Text>
    <Text style={[styles.xSmallText, styles.message]}>{character.message}</Text>
  </View>
);

// ── Landscape layout — 2-up ───────────────────────────────────────────────

const LandscapeCharacter = ({ character, position }) => (
  <View style={[landscapeStyles.characterContainer, position]}>
    <Text style={[landscapeStyles.text, landscapeStyles.name]}>{character.name}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.gender]}>{character.gender}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.alignment]}>{character.alignment}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.occupation]}>{character.occupation}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.critDie]}>{character.critDie}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.fumble]}>{character.fumble}</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.str]}>{character.stats.str.value}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.strMod]}>({character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier})</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.agi]}>{character.stats.agi.value}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.agiMod]}>({character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier})</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.sta]}>{character.stats.sta.value}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.staMod]}>({character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier})</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.per]}>{character.stats.per.value}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.perMod]}>({character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier})</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.int]}>{character.stats.int.value}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.intMod]}>({character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier})</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.luck]}>{character.stats.luck.value}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.luckMod]}>({character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier})</Text>

    <Text style={[landscapeStyles.text, landscapeStyles.ac]}>{character.ac}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.hp]}>{character.hp}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.meleeDamage]}>{character.meleeDamage >= 0 ? '+' : ''}{character.meleeDamage}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.missileDamage]}>{character.missileDamage >= 0 ? '+' : ''}{character.missileDamage}</Text>

    <Text style={[landscapeStyles.largeText,      landscapeStyles.reflex]}>{character.reflex >= 0 ? '+' : ''}{character.reflex}</Text>
    <Text style={[landscapeStyles.largeTextWhite, landscapeStyles.fortitude]}>{character.fortitude >= 0 ? '+' : ''}{character.fortitude}</Text>
    <Text style={[landscapeStyles.largeTextWhite, landscapeStyles.will]}>{character.will >= 0 ? '+' : ''}{character.will}</Text>

    <Text style={[landscapeStyles.largeText,  landscapeStyles.speed]}>{character.speed + "'"}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.wealth]}>{character.wealth}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.languages]}>{character.languages}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.birthAugur]}>{character.birthAugur}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.weapon]}>{character.weapon}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.weaponDamage]}>{character.weaponDamage}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.equipment]}>{character.equipment}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.armour]}>{character.armour}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.armourACBonus]}>{character.armourACBonus}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.armourFumbleBase]}>{character.armourFumbleBase}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.maxTechLevel]}>{character.maxTechLevel}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.notes]}>{character.notes}</Text>
    <Text style={[landscapeStyles.xSmallText, landscapeStyles.message]}>{character.message}</Text>
  </View>
);

// ── PDF Document components ───────────────────────────────────────────────

export const CharacterSheetDocument = ({ characters }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <Image style={styles.backgroundImage} src={characterSheetBg} />
      {characters.length > 0 && <Character character={characters[0]} position={styles.topLeft}     />}
      {characters.length > 1 && <Character character={characters[1]} position={styles.topRight}    />}
      {characters.length > 2 && <Character character={characters[2]} position={styles.bottomLeft}  />}
      {characters.length > 3 && <Character character={characters[3]} position={styles.bottomRight} />}
    </Page>
  </Document>
);

export const CharacterSheetLandscapeDocument = ({ characters }) => (
  <Document>
    <Page size="LETTER" orientation="landscape" style={landscapeStyles.page}>
      <Image style={landscapeStyles.backgroundImage} src={characterSheetLn} />
      {characters.length > 0 && <LandscapeCharacter character={characters[0]} position={landscapeStyles.leftHalf}  />}
      {characters.length > 1 && <LandscapeCharacter character={characters[1]} position={landscapeStyles.rightHalf} />}
    </Page>
  </Document>
);

export const generateFourCharacters = (options = {}) => {
  const characters = [];
  for (let i = 0; i < 4; i++) characters.push(generateRandomCharacter(options));
  return characters;
};

export const generateTwoCharacters = (options = {}) => {
  const characters = [];
  for (let i = 0; i < 2; i++) characters.push(generateRandomCharacter(options));
  return characters;
};