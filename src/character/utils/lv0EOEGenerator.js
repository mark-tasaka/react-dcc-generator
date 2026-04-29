import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import characterSheetBg from '../img/lvZeroEOECharacterSheet.jpg';
import characterSheetLn from '../img/lvZeroEOECharacterSheetLandscape.jpg';
import RobotoRegular from '../../fonts/RobotoMono-Regular.ttf';
import RobotoBold    from '../../fonts/RobotoMono-Bold.ttf';
import InterBold     from '../../fonts/Inter-Bold.otf';    
import InterBlack    from '../../fonts/Inter-Black.otf';  
import {                                    // ← replaces dccOccupations import
  occupations,
  getOccupationNumber,                      // ← moved from local function
  getBirdType,                              // ← new
  getCartContents,   
  generateWealth,                       // ← new
} from './eoe/eoeOccupations.js';
import { generateEquipment} from './dccEquipment.js';
import { getLanguages } from './eoe/eoeLanguages.js';
import { 
  getBirthAugur,
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
} from './dccBirthAugurs.js';
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
import { getAlignment } from './alignment.js';
import { getGender, getNameGender } from './characterGender.js';
import { getName, getNameDescript } from './nameSelect.js';


Font.register({
  family: 'Monospace',
  fonts: [
    { src: `${window.location.origin}${RobotoRegular}`, fontWeight: 'normal' },
    { src: `${window.location.origin}${RobotoBold}`,    fontWeight: 'bold'   }
  ]
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: `${window.location.origin}${InterBold}`,  fontWeight: 'bold' },
    { src: `${window.location.origin}${InterBlack}`, fontWeight: 900    }
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
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Inter',     
  },
  largeText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Inter',     
  },
  testText: {
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'Inter',     
  },
  smallText: {
    fontSize: 8,
    color: 'black',
    fontFamily: 'Inter',     
  },
  xSmallText: {
    fontSize: 6,
    color: 'black',
    fontFamily: 'Inter',     
  },
  monoText: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Monospace',
  },

  name:       { position: 'absolute', top: 42,  left: 24  },
  gender:     { position: 'absolute', top: 42,  left: 150 },
  alignment:  { position: 'absolute', top: 65,  left: 24  },
  occupation: { position: 'absolute', top: 86,  left: 24  },
  critDie:    { position: 'absolute', top: 65,  left: 132 },
  fumble:     { position: 'absolute', top: 65,  left: 188 },
  
  str:  { position: 'absolute', top: 197, right: 222 },
  agi:  { position: 'absolute', top: 212, right: 222 },
  sta:  { position: 'absolute', top: 227, right: 222 },
  per:  { position: 'absolute', top: 244, right: 222 },
  int:  { position: 'absolute', top: 260, right: 222 },
  luck: { position: 'absolute', top: 275, right: 222 },

  strMod:  { position: 'absolute', top: 197, left: 86 },
  agiMod:  { position: 'absolute', top: 212, left: 86 },
  staMod:  { position: 'absolute', top: 227, left: 86 },
  perMod:  { position: 'absolute', top: 244, left: 86 },
  intMod:  { position: 'absolute', top: 260, left: 86 },
  luckMod: { position: 'absolute', top: 275, left: 86 },
  
  ac:            { position: 'absolute', top: 125, left: 52 }, 
  hp:            { position: 'absolute', top: 156, left: 55   },
  init:          { position: 'absolute', top: 115, left: 152  },
  melee:         { position: 'absolute', top: 134, left: 146  },
  missile:       { position: 'absolute', top: 147, left: 146  },
  meleeDamage:   { position: 'absolute', top: 134, left: 163  },
  missileDamage: { position: 'absolute', top: 147, left: 163  },
  
  reflex:    { position: 'absolute', top: 40, left: 244 },
  fortitude: { position: 'absolute', top: 40, left: 266 },
  will:      { position: 'absolute', top: 69, left: 244 },
  
  speed:      { position: 'absolute', top: 69,  left: 267              },
  wealth:     { position: 'absolute', top: 320, left: 58,  width: 80  },
  languages:  { position: 'absolute', top: 355, left: 40,  width: 80  },
  birthAugur: { position: 'absolute', top: 126, left: 203, width: 80  },
  weapon:           { position: 'absolute', top: 198, left: 130              },
  weaponDamage:     { position: 'absolute', top: 198, left: 250              }, 
  armour:           { position: 'absolute', top: 230, left: 125              },
  equipment:        { position: 'absolute', top: 262, left: 130 , width: 145  },
  message:          { position: 'absolute', top: 310, left: 140, width: 145 },
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
    fontFamily: 'Inter',     
  },
  largeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Inter',     
  },
  smallText: {
    fontSize: 10,
    color: 'black',
    fontFamily: 'Inter',     
  },
  xSmallText: {
    fontSize: 9,
    color: 'black',
    fontFamily: 'Inter',     
  },
  monoText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Monospace',
  },
  monoTextLrg: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Monospace',
  },

  name:       { position: 'absolute', top: 104,  left: 40  },
  gender:     { position: 'absolute', top: 104,  left: 190 },
  alignment:  { position: 'absolute', top: 131, left: 40  },
  occupation: { position: 'absolute', top: 161, left: 40  },
  critDie:    { position: 'absolute', top: 131, left: 170 },
  fumble:     { position: 'absolute', top: 131, left: 235 },
  
  str:  { position: 'absolute', top: 296, right: 288 },
  agi:  { position: 'absolute', top: 314, right: 288},
  sta:  { position: 'absolute', top: 334, right: 288},
  per:  { position: 'absolute', top: 354, right: 288},
  int:  { position: 'absolute', top: 374, right: 288 },
  luck: { position: 'absolute', top: 394, right: 288 },

  strMod:  { position: 'absolute', top: 296, left: 110 },
  agiMod:  { position: 'absolute', top: 314, left: 110 },
  staMod:  { position: 'absolute', top: 334, left: 110 },
  perMod:  { position: 'absolute', top: 354, left: 110 },
  intMod:  { position: 'absolute', top: 374, left: 110 },
  luckMod: { position: 'absolute', top: 394, left: 110 },
    
  ac:            { position: 'absolute', top: 208, right: 286 }, 
  hp:            { position: 'absolute', top: 245, left: 65   },
  init:          { position: 'absolute', top: 194, left: 195  },
  melee:         { position: 'absolute', top: 218, left: 182  },
  missile:       { position: 'absolute', top: 235, left: 182  },
  meleeDamage:   { position: 'absolute', top: 218, left: 205  },
  missileDamage: { position: 'absolute', top: 235, left: 205  },
  
  reflex:    { position: 'absolute', top: 103, left: 306 },
  fortitude: { position: 'absolute', top: 103, left: 335 },
  will:      { position: 'absolute', top: 139, left: 306 },
  
  speed:      { position: 'absolute', top: 140, left: 338              },
  wealth:     { position: 'absolute', top: 450, left: 70,  width: 40 },
  languages:  { position: 'absolute', top: 493, left: 53,  width: 110 },
  birthAugur: { position: 'absolute', top: 208, left: 256, width: 100 },
  weapon:           { position: 'absolute', top: 300, left: 165              },
  weaponDamage:     { position: 'absolute', top: 300, left: 310              }, 
  armour:           { position: 'absolute', top: 343, left: 165              },
  equipment:        { position: 'absolute', top: 378, left: 165, width: 185 },
  message:          { position: 'absolute', top: 440, left: 178, width: 180 },
});

