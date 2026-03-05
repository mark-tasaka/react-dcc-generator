import {
  africanGivenNamesMale, africanAmericanGivenNamesMale, americanGivenNamesMale,
  arabicGivenNamesMale, armenianGivenNamesMale, celticGivenNamesMale,
  chineseGivenNamesMale, czechGivenNamesMale, danishGivenNamesMale,
  dutchGivenNamesMale, egyptianGivenNamesMale, englishGivenNamesMale,
  finnishGivenNamesMale, frenchGivenNamesMale, gaelicGivenNamesMale,
  germanGivenNamesMale, greekGivenNamesMale, hawaiianGivenNamesMale,
  hebrewGivenNamesMale, hindiGivenNamesMale, hungarianGivenNamesMale,
  indianGivenNamesMale, irishGivenNamesMale, italianGivenNamesMale,
  japaneseGivenNamesMale, koreanGivenNamesMale, latinGivenNamesMale,
  middleEnglishGivenNamesMale, nativeAmericanGivenNamesMale, norseGivenNamesMale,
  oldEnglishGivenNamesMale, oldFrenchGivenNamesMale, oldGermanGivenNamesMale,
  oldNorseGivenNamesMale, persianGivenNamesMale, polishGivenNamesMale,
  polynesianGivenNamesMale, russianGivenNamesMale, sanskritGivenNamesMale,
  scandinavianGivenNamesMale, scottishGivenNamesMale, slavicGivenNamesMale,
  spanishGivenNamesMale, swahiliGivenNamesMale, swedishGivenNamesMale,
  teutonicGivenNamesMale, turkishGivenNamesMale, vietnameseGivenNamesMale,
  welshGivenNamesMale, yiddishGivenNamesMale
} from './givenNamesMale.js';

import {
  africanGivenNamesFemale, africanAmericanGivenNamesFemale, americanGivenNamesFemale,
  arabicGivenNamesFemale, armenianGivenNamesFemale, celticGivenNamesFemale,
  chineseGivenNamesFemale, czechGivenNamesFemale, danishGivenNamesFemale,
  dutchGivenNamesFemale, egyptianGivenNamesFemale, englishGivenNamesFemale,
  finnishGivenNamesFemale, frenchGivenNamesFemale, gaelicGivenNamesFemale,
  germanGivenNamesFemale, greekGivenNamesFemale, hawaiianGivenNamesFemale,
  hebrewGivenNamesFemale, hindiGivenNamesFemale, hungarianGivenNamesFemale,
  indianGivenNamesFemale, irishGivenNamesFemale, italianGivenNamesFemale,
  japaneseGivenNamesFemale, koreanGivenNamesFemale, latinGivenNamesFemale,
  middleEnglishGivenNamesFemale, nativeAmericanGivenNamesFemale, norseGivenNamesFemale,
  oldEnglishGivenNamesFemale, oldFrenchGivenNamesFemale, oldGermanGivenNamesFemale,
  oldNorseGivenNamesFemale, persianGivenNamesFemale, polishGivenNamesFemale,
  polynesianGivenNamesFemale, russianGivenNamesFemale, sanskritGivenNamesFemale,
  scandinavianGivenNamesFemale, scottishGivenNamesFemale, slavicGivenNamesFemale,
  spanishGivenNamesFemale, swahiliGivenNamesFemale, swedishGivenNamesFemale,
  teutonicGivenNamesFemale, turkishGivenNamesFemale, vietnameseGivenNamesFemale,
  welshGivenNamesFemale, yiddishGivenNamesFemale
} from './givenNamesFemale.js';

// Import all the surname functions
import {
  africanSurnames, arabicSurnames, armenianSurnames, catalanSurnames,
  chineseSurnames, cornishSurnames, czechSurnames, danishSurnames,
  dutchSurnames, englishSurnames, finnishSurnames, frenchSurnames,
  galicianSurnames, germanSurnames, greekSurnames, hungarianSurnames,
  indianSurnames, irishSurnames, italianSurnames, japaneseSurnames,
  jewishSurnames, koreanSurnames, lithuanianSurnames, muslimSurnames,
  norwegianSurnames, polishSurnames, portugueseSurnames, russianSurnames,
  scandinavianSurnames, scottishSurnames, slavicSurnames, spanishSurnames,
  swedishSurnames, swissSurnames, turkishSurnames, ukrainianSurnames,
  vietnameseSurnames, welshSurnames
} from './surnames.js';

