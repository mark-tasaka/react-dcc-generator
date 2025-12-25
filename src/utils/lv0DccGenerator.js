import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import characterSheetBg from '../character/img/lvZeroCharacterSheet.jpg';
import characterSheetLn from '../character/img/lvZeroCharacterSheetLandscape.jpg';
import { 
  occupations, 
  getArmour, 
  getACBonusArmour,
  getOccupationNumber,
  getOccupationFumbleDie } from './dccOccupations.js';
import { generateEquipment, generateWealth } from './dccEquipment';
import { getLanguages, formatLanguages } from './dccLanguages.js';
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
import { getNotes, dieRollMethodText, hitPointsMethodText } from './dccNotes.js';
import { getAlignment } from './alignment.js';
import { getGender, getNameGender } from './characterGender.js';

const genders = ['Male', 'Female'];

const names = {
  male: ['Aelar', 'Aerdrom', 'Ahvak', 'Aramil', 'Aranear', 'Berris', 'Cithreth', 'Dayereth', 'Drannor', 'Eckhart',
         'Evendur', 'Galinndan', 'Hadarai', 'Halimath', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Korfel', 'Lamlis'],
  female: ['Adrie', 'Ahanna', 'Aramara', 'Aranea', 'Berris', 'Caelynn', 'Carric', 'Dayereth', 'Enna', 'Galinndan',
           'Hadarai', 'Halimath', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Korfel', 'Lada', 'Lamlis', 'Wade']
};

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
  // Adjusted positioning to better align with the background
  topLeft: { top: '0%', left: '0%' },
  topRight: { top: '0%', left: '50%' },
  bottomLeft: { top: '50%', left: '0%' },
  bottomRight: { top: '50%', left: '50%' },
  
  text: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  largeText: {
    fontSize: 12,
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
  
  // Position styles for form fields
  name: { position: 'absolute', top: 32, left: 30 },
  gender: { position: 'absolute', top: 32, left: 155 },
  alignment: { position: 'absolute', top: 57, left: 30 },
  occupation: { position: 'absolute', top: 80, left: 30 },
  critDie: { position: 'absolute', top: 57, left: 125 },
  fumble: { position: 'absolute', top: 57, left: 180 },
  
  // Stats positioning - VALUES (left side)
  str: { position: 'absolute', top: 199, left: 66 },
  agi: { position: 'absolute', top: 215, left: 66 },
  sta: { position: 'absolute', top: 231, left: 66 },
  per: { position: 'absolute', top: 246, left: 66 },
  int: { position: 'absolute', top: 263, left: 66 },
  luck: { position: 'absolute', top: 279, left: 66 },
  
  // Stats positioning - MODIFIERS (right side)
  strMod: { position: 'absolute', top: 199, left: 82 },
  agiMod: { position: 'absolute', top: 215, left: 82 },
  staMod: { position: 'absolute', top: 231, left: 82 },
  perMod: { position: 'absolute', top: 246, left: 82 },
  intMod: { position: 'absolute', top: 263, left: 82 },
  luckMod: { position: 'absolute', top: 279, left: 82 },
  
  // Combat stats - Convert right positioning to left for container compatibility
  ac: { position: 'absolute', top: 122, right: 230}, 
  hp: { position: 'absolute', top: 155, left: 32 },
  init: { position: 'absolute', top: 110, left: 142},
  melee: { position: 'absolute', top: 130, left: 132 },
  missile: { position: 'absolute', top: 142, left: 132 },
  meleeDamage: { position: 'absolute', top: 130, left: 152 },
  missileDamage: { position: 'absolute', top: 142, left: 152 },
  
  // Saves - Convert right positioning to left for container compatibility
  reflex: { position: 'absolute', top: 35, left: 235 },    // Converted from right: 65
  fortitude: { position: 'absolute', top: 35, left: 265 }, // Converted from right: 35
  will: { position: 'absolute', top: 69, left: 235 },      // Converted from right: 65
  
  // Other fields - Convert right positioning to left for container compatibility
  speed: { position: 'absolute', top: 69, left: 265 },     // Converted from right: 30
  wealth: { position: 'absolute', top: 319, left: 25, width: 80 },
  languages: { position: 'absolute', top: 345, left: 25, width: 80  },
  birthAugur: { position: 'absolute', top: 120, left: 203, width: 80 },
  weapon: { position: 'absolute', top: 183, left: 125 },
  weaponDamage: { position: 'absolute', top: 183, left: 240 }, 
  armour: { position: 'absolute', top: 230, left: 125 },
  equipment: { position: 'absolute', top: 256, left: 125 },
  notes: { position: 'absolute', top: 303, left: 125 , width: 155},
  message: { position: 'absolute', top: 350, left: 125 , width: 155},
});

//landscape styles
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
  // Landscape positioning for 2 characters (side-by-side)
  leftHalf: { top: '0%', left: '0%' },   
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
    fontSize: 8,
    color: 'black',
  },
  
  // Position styles for landscape layout (you'll need to adjust these based on your landscape background)
  name: { position: 'absolute', top: 32, left: 30 },
  gender: { position: 'absolute', top: 32, left: 155 },
  alignment: { position: 'absolute', top: 57, left: 30 },
  occupation: { position: 'absolute', top: 80, left: 30 },
  critDie: { position: 'absolute', top: 57, left: 125 },
  fumble: { position: 'absolute', top: 57, left: 180 },
  
  // Stats positioning - VALUES (left side)
  str: { position: 'absolute', top: 199, left: 66 },
  agi: { position: 'absolute', top: 215, left: 66 },
  sta: { position: 'absolute', top: 231, left: 66 },
  per: { position: 'absolute', top: 246, left: 66 },
  int: { position: 'absolute', top: 263, left: 66 },
  luck: { position: 'absolute', top: 410, left: 90 },
  
  // Stats positioning - MODIFIERS (right side)
  strMod: { position: 'absolute', top: 199, left: 82 },
  agiMod: { position: 'absolute', top: 215, left: 82 },
  staMod: { position: 'absolute', top: 231, left: 82 },
  perMod: { position: 'absolute', top: 246, left: 82 },
  intMod: { position: 'absolute', top: 263, left: 82 },
  luckMod: { position: 'absolute', top: 279, left: 82 },
  
  // Combat stats (adjust these for landscape layout)
  ac: { position: 'absolute', top: 122, left: 235 }, 
  hp: { position: 'absolute', top: 155, left: 32 },
  init: { position: 'absolute', top: 110, left: 142 },
  melee: { position: 'absolute', top: 219, left: 175 },
  missile: { position: 'absolute', top: 237, left: 175 },
  meleeDamage: { position: 'absolute', top: 219, left: 198 },
  missileDamage: { position: 'absolute', top: 237, left: 198 },
  
  // Saves (adjust for landscape)
  reflex: { position: 'absolute', top: 100, left: 300 },
  fortitude: { position: 'absolute', top: 100, left: 340 },
  will: { position: 'absolute', top: 140, left: 300 },
  
  // Other fields (adjust for landscape)
  speed: { position: 'absolute', top: 140, left: 345 },
  wealth: { position: 'absolute', top: 460, left: 30, width: 110 },
  languages: { position: 'absolute', top: 490, left: 30, width: 110 },
  birthAugur: { position: 'absolute', top: 202, left: 260, width: 100 },
  weapon: { position: 'absolute', top: 288, left: 165 },
  weaponDamage: { position: 'absolute', top: 288, left: 310 }, 
  armour: { position: 'absolute', top: 230, left: 210 },
  equipment: { position: 'absolute', top: 378, left: 165 },
  notes: { position: 'absolute', top: 440, left: 165, width: 190 },
  message: { position: 'absolute', top: 550, right: 40 },
});

