import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import characterSheetBg from '../character/img/lvZeroCharacterSheet.png';

// Character generation data
const occupations = [
  'Alchemist', 'Animal trainer', 'Armorer', 'Astrologer', 'Barber', 'Beadle', 'Beekeeper', 'Blacksmith',
  'Butcher', 'Caravan guard', 'Cheesemaker', 'Cobbler', 'Confidence artist', 'Cooper', 'Costermonger',
  'Cutpurse', 'Ditch digger', 'Dwarven apothecarist', 'Dwarven blacksmith', 'Dwarven chest-maker',
  'Dwarven herder', 'Dwarven miner', 'Dwarven mushroom-farmer', 'Dwarven rat-catcher', 'Dwarven stonemason',
  'Elven artisan', 'Elven barrister', 'Elven chandler', 'Elven falconer', 'Elven forester', 'Elven glassblower',
  'Elven navigator', 'Elven sage', 'Farmer', 'Fortune teller', 'Gambler', 'Gong farmer', 'Grave digger',
  'Guild beggar', 'Halfling chicken butcher', 'Halfling dyer', 'Halfling glovemaker', 'Halfling gypsy',
  'Halfling haberdasher', 'Halfling healer', 'Halfling moneylender', 'Halfling trader', 'Healer',
  'Herbalist', 'Herder', 'Hunter', 'Indentured servant', 'Jester', 'Jeweler', 'Locksmith', 'Mendicant',
  'Merchant', 'Miller', 'Minstrel', 'Noble', 'Orphan', 'Ostler', 'Outlaw', 'Rope maker', 'Sailor',
  'Scribe', 'Shaman', 'Slave', 'Smuggler', 'Soldier', 'Squire', 'Tax collector', 'Trapper', 'Urchin',
  'Wainwright', 'Weaver', 'Wizard\'s apprentice', 'Woodcutter'
];

const alignments = ['Lawful', 'Neutral', 'Chaotic'];
const genders = ['Male', 'Female'];

const names = {
  male: ['Aelar', 'Aerdrom', 'Ahvak', 'Aramil', 'Aranear', 'Berris', 'Cithreth', 'Dayereth', 'Drannor', 'Eckhart',
         'Evendur', 'Galinndan', 'Hadarai', 'Halimath', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Korfel', 'Lamlis'],
  female: ['Adrie', 'Ahanna', 'Aramara', 'Aranea', 'Berris', 'Caelynn', 'Carric', 'Dayereth', 'Enna', 'Galinndan',
           'Hadarai', 'Halimath', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Korfel', 'Lada', 'Lamlis', 'Wade']
};

const birthAugurs = [
  'Harsh winter: All attack rolls', 'The bull: Melee attack rolls', 'Fortunate date: Missile attack rolls',
  'Raised by wolves: Unarmed attack rolls', 'Conceived on horseback: Mounted attack rolls',
  'Born on the battlefield: Damage rolls', 'Path of the bear: Melee damage rolls',
  'Hawkeye: Missile damage rolls', 'Pack hunter: Attack and damage rolls for 0-level starting weapon',
  'Born under the loom: Skill checks (including thief skills)', 'Fox\'s cunning: Find/disable traps',
  'Four-leafed clover: Find secret doors', 'Seventh son: Spell checks', 'The raging storm: Spell damage',
  'Righteous heart: Turn unholy checks', 'Survived the plague: Magical healing',
  'Lucky sign: Saving throws', 'Guardian angel: Turn unholy checks', 'Survived war: Initiative and attacks',
  'Lucky bone: Find/disable traps and magical healing'
];

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
  topRight: { top: '2%', right: '2%' },
  bottomLeft: { top: '52%', left: '2%' },
  bottomRight: { top: '52%', right: '2%' },
  
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
  critDie: { position: 'absolute', top: 35, left: 120 },
  fumble: { position: 'absolute', top: 35, right: 30 },
  xp: { position: 'absolute', top: 55, right: 30 },
  
  // Stats positioning
  str: { position: 'absolute', top: 184, left: 55 },
  agi: { position: 'absolute', top: 200, left: 55 },
  sta: { position: 'absolute', top: 217, left: 55 },
  per: { position: 'absolute', top: 233, left: 55 },
  int: { position: 'absolute', top: 250, left: 55 },
  luck: { position: 'absolute', top: 266, left: 55 },
  
  // Combat stats
  ac: { position: 'absolute', top: 103, left: 40 },
  hp: { position: 'absolute', top: 138, left: 18 },
  init: { position: 'absolute', top: 89, left: 125},
  melee: { position: 'absolute', top: 112, left: 120 },
  missile: { position: 'absolute', top: 125, left: 120 },
  
  // Saves
  reflex: { position: 'absolute', top: 85, right: 85 },
  fortitude: { position: 'absolute', top: 85, right: 65 },
  will: { position: 'absolute', top: 85, right: 45 },
  
  // Other fields
  wealth: { position: 'absolute', bottom: 65, left: 20 },
  languages: { position: 'absolute', bottom: 35, left: 20 },
  birthAugur: { position: 'absolute', top: 75, right: 20, width: 120 },
});