// Male given names mapping
const maleGivenNameFunctions = [
  africanGivenNamesMale,           // 0
  africanAmericanGivenNamesMale,   // 1
  americanGivenNamesMale,          // 2
  arabicGivenNamesMale,            // 3
  armenianGivenNamesMale,          // 4
  celticGivenNamesMale,            // 5
  chineseGivenNamesMale,           // 6
  czechGivenNamesMale,             // 7
  danishGivenNamesMale,            // 8
  dutchGivenNamesMale,             // 9
  egyptianGivenNamesMale,          // 10
  englishGivenNamesMale,           // 11
  finnishGivenNamesMale,           // 12
  frenchGivenNamesMale,            // 13
  gaelicGivenNamesMale,            // 14
  germanGivenNamesMale,            // 15
  greekGivenNamesMale,             // 16
  hawaiianGivenNamesMale,          // 17
  hebrewGivenNamesMale,            // 18
  hindiGivenNamesMale,             // 19
  hungarianGivenNamesMale,         // 20
  indianGivenNamesMale,            // 21
  irishGivenNamesMale,             // 22
  italianGivenNamesMale,           // 23
  japaneseGivenNamesMale,          // 24
  koreanGivenNamesMale,            // 25
  latinGivenNamesMale,             // 26
  middleEnglishGivenNamesMale,     // 27
  nativeAmericanGivenNamesMale,    // 28
  norseGivenNamesMale,             // 29
  oldEnglishGivenNamesMale,        // 30
  oldFrenchGivenNamesMale,         // 31
  oldGermanGivenNamesMale,         // 32
  oldNorseGivenNamesMale,          // 33
  persianGivenNamesMale,           // 34
  polishGivenNamesMale,            // 35
  polynesianGivenNamesMale,        // 36
  russianGivenNamesMale,           // 37
  sanskritGivenNamesMale,          // 38
  scandinavianGivenNamesMale,      // 39
  scottishGivenNamesMale,          // 40
  slavicGivenNamesMale,            // 41
  spanishGivenNamesMale,           // 42
  swahiliGivenNamesMale,           // 43
  swedishGivenNamesMale,           // 44
  teutonicGivenNamesMale,          // 45
  turkishGivenNamesMale,           // 46
  vietnameseGivenNamesMale,        // 47
  welshGivenNamesMale,             // 48
  yiddishGivenNamesMale            // 49
];

// Female given names mapping
const femaleGivenNameFunctions = [
  africanGivenNamesFemale,           // 0
  africanAmericanGivenNamesFemale,   // 1
  americanGivenNamesFemale,          // 2
  arabicGivenNamesFemale,            // 3
  armenianGivenNamesFemale,          // 4
  celticGivenNamesFemale,            // 5
  chineseGivenNamesFemale,           // 6
  czechGivenNamesFemale,             // 7
  danishGivenNamesFemale,            // 8
  dutchGivenNamesFemale,             // 9
  egyptianGivenNamesFemale,          // 10
  englishGivenNamesFemale,           // 11
  finnishGivenNamesFemale,           // 12
  frenchGivenNamesFemale,            // 13
  gaelicGivenNamesFemale,            // 14
  germanGivenNamesFemale,            // 15
  greekGivenNamesFemale,             // 16
  hawaiianGivenNamesFemale,          // 17
  hebrewGivenNamesFemale,            // 18
  hindiGivenNamesFemale,             // 19
  hungarianGivenNamesFemale,         // 20
  indianGivenNamesFemale,            // 21
  irishGivenNamesFemale,             // 22
  italianGivenNamesFemale,           // 23
  japaneseGivenNamesFemale,          // 24
  koreanGivenNamesFemale,            // 25
  latinGivenNamesFemale,             // 26
  middleEnglishGivenNamesFemale,     // 27
  nativeAmericanGivenNamesFemale,    // 28
  norseGivenNamesFemale,             // 29
  oldEnglishGivenNamesFemale,        // 30
  oldFrenchGivenNamesFemale,         // 31
  oldGermanGivenNamesFemale,         // 32
  oldNorseGivenNamesFemale,          // 33
  persianGivenNamesFemale,           // 34
  polishGivenNamesFemale,            // 35
  polynesianGivenNamesFemale,        // 36
  russianGivenNamesFemale,           // 37
  sanskritGivenNamesFemale,          // 38
  scandinavianGivenNamesFemale,      // 39
  scottishGivenNamesFemale,          // 40
  slavicGivenNamesFemale,            // 41
  spanishGivenNamesFemale,           // 42
  swahiliGivenNamesFemale,           // 43
  swedishGivenNamesFemale,           // 44
  teutonicGivenNamesFemale,          // 45
  turkishGivenNamesFemale,           // 46
  vietnameseGivenNamesFemale,        // 47
  welshGivenNamesFemale,             // 48
  yiddishGivenNamesFemale            // 49
];