// ── Helper: random name origin when "Random" (100) is selected ────────────

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
    alignment:    alignmentOption    = 1,
    gender:       genderOption       = 1,
    abilityScore: abilityScoreOption = 1,
    hitPoints:    hitPointsOption    = 1,
    givenName:    givenNameOption    = 100,
    surname:      surnameOption      = 100
  } = options;

  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

  // ── Occupation ────────────────────────────────────────────────────────
  const selectedOccupation = occupations[getOccupationNumber()];

  // ── Apply occupation-specific trade good modifiers ────────────────────
  const modifiedOccupation = { ...selectedOccupation };
  if (selectedOccupation.id === 13 || selectedOccupation.id === 14) {
    // Falconer & Farmer: append a random bird-beast type
    modifiedOccupation.tradeGood = `${selectedOccupation.tradeGood} ${getBirdType()}`;
  }
  if (selectedOccupation.id === 7) {
    // Cartwright: append random cart contents
    modifiedOccupation.tradeGood = `${selectedOccupation.tradeGood} ${getCartContents()}`;
  }

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

  // ── Birth augur ───────────────────────────────────────────────────────
  const birthAugur = getBirthAugur();
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
  const ac           = getAC(agiMod, luckMod, luckySign);
  const init         = getInit(agiMod, luckMod, luckySign);
  const melee        = strMod + meleeAttackLuckSign(luckMod, luckySign);
  const meleeDamage  = strMod + meleeDamageLuckSign(luckMod, luckySign);
  const missile      = agiMod + missileAttackLuckSign(luckMod, luckySign);
  const missileDamage = agiMod + missileDamageLuckSign(luckMod, luckySign);

  // ── Saves ─────────────────────────────────────────────────────────────
  const reflex    = agiMod + getRefLuckBonus(luckMod, luckySign);
  const fortitude = staMod + getFortLuckBonus(luckMod, luckySign);
  const will      = perMod + getWillLuckBonus(luckMod, luckySign);
  const speed     = getSpeed(agiMod, luckySign);

  // ── Crit / Fumble ─────────────────────────────────────────────────────
  const critDie = formatCritDie(luckMod, luckySign);
  const fumble  = 'd4' + formatFumbleDie(luckMod, luckySign);  // ← base d4, no occupation override

  // ── Alignment, equipment, notes ───────────────────────────────────────
  const alignment = getAlignment(alignmentOption);
  const equipment = generateEquipment(modifiedOccupation);     // ← uses modified trade good
  const message   = dieRollMethodText(abilityScoreOption) + hitPointsMethodText(hitPointsOption) + nameDescript;

  return {
    name:         characterName,
    gender:       gender,
    alignment:    alignment,
    occupation:   selectedOccupation.name,
    weapon:       selectedOccupation.weapon,
    weaponDamage: selectedOccupation.damage,
    equipment:    equipment,
    armour:       '',                                           // ← removed getArmour()
    stats: {
      str:  { value: str,  modifier: strMod  },
      agi:  { value: agi,  modifier: agiMod  },
      sta:  { value: sta,  modifier: staMod  },
      per:  { value: per,  modifier: perMod  },
      int:  { value: int,  modifier: intMod  },
      luck: { value: luck, modifier: luckMod }
    },
    hp:            hp,
    ac:            String(ac) + '(' + ac + ')',                 // ← removed getACBonusArmour()
    init:          init,
    melee:         melee,
    meleeDamage:   meleeDamage,
    missile:       missile,
    missileDamage: missileDamage,
    critDie:       critDie + ' / I',
    fumble:        fumble,
    reflex:        reflex,
    fortitude:     fortitude,
    will:          will,
    speed:         speed,
    birthAugur:    `${birthAugur.name}: ${birthAugur.effect}`,
    birthAugurData: birthAugur,
    wealth:        generateWealth() + ' cp',
    languages:     getLanguages(
      intMod,
      luckMod,
      luckySign
    ),
    message: message,
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
    
    <Text style={[styles.monoText, styles.str]}>{character.stats.str.value}</Text>
    <Text style={[styles.monoText, styles.strMod]}>({character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier})</Text>
    
    <Text style={[styles.monoText, styles.agi]}>{character.stats.agi.value}</Text>
    <Text style={[styles.monoText, styles.agiMod]}>({character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier})</Text>
    
    <Text style={[styles.monoText, styles.sta]}>{character.stats.sta.value}</Text>
    <Text style={[styles.monoText, styles.staMod]}>({character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier})</Text>
    
    <Text style={[styles.monoText, styles.per]}>{character.stats.per.value}</Text>
    <Text style={[styles.monoText, styles.perMod]}>({character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier})</Text>
    
    <Text style={[styles.monoText, styles.int]}>{character.stats.int.value}</Text>
    <Text style={[styles.monoText, styles.intMod]}>({character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier})</Text>
    
    <Text style={[styles.monoText, styles.luck]}>{character.stats.luck.value}</Text>
    <Text style={[styles.monoText, styles.luckMod]}>({character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier})</Text>
    
    <Text style={[styles.monoText, styles.ac]}>{character.ac}</Text>
    <Text style={[styles.monoText, styles.hp]}>{character.hp}</Text>
    <Text style={[styles.monoText, styles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[styles.monoText, styles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[styles.monoText, styles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    <Text style={[styles.monoText, styles.meleeDamage]}>{character.meleeDamage >= 0 ? '+' : ''}{character.meleeDamage}</Text>
    <Text style={[styles.monoText, styles.missileDamage]}>{character.missileDamage >= 0 ? '+' : ''}{character.missileDamage}</Text>
    
    <Text style={[styles.monoText, styles.reflex]}>{character.reflex >= 0 ? '+' : ''}{character.reflex}</Text>
    <Text style={[styles.monoText, styles.fortitude]}>{character.fortitude >= 0 ? '+' : ''}{character.fortitude}</Text>
    <Text style={[styles.monoText, styles.will]}>{character.will >= 0 ? '+' : ''}{character.will}</Text>
    
    <Text style={[styles.monoText,  styles.speed]}>{character.speed + "'"}</Text>
    <Text style={[styles.smallText,  styles.wealth]}>{character.wealth}</Text>
    <Text style={[styles.xSmallText,  styles.languages]}>{character.languages}</Text>
    <Text style={[styles.smallText,  styles.birthAugur]}>{character.birthAugur}</Text>
    <Text style={[styles.smallText,  styles.weapon]}>{character.weapon}</Text>
    <Text style={[styles.smallText,  styles.weaponDamage]}>{character.weaponDamage}</Text>
    <Text style={[styles.smallText,  styles.equipment]}>{character.equipment}</Text>
    <Text style={[styles.smallText,  styles.armour]}>{character.armour}</Text>
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
    
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.str]}>{character.stats.str.value}</Text>
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.strMod]}>({character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier})</Text>
    
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.agi]}>{character.stats.agi.value}</Text>
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.agiMod]}>({character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier})</Text>
    
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.sta]}>{character.stats.sta.value}</Text>
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.staMod]}>({character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier})</Text>
    
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.per]}>{character.stats.per.value}</Text>
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.perMod]}>({character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier})</Text>
    
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.int]}>{character.stats.int.value}</Text>
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.intMod]}>({character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier})</Text>
    
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.luck]}>{character.stats.luck.value}</Text>
    <Text style={[landscapeStyles.monoTextLrg, landscapeStyles.luckMod]}>({character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier})</Text>
    
    <Text style={[landscapeStyles.monoText, landscapeStyles.ac]}>{character.ac}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.hp]}>{character.hp}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.meleeDamage]}>{character.meleeDamage >= 0 ? '+' : ''}{character.meleeDamage}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.missileDamage]}>{character.missileDamage >= 0 ? '+' : ''}{character.missileDamage}</Text>
    
    <Text style={[landscapeStyles.monoText, landscapeStyles.reflex]}>{character.reflex >= 0 ? '+' : ''}{character.reflex}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.fortitude]}>{character.fortitude >= 0 ? '+' : ''}{character.fortitude}</Text>
    <Text style={[landscapeStyles.monoText, landscapeStyles.will]}>{character.will >= 0 ? '+' : ''}{character.will}</Text>
    
    <Text style={[landscapeStyles.text,  landscapeStyles.speed]}>{character.speed + "'"}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.wealth]}>{character.wealth}</Text>
    <Text style={[landscapeStyles.xSmallText,  landscapeStyles.languages]}>{character.languages}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.birthAugur]}>{character.birthAugur}</Text>
    <Text style={[landscapeStyles.xSmallText,  landscapeStyles.weapon]}>{character.weapon}</Text>
    <Text style={[landscapeStyles.xSmallText,  landscapeStyles.weaponDamage]}>{character.weaponDamage}</Text>
    <Text style={[landscapeStyles.xSmallText,  landscapeStyles.equipment]}>{character.equipment}</Text>
    <Text style={[landscapeStyles.smallText,  landscapeStyles.armour]}>{character.armour}</Text>
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