// Generate random character
export const generateRandomCharacter = (options = {}) => {
  const {
    alignment: alignmentOption = 1,
    sex: sexOption = 1,
    abilityScore: abilityScoreOption = 1,
    hitPoints: hitPointsOption = 1,
    occupations: occupationsOption = 1
  } = options;

  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

  const selectedOccupation = occupations[getOccupationNumber(occupationsOption)];
  const gender = getGender(sexOption); 
  const nameGenderIndex = getNameGender(gender);
  const nameList = nameGenderIndex === 0 ? names.male : names.female;
    
  // Use the selected ability score method
  const str = rollAbilityScores(abilityScoreOption);
  const agi = rollAbilityScores(abilityScoreOption);
  const sta = rollAbilityScores(abilityScoreOption);
  const per = rollAbilityScores(abilityScoreOption);
  const int = rollAbilityScores(abilityScoreOption);
  const luck = rollAbilityScores(abilityScoreOption);

  // Get modifiers using DCC rules
  const strMod = getAbilityModifier(str);
  const agiMod = getAbilityModifier(agi);
  const staMod = getAbilityModifier(sta);
  const perMod = getAbilityModifier(per);
  const intMod = getAbilityModifier(int);
  const luckMod = getAbilityModifier(luck);

  // Get birth augur
  const birthAugur = getBirthAugur();
  const luckySign = birthAugur.id;

  // Calculate hit points based on selection
  let baseHp;
  if (hitPointsOption === 2) {
    // Max hit points (4 before modifiers)
    baseHp = 4 + staMod + getHitPointLuck(luckMod, luckySign);
  } else {
    // Normal 1d4 hit points
    baseHp = rollDice(4) + staMod + getHitPointLuck(luckMod, luckySign);
  }
  const hp = minHitPoints(baseHp);
  
  const ac = getAC(agiMod, luckMod, luckySign);
  const init = getInit(agiMod, luckMod, luckySign);
  const melee = strMod + meleeAttackLuckSign(luckMod, luckySign);
  const meleeDamage = strMod + meleeDamageLuckSign(luckMod, luckySign);
  const missile = agiMod + missileAttackLuckSign(luckMod, luckySign);
  const missileDamage = agiMod + missileDamageLuckSign(luckMod, luckySign);
  
  const reflex = agiMod + getRefLuckBonus(luckMod, luckySign);
  const fortitude = staMod + getFortLuckBonus(luckMod, luckySign);
  const will = perMod + getWillLuckBonus(luckMod, luckySign);
  const speed = getSpeed(agiMod, luckySign);

  const critDie = formatCritDie(luckMod, luckySign);
  const fumble = getOccupationFumbleDie(selectedOccupation.id) + formatFumbleDie(luckMod, luckySign);

  const alignment = getAlignment(alignmentOption); // Use selected alignment option
  const notes = getNotes(selectedOccupation.id);
  const equipment = generateEquipment(selectedOccupation);
  const armour = getArmour(selectedOccupation.id);
  const message = dieRollMethodText(abilityScoreOption) + hitPointsMethodText(hitPointsOption);

  
  return {
    name: nameList[Math.floor(Math.random() * nameList.length)] + ' ' + 
          nameList[Math.floor(Math.random() * nameList.length)] + 'son',
    gender: gender,
    alignment: alignment,
    occupation: selectedOccupation.name,
    race: selectedOccupation.race,
    weapon: selectedOccupation.weapon,
    weaponDamage: selectedOccupation.damage,
    equipment: equipment,
    armour: armour,
    stats: {
      str: { value: str, modifier: strMod },
      agi: { value: agi, modifier: agiMod },
      sta: { value: sta, modifier: staMod },
      per: { value: per, modifier: perMod },
      int: { value: int, modifier: intMod },
      luck: { value: luck, modifier: luckMod }
    },
    hp: hp,
    ac: ac + getACBonusArmour(selectedOccupation.id) + ' (' + ac + ')',
    init: init,
    melee: melee,
    meleeDamage: meleeDamage,
    missile: missile,
    missileDamage: missileDamage,
    critDie: critDie + ' / I',
    fumble: fumble,
    reflex: reflex,
    fortitude: fortitude,
    will: will,
    speed: speed,
    birthAugur: `${birthAugur.name}: ${birthAugur.effect}`,
    birthAugurData: birthAugur,
    wealth: generateWealth(selectedOccupation), 
    languages: formatLanguages(getLanguages(
      intMod, 
      luckMod, 
      luckySign, 
      selectedOccupation.race, 
      alignment, 
      int
    )),
    notes: notes,
    message: message
  };
};


