import { getRandomEquipment } from './dccEquipment.js';

export function getNotes(select) {
  if (select >= 0 && select <= 9) {
    return "Special Abilities: Shape-shifting, karma.";
  }
  else if (select >= 10 && select <= 19) {
    return "Special Abilities: Infravision (60'), sling, sense fresh water, woodland and handling animals skills.";
  }
  else if (select >= 20 && select <= 29) {
    return "Special Abilities: Flight, mimicry.";
  }
  else {
    return '';
  }
}

export const generateEquipment = (selectedOccupation) => {
  const randomEquipment = getRandomEquipment();

  return [selectedOccupation.tradeGood, randomEquipment]
    .filter(Boolean)
    .join(', ');
};