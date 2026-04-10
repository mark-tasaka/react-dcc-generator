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

  if (species === "Kitsune" && intelligence > 7) {
    languages.push(species);
    languagesAvailable = [
      "Amabie", "Bakemono", "Bakeneko", "Inugami", "Jorōgumo",
      "Kappa", "Karura", "Komainu", "Koropokuru", "Kuda-gitsune",
      "Mikoshi-nyūdō", "Mizuchi", "Mujina", "Namahage", "Nekomata",
      "Ningyo", "Ogre-magi", "Oni", "Onikuma", "Ryuu", "Shojo", "Tengu"
    ];
  } else if (species === "Koropokuru" && intelligence > 7) {
    languages.push(species);
    languagesAvailable = [
      "Amabie", "Bakemono", "Hibagon", "Inugami", "Kappa",
      "Karura", "Kitsune", "Komainu", "Kuda-gitsune", "Mikoshi-nyūdō",
      "Mizuchi", "Mujina", "Namahage", "Nekomata", "Ningyo",
      "Ogre-magi", "Oni", "Onikuma", "Shojo", "Tengu"
    ];
  } else if (species === "Tengu" && intelligence > 7) {
    languages.push(species);
    languagesAvailable = [
      "Amabie", "Bakemono", "Hibagon", "Kappa", "Karura",
      "Kitsune", "Komainu", "Koropokuru", "Mikoshi-nyūdō", "Mizuchi",
      "Mujina", "Namahage", "Nekomata", "Ningyo", "Nue",
      "Ogre-magi", "Oni", "Onikuma", "Ryuu", "Shojo"
    ];
  } else {
    languagesAvailable = [
      "Amabie", "Bakemono", "Kappa", "Karura", "Kitsune",
      "Komainu", "Koropokuru", "Mikoshi-nyūdō", "Mizuchi", "Mujina",
      "Namahage", "Nekomata", "Ogre-magi", "Oni", "Onikuma",
      "Shojo", "Tengu"
    ];
  }

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