// Surname functions mapping
const surnameFunctions = [
  africanSurnames,        // 0
  arabicSurnames,         // 1
  armenianSurnames,       // 2
  catalanSurnames,        // 3
  chineseSurnames,        // 4
  cornishSurnames,        // 5
  czechSurnames,          // 6
  danishSurnames,         // 7
  dutchSurnames,          // 8
  englishSurnames,        // 9
  finnishSurnames,        // 10
  frenchSurnames,         // 11
  galicianSurnames,       // 12
  germanSurnames,         // 13
  greekSurnames,          // 14
  hungarianSurnames,      // 15
  indianSurnames,         // 16
  irishSurnames,          // 17
  italianSurnames,        // 18
  japaneseSurnames,       // 19
  jewishSurnames,         // 20
  koreanSurnames,         // 21
  lithuanianSurnames,     // 22
  muslimSurnames,         // 23
  norwegianSurnames,      // 24
  polishSurnames,         // 25
  portugueseSurnames,     // 26
  russianSurnames,        // 27
  scandinavianSurnames,   // 28
  scottishSurnames,       // 29
  slavicSurnames,         // 30
  spanishSurnames,        // 31
  swedishSurnames,        // 32
  swissSurnames,          // 33
  turkishSurnames,        // 34
  ukrainianSurnames,      // 35
  vietnameseSurnames,     // 36
  welshSurnames           // 37
];

// Origin descriptions for given names
const givenNameDescriptions = [
  'African',           // 0
  'African-American',  // 1
  'American',          // 2
  'Arabic',            // 3
  'Armenian',          // 4
  'Celtic',            // 5
  'Chinese',           // 6
  'Czechoslovakian',   // 7
  'Danish',            // 8
  'Dutch',             // 9
  'Egyptian',          // 10
  'English',           // 11
  'Finnish',           // 12
  'French',            // 13
  'Gaelic',            // 14
  'German',            // 15
  'Greek',             // 16
  'Hawaiian',          // 17
  'Hebrew',            // 18
  'Hindi',             // 19
  'Hungarian',         // 20
  'Indian',            // 21
  'Irish',             // 22
  'Italian',           // 23
  'Japanese',          // 24
  'Korean',            // 25
  'Latin',             // 26
  'Middle English',    // 27
  'Native American',   // 28
  'Norse',             // 29
  'Old English',       // 30
  'Old French',        // 31
  'Old German',        // 32
  'Old Norse',         // 33
  'Persian',           // 34
  'Polish',            // 35
  'Polynesian',        // 36
  'Russian',           // 37
  'Sanskrit',          // 38
  'Scandinavian',      // 39
  'Scottish',          // 40
  'Slavic',            // 41
  'Spanish',           // 42
  'Swahili',           // 43
  'Swedish',           // 44
  'Teutonic',          // 45
  'Turkish',           // 46
  'Vietnamese',        // 47
  'Welsh',             // 48
  'Yiddish'            // 49
];

