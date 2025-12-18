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

// New function to generate complete equipment list
export const generateEquipment = (selectedOccupation) => {
    const randomEquipment = getRandomEquipment();
    
    // Check if tradeGood is empty or null
    if (!selectedOccupation.tradeGood || selectedOccupation.tradeGood === "") {
        return randomEquipment;
    } else {
        return selectedOccupation.tradeGood + '; ' + randomEquipment;
    }
};

// Default export if you prefer
export default getRandomEquipment;