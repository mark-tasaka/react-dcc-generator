// Shuffle array function (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getLanguages = (intMod, luckMod, luckySign, species, alignment, intelligence) => {
  let bonusLanguages = 0;
  const languages = ['Common'];
  let languagesAvailable = [];

  // Check species and intelligence for racial languages
  if (species === "Dwarf" && intelligence > 7) {
    languages.push(species);
    languagesAvailable = [
      "Elf", "Halfling", "Gnome", "Bugbear", "Goblin", "Gnoll", 
      "Hobgolin", "Kobold", "Lizardman", "Minotaur", "Ogre", 
      "Orc", "Troglodyte", "Giant"
    ];
  } else if (species === "Elf" && intelligence > 7) {
    languages.push(species);
    languagesAvailable = [
      "Dwarf", "Halfling", "Gnome", "Bugbear", "Goblin", "Gnoll", 
      "Hobgolin", "Kobold", "Lizardman", "Minotaur", "Ogre", 
      "Orc", "Troglodyte", "Giant"
    ];
  } else if (species === "Halfling" && intelligence > 7) {
    languages.push(species);
    languagesAvailable = [
      "Dwarf", "Elf", "Gnome", "Bugbear", "Goblin", "Gnoll", 
      "Hobgolin", "Kobold", "Lizardman", "Minotaur", "Ogre", 
      "Orc", "Troglodyte", "Giant"
    ];
  } else {
    languagesAvailable = [
      "Dwarf", "Elf", "Halfling", "Gnome", "Bugbear", "Goblin", "Gnoll", 
      "Hobgolin", "Kobold", "Lizardman", "Minotaur", "Ogre", 
      "Orc", "Troglodyte", "Giant"
    ];
  }

  // Add alignment tongue
  const alignmentTongue = `Alignment Tongue (${alignment})`;
  languagesAvailable.push(alignmentTongue);

  // Shuffle available languages
  const shuffledLanguages = shuffleArray(languagesAvailable);

  // Calculate bonus languages from intelligence modifier
  if (intMod > 0) {
    bonusLanguages += intMod;
  }

  // Add luck bonus if lucky sign is 28
  if (luckySign === "28" && luckMod > 0) {
    bonusLanguages += luckMod;
  }

  // Add bonus languages to the character's languages
  for (let i = 0; i < bonusLanguages && i < shuffledLanguages.length; i++) {
    languages.push(shuffledLanguages[i]);
  }

  return languages;
};

// Helper function to format languages as a string for display
export const formatLanguages = (languagesArray) => {
  return languagesArray.join(', ');
};