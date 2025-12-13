import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import characterSheetBg from '../character/img/characterSheet.png';

// Character generation data (move all the arrays from zeroLv.js here)
const occupations = [
  'Alchemist', 'Animal trainer', 'Armorer', 'Astrologer', 'Barber', 'Beadle', 'Beekeeper', 'Blacksmith',
  // ... rest of your occupations array
];

const alignments = ['Lawful', 'Neutral', 'Chaotic'];
const genders = ['Male', 'Female'];

const names = {
  male: ['Aelar', 'Aerdrom', 'Ahvak', 'Aramil', 'Aranear', 'Berris', 'Cithreth', 'Dayereth', 'Drannor', 'Eckhart'],
  female: ['Adrie', 'Ahanna', 'Aramara', 'Aranea', 'Berris', 'Caelynn', 'Carric', 'Dayereth', 'Enna', 'Galinndan']
};

const birthAugurs = [
  'Harsh winter: All attack rolls', 'The bull: Melee attack rolls', 'Fortunate date: Missile attack rolls',
  // ... rest of your birthAugurs array
];

// Generate random character function
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

// PDF Styles (move from zeroLv.js)
const styles = StyleSheet.create({
  // ... all your existing styles
});

// Character component (move from zeroLv.js)
const Character = ({ character, position }) => (
  <View style={[styles.characterContainer, position]}>
    {/* ... all your existing Character JSX */}
  </View>
);

// PDF Document component (move from zeroLv.js)
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