// Generate random character
export const generateRandomCharacter = () => {
  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;
  const roll3d6 = () => rollDice(6) + rollDice(6) + rollDice(6);
  
  const getModifier = (score) => Math.floor((score - 10) / 2);

  const gender = genders[Math.floor(Math.random() * genders.length)];
  const nameList = gender.toLowerCase() === 'male' ? names.male : names.female;
  
  const str = roll3d6();
  const agi = roll3d6();
  const sta = roll3d6();
  const per = roll3d6();
  const int = roll3d6();
  const luck = roll3d6();

  const hp = Math.max(1, rollDice(4) + getModifier(sta));
  
  return {
    name: nameList[Math.floor(Math.random() * nameList.length)] + ' ' + 
          nameList[Math.floor(Math.random() * nameList.length)] + 'son',
    gender: gender,
    alignment: alignments[Math.floor(Math.random() * alignments.length)],
    occupation: occupations[Math.floor(Math.random() * occupations.length)],
    stats: {
      str: { value: str, modifier: getModifier(str) },
      agi: { value: agi, modifier: getModifier(agi) },
      sta: { value: sta, modifier: getModifier(sta) },
      per: { value: per, modifier: getModifier(per) },
      int: { value: int, modifier: getModifier(int) },
      luck: { value: luck, modifier: getModifier(luck) }
    },
    hp: hp,
    ac: 10 + getModifier(agi),
    init: getModifier(agi),
    melee: getModifier(str),
    missile: getModifier(agi),
    critDie: 'd4',
    fumble: 'd4',
    reflex: getModifier(agi),
    fortitude: getModifier(sta),
    will: getModifier(per),
    birthAugur: birthAugurs[Math.floor(Math.random() * birthAugurs.length)],
    wealth: rollDice(12) + rollDice(12),
    languages: 'Common',
    xp: 0
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
    <Text style={[styles.text, styles.xp]}>{character.xp}</Text>
    
    {/* Stats */}
    <Text style={[styles.text, styles.str]}>{character.stats.str.value} {character.stats.str.modifier >= 0 ? '+' : ''}{character.stats.str.modifier}</Text>
    <Text style={[styles.text, styles.agi]}>{character.stats.agi.value} {character.stats.agi.modifier >= 0 ? '+' : ''}{character.stats.agi.modifier}</Text>
    <Text style={[styles.text, styles.sta]}>{character.stats.sta.value} {character.stats.sta.modifier >= 0 ? '+' : ''}{character.stats.sta.modifier}</Text>
    <Text style={[styles.text, styles.per]}>{character.stats.per.value} {character.stats.per.modifier >= 0 ? '+' : ''}{character.stats.per.modifier}</Text>
    <Text style={[styles.text, styles.int]}>{character.stats.int.value} {character.stats.int.modifier >= 0 ? '+' : ''}{character.stats.int.modifier}</Text>
    <Text style={[styles.text, styles.luck]}>{character.stats.luck.value} {character.stats.luck.modifier >= 0 ? '+' : ''}{character.stats.luck.modifier}</Text>
    
    {/* Combat Stats */}
    <Text style={[styles.largeText, styles.ac]}>{character.ac}</Text>
    <Text style={[styles.largeText, styles.hp]}>{character.hp}</Text>
    <Text style={[styles.text, styles.init]}>{character.init >= 0 ? '+' : ''}{character.init}</Text>
    <Text style={[styles.text, styles.melee]}>{character.melee >= 0 ? '+' : ''}{character.melee}</Text>
    <Text style={[styles.text, styles.missile]}>{character.missile >= 0 ? '+' : ''}{character.missile}</Text>
    
    {/* Other */}
    <Text style={[styles.text, styles.wealth]}>{character.wealth} cp</Text>
    <Text style={[styles.text, styles.languages]}>{character.languages}</Text>
    <Text style={[styles.smallText, styles.birthAugur]}>{character.birthAugur}</Text>
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