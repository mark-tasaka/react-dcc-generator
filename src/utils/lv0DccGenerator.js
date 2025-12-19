import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import characterSheetBg from '../character/img/lvZeroCharacterSheet.jpg';
import { occupations, getACBonusArmour } from './dccOccupations.js';
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
import { getNotes, dieRollMethodText, hitPointsMethodText } from './dccNotes.js';

// Character generation data
const alignments = ['Lawful', 'Neutral', 'Chaotic'];
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
  topLeft: { top: '2%', left: '2%' },
  topRight: { top: '2%', left: '52%' },
  bottomLeft: { top: '52%', left: '2%' },
  bottomRight: { top: '52%', left: '52%' },
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
  
  // Position styles for form fields
  name: { position: 'absolute', top: 12, left: 10 },
  gender: { position: 'absolute', top: 12, left: 140 },
  alignment: { position: 'absolute', top: 35, left: 10 },
  occupation: { position: 'absolute', top: 60, left: 10 },
  critDie: { position: 'absolute', top: 35, left: 110 },
  fumble: { position: 'absolute', top: 35, left: 165 },
  
  // Stats positioning - VALUES (left side)
  str: { position: 'absolute', top: 184, left: 50 },
  agi: { position: 'absolute', top: 200, left: 50 },
  sta: { position: 'absolute', top: 217, left: 50 },
  per: { position: 'absolute', top: 233, left: 50 },
  int: { position: 'absolute', top: 250, left: 50 },
  luck: { position: 'absolute', top: 266, left: 50 },
  
  // Stats positioning - MODIFIERS (right side)
  strMod: { position: 'absolute', top: 184, left: 65 },
  agiMod: { position: 'absolute', top: 200, left: 65 },
  staMod: { position: 'absolute', top: 217, left: 65 },
  perMod: { position: 'absolute', top: 233, left: 65 },
  intMod: { position: 'absolute', top: 250, left: 65 },
  luckMod: { position: 'absolute', top: 266, left: 65 },
  
  // Combat stats
  ac: { position: 'absolute', top: 103, right: 245 },
  hp: { position: 'absolute', top: 138, left: 18 },
  init: { position: 'absolute', top: 89, left: 125},
  melee: { position: 'absolute', top: 112, left: 120 },
  missile: { position: 'absolute', top: 125, left: 120 },
  meleeDamage: { position: 'absolute', top: 112, left: 140 },
  missileDamage: { position: 'absolute', top: 125, left: 140 },
  
  // Saves
  reflex: { position: 'absolute', top: 13, right: 67 },
  fortitude: { position: 'absolute', top: 13, right: 35 },
  will: { position: 'absolute', top: 47, right: 67 },
  
  // Other fields
  speed: { position: 'absolute', top: 47, right: 30 },
  wealth: { position: 'absolute', top: 307, left: 10, width: 80 },
  languages: { position: 'absolute', top: 335, left: 10, width: 80  },
  birthAugur: { position: 'absolute', top: 100, left: 195, width: 80 },
  weapon: { position: 'absolute', top: 168, left: 110 },
  weaponDamage: { position: 'absolute', top: 168, right: 58 },
  equipment: { position: 'absolute', top: 241, left: 110 },
  notes: { position: 'absolute', top: 292, left: 110 , width: 160},
});

// Generate random character
export const generateRandomCharacter = () => {
  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;
  const roll3d6 = () => rollDice(6) + rollDice(6) + rollDice(6);

  const selectedOccupation = occupations[Math.floor(Math.random() * occupations.length)];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const nameList = gender.toLowerCase() === 'male' ? names.male : names.female;
  
  const str = roll3d6();
  const agi = roll3d6();
  const sta = roll3d6();
  const per = roll3d6();
  const int = roll3d6();
  const luck = roll3d6();

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

  // Calculate stats with luck bonuses
  const baseHp = rollDice(4) + staMod + getHitPointLuck(luckMod, luckySign);
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
  const fumble = formatFumbleDie(luckMod, luckySign);

  const alignment = alignments[Math.floor(Math.random() * alignments.length)];
  const notes = getNotes(selectedOccupation.id);
  
  return {
    name: nameList[Math.floor(Math.random() * nameList.length)] + ' ' + 
          nameList[Math.floor(Math.random() * nameList.length)] + 'son',
    gender: gender,
    alignment: alignment,
    occupation: selectedOccupation.name,
    race: selectedOccupation.race,
    weapon: selectedOccupation.weapon,
    weaponDamage: selectedOccupation.damage,
    equipment: generateEquipment(selectedOccupation), // Updated line
    stats: {
      str: { value: str, modifier: strMod },
      agi: { value: agi, modifier: agiMod },
      sta: { value: sta, modifier: staMod },
      per: { value: per, modifier: perMod },
      int: { value: int, modifier: intMod },
      luck: { value: luck, modifier: luckMod }
    },
    hp: hp,
    ac: ac + getACBonusArmour(selectedOccupation) + ' (' + ac + ')',
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
    notes: notes
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
    <Text style={[styles.smallText, styles.notes]}>{character.notes}</Text>
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

export const generateFourCharacters = () => {
  const characters = [];
  for (let i = 0; i < 4; i++) {
    characters.push(generateRandomCharacter());
  }
  return characters;
};