// Origin descriptions for surnames
const surnameDescriptions = [
  'African',           // 0
  'Arabic',            // 1
  'Armenian',          // 2
  'Catalan',           // 3
  'Chinese',           // 4
  'Cornish',           // 5
  'Czechoslovakian',   // 6
  'Danish',            // 7
  'Dutch',             // 8
  'English',           // 9
  'Finnish',           // 10
  'French',            // 11
  'Galician',          // 12
  'German',            // 13
  'Greek',             // 14
  'Hungarian',         // 15
  'Indian',            // 16
  'Irish',             // 17
  'Italian',           // 18
  'Japanese',          // 19
  'Jewish',            // 20
  'Korean',            // 21
  'Lithuanian',        // 22
  'Muslim',            // 23
  'Norwegian',         // 24
  'Polish',            // 25
  'Portuguese',        // 26
  'Russian',           // 27
  'Scandinavian',      // 28
  'Scottish',          // 29
  'Slavic',            // 30
  'Spanish',           // 31
  'Swedish',           // 32
  'Swiss',             // 33
  'Turkish',           // 34
  'Ukrainian',         // 35
  'Vietnamese',        // 36
  'Welsh'              // 37
];

// Main function to generate a full name
export const getName = (originGiven, originSurname, sex) => {
  const backgroundGiven = parseInt(originGiven);
  const backgroundSurname = parseInt(originSurname);
  const gender = parseInt(sex);

  let firstName = '';
  let lastName = '';

  // Generate first name based on gender
  if (gender === 0) { // Male
    if (backgroundGiven === 200) {
      firstName = '';
    } else if (backgroundGiven >= 0 && backgroundGiven < maleGivenNameFunctions.length) {
      firstName = maleGivenNameFunctions[backgroundGiven]();
    } else {
      firstName = '999999';
    }
  } else { // Female
    if (backgroundGiven === 200) {
      firstName = '';
    } else if (backgroundGiven >= 0 && backgroundGiven < femaleGivenNameFunctions.length) {
      firstName = femaleGivenNameFunctions[backgroundGiven]();
    } else {
      firstName = '99999';
    }
  }

  // Generate surname
  if (backgroundSurname === 200) {
    lastName = '';
  } else if (backgroundSurname >= 0 && backgroundSurname < surnameFunctions.length) {
    lastName = surnameFunctions[backgroundSurname]();
  } else {
    lastName = '9999';
  }

  // Combine first and last name
  const fullName = `${firstName} ${lastName}`.trim();
  
  return fullName;
};

// Function to get name description
export const getNameDescript = (originGiven, originSurname) => {
  const backgroundGiven = parseInt(originGiven);
  const backgroundSurname = parseInt(originSurname);

  let firstName = '';
  let lastName = '';

  // Get given name description
  if (backgroundGiven >= 0 && backgroundGiven < givenNameDescriptions.length) {
    firstName = givenNameDescriptions[backgroundGiven];
  } else if (backgroundGiven === 100) {
    firstName = 'Random';
  } else {
    firstName = '99999999';
  }

  // Get surname description
  if (backgroundSurname >= 0 && backgroundSurname < surnameDescriptions.length) {
    lastName = surnameDescriptions[backgroundSurname];
  } else if (backgroundSurname === 100) {
    lastName = 'Random';
  } else {
    lastName = '99999999';
  }

  let descpMessage = '';

  if (backgroundGiven !== 200 && backgroundSurname === 200) {
    descpMessage = `Given Name (${firstName})`;
  } else if (backgroundGiven === 200 && backgroundSurname !== 200) {
    descpMessage = `SurName (${lastName})`;
  } else if (backgroundGiven === 200 && backgroundSurname === 200) {
    descpMessage = '';
  } else {
    descpMessage = `Given Name (${firstName}), Last Name (${lastName})`;
  }

  return descpMessage;
};

// Export constants for use in components if needed
export { givenNameDescriptions, surnameDescriptions };