// Character component for positioning data on the sheet
const Character = ({ character, position }) => (
  <View style={[styles.characterContainer, position]}>
    <Text style={[styles.text, styles.name]}>{character.name}</Text>
    <Text style={[styles.text, styles.gender]}>{character.gender}</Text>
    <Text style={[styles.text, styles.alignment]}>{character.alignment}</Text>
    <Text style={[styles.text, styles.occupation]}>{character.occupation}</Text>
    <Text style={[styles.text, styles.critDie]}>{character.critDie}</Text>
    <Text style={[styles.text, styles.fumble]}>{character.fumble}</Text>
    
    {/* Stats - Values and Modifiers separated */}
    <Text style={[styles.text, styles.str]}>{character.stats.str.value}</Text>
    <Text style={[styles.text, styles.strMod]}>({character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier})</Text>
    
    <Text style={[styles.text, styles.agi]}>{character.stats.agi.value}</Text>
    <Text style={[styles.text, styles.agiMod]}>({character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier})</Text>
    
    <Text style={[styles.text, styles.sta]}>{character.stats.sta.value}</Text>
    <Text style={[styles.text, styles.staMod]}>({character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier})</Text>
    
    <Text style={[styles.text, styles.per]}>{character.stats.per.value}</Text>
    <Text style={[styles.text, styles.perMod]}>({character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier})</Text>
    
    <Text style={[styles.text, styles.int]}>{character.stats.int.value}</Text>
    <Text style={[styles.text, styles.intMod]}>({character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier})</Text>
    
    <Text style={[styles.text, styles.luck]}>{character.stats.luck.value}</Text>
    <Text style={[styles.text, styles.luckMod]}>({character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier})</Text>
    
    {/* Combat Stats */}
    <Text style={[styles.text, styles.ac]}>{character.ac}</Text>
    <Text style={[styles.text, styles.hp]}>{character.hp}</Text>
    <Text style={[styles.text, styles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[styles.text, styles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[styles.text, styles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    <Text style={[styles.text, styles.meleeDamage]}>{character.meleeDamage >= 0 ? '+' : ''}{character.meleeDamage}</Text>
    <Text style={[styles.text, styles.missileDamage]}>{character.missileDamage >= 0 ? '+' : ''}{character.missileDamage}</Text>
    
    {/* Saves */}
    <Text style={[styles.largeText, styles.reflex]}>{character.reflex >= 0 ? '+' : ''}{character.reflex}</Text>
    <Text style={[styles.largeTextWhite, styles.fortitude]}>{character.fortitude >= 0 ? '+' : ''}{character.fortitude}</Text>
    <Text style={[styles.largeTextWhite, styles.will]}>{character.will >= 0 ? '+' : ''}{character.will}</Text>
    
    {/* Other */}
    <Text style={[styles.largeText, styles.speed]}>{character.speed + "'"}</Text>
    <Text style={[styles.smallText, styles.wealth]}>{character.wealth}</Text>
    <Text style={[styles.smallText, styles.languages]}>{character.languages}</Text>
    <Text style={[styles.smallText, styles.birthAugur]}>{character.birthAugur}</Text>
    <Text style={[styles.smallText, styles.weapon]}>{character.weapon}</Text>
    <Text style={[styles.smallText, styles.weaponDamage]}>{character.weaponDamage}</Text>
    <Text style={[styles.smallText, styles.equipment]}>{character.equipment}</Text>
    <Text style={[styles.smallText, styles.armour]}>{character.armour}</Text>
    <Text style={[styles.smallText, styles.notes]}>{character.notes}</Text>
    <Text style={[styles.xSmallText, styles.message]}>{character.message}</Text>
  </View>
);

const LandscapeCharacter = ({ character, position }) => (
  <View style={[landscapeStyles.characterContainer, position]}>
    <Text style={[landscapeStyles.text, landscapeStyles.name]}>{character.name}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.gender]}>{character.gender}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.alignment]}>{character.alignment}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.occupation]}>{character.occupation}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.critDie]}>{character.critDie}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.fumble]}>{character.fumble}</Text>
    
    {/* Stats - Values and Modifiers separated */}
    <Text style={[landscapeStyles.largeText, landscapeStyles.str]}>{character.stats.str.value}</Text>
    <Text style={[landscapeStyles.largeText, landscapeStyles.strMod]}>({character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier})</Text>
    
    <Text style={[landscapeStyles.largeText, landscapeStyles.agi]}>{character.stats.agi.value}</Text>
    <Text style={[landscapeStyles.largeText, landscapeStyles.agiMod]}>({character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier})</Text>
    
    <Text style={[landscapeStyles.largeText, landscapeStyles.sta]}>{character.stats.sta.value}</Text>
    <Text style={[landscapeStyles.largeText, landscapeStyles.staMod]}>({character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier})</Text>
    
    <Text style={[landscapeStyles.largeText, landscapeStyles.per]}>{character.stats.per.value}</Text>
    <Text style={[landscapeStyles.largeText, landscapeStyles.perMod]}>({character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier})</Text>
    
    <Text style={[landscapeStyles.largeText, landscapeStyles.int]}>{character.stats.int.value}</Text>
    <Text style={[landscapeStyles.largeText, landscapeStyles.intMod]}>({character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier})</Text>
    
    <Text style={[landscapeStyles.largeText, landscapeStyles.luck]}>{character.stats.luck.value}</Text>
    <Text style={[landscapeStyles.largeText, landscapeStyles.luckMod]}>({character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier})</Text>
    
    {/* Combat Stats */}
    <Text style={[landscapeStyles.text, landscapeStyles.ac]}>{character.ac}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.hp]}>{character.hp}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.meleeDamage]}>{character.meleeDamage >= 0 ? '+' : ''}{character.meleeDamage}</Text>
    <Text style={[landscapeStyles.text, landscapeStyles.missileDamage]}>{character.missileDamage >= 0 ? '+' : ''}{character.missileDamage}</Text>
    
    {/* Saves */}
    <Text style={[landscapeStyles.largeText, landscapeStyles.reflex]}>{character.reflex >= 0 ? '+' : ''}{character.reflex}</Text>
    <Text style={[landscapeStyles.largeTextWhite, landscapeStyles.fortitude]}>{character.fortitude >= 0 ? '+' : ''}{character.fortitude}</Text>
    <Text style={[landscapeStyles.largeTextWhite, landscapeStyles.will]}>{character.will >= 0 ? '+' : ''}{character.will}</Text>
    
    {/* Other */}
    <Text style={[landscapeStyles.largeText, landscapeStyles.speed]}>{character.speed + "'"}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.wealth]}>{character.wealth}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.languages]}>{character.languages}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.birthAugur]}>{character.birthAugur}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.weapon]}>{character.weapon}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.weaponDamage]}>{character.weaponDamage}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.equipment]}>{character.equipment}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.armour]}>{character.armour}</Text>
    <Text style={[landscapeStyles.smallText, landscapeStyles.notes]}>{character.notes}</Text>
    <Text style={[landscapeStyles.xSmallText, landscapeStyles.message]}>{character.message}</Text>
  </View>
);

