const PUSHCART_ITEMS = [
    "(containing tomatoes",
    "(containing nothing)", 
    "(containing dirt)",
    "(containing straw)",
    "(containing rocks)",
    "(containing YOUR DEAD!!!)"
];

const FARM_ANIMALS = ["Hen", "Sheep", "Goat", "Cow", "Duck", "Goose", "Mule"];

// Helper function to get random array element
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomEquipment = () => {
    const equipment = [
        "backpack",
        "candle",
        "chain (10 feet)",
        "chalk (1 piece)",
        "chest (empty)",
        "crowbar",
        "flask (empty)",
        "flint and steel",
        "grappling hook",
        "small hammer",
        "holy symbol",
        "holy water (1 vial)",
        "iron spike",
        "lantern",
        "mirror (hand size)",
        "oil (1 flask)",
        "10 foot Pole",
        "ration (1 day)",
        "rope (50 feet)",
        "sack (large)",
        "sack (small)",
        "thieves tools",
        "torch (1)",
        "waterskin"
    ];

    // Generate random index and return the equipment at that index
    const randomIndex = Math.floor(Math.random() * equipment.length);
    return equipment[randomIndex];
};

export const generateEquipment = (selectedOccupation) => {
    const randomEquipment = getRandomEquipment();
    
    // Handle special cases for specific occupation IDs
    if (selectedOccupation.id === 92) {
        // Wainwright - (with special contents
        return selectedOccupation.tradeGood + ' ' + getRandomElement(PUSHCART_ITEMS) + ', ' + randomEquipment;
    }
    else if (selectedOccupation.id >= 48 && selectedOccupation.id <= 56) {
        // Farmers - Livestock (farm animals)
        return selectedOccupation.tradeGood + ' ' + getRandomElement(FARM_ANIMALS) + ', ' + randomEquipment;
    }
    
    // Handle regular trade goods
    if (!selectedOccupation.tradeGood || selectedOccupation.tradeGood === "") {
        return randomEquipment;
    } else {
        return selectedOccupation.tradeGood + ', ' + randomEquipment;
    }
};

export const generateWealth = (selectedOccupation) => {
    const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;
    let copper = rollDice(12) + rollDice(12) + rollDice(12) + rollDice(12) + rollDice(12);

    if(selectedOccupation.id === 28) {
        return '5 gp, 10 sp, ' + (copper + 200) + ' cp';} 
    else if(selectedOccupation.id === 29) {
        return '20 sp, ' + copper + ' cp';} 
    else if(selectedOccupation.id === 75) {
        return '4 gp, 14 sp, ' + (copper + 27) + ' cp';} 
    else if(selectedOccupation.id === 88) {
        return (copper + 100) + ' cp';}
    else {
        return copper + ' cp';}  
};

// Default export if you prefer
export default getRandomEquipment;