// PDF Document component
export const CharacterSheetDocument = ({ characters }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <Image style={styles.backgroundImage} src={characterSheetBg} />
      
      {characters.length > 0 && (
        <Character character={characters[0]} position={styles.topLeft} />
      )}
      {characters.length > 1 && (
        <Character character={characters[1]} position={styles.topRight} />
      )}
      {characters.length > 2 && (
        <Character character={characters[2]} position={styles.bottomLeft} />
      )}
      {characters.length > 3 && (
        <Character character={characters[3]} position={styles.bottomRight} />
      )}
    </Page>
  </Document>
);

export const CharacterSheetLandscapeDocument = ({ characters }) => (
  <Document>
    <Page size="LETTER" orientation="landscape" style={landscapeStyles.page}>
      <Image style={landscapeStyles.backgroundImage} src={characterSheetLn} />
      
      {characters.length > 0 && (
        <LandscapeCharacter character={characters[0]} position={landscapeStyles.leftHalf} />
      )}
      {characters.length > 1 && (
        <LandscapeCharacter character={characters[1]} position={landscapeStyles.rightHalf} />
      )}
    </Page>
  </Document>
);

export const generateFourCharacters = (options = {}) => {
  const characters = [];
  for (let i = 0; i < 4; i++) {
    characters.push(generateRandomCharacter(options));
  }
  return characters;
};

export const generateTwoCharacters = (options = {}) => {
  const characters = [];
  for (let i = 0; i < 2; i++) {
    characters.push(generateRandomCharacter(options));
  }
  return characters;
};