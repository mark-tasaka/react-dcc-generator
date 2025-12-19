function roll3D6() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const die3 = Math.floor(Math.random() * 6) + 1;

    return die1 + die2 + die3;
}

function roll4D6() {
    let abilityScores = 0;

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const die3 = Math.floor(Math.random() * 6) + 1;
    const die4 = Math.floor(Math.random() * 6) + 1;

    const dieRollArray = [die1, die2, die3, die4];

    // Sort in descending order (highest first)
    dieRollArray.sort((a, b) => b - a);

    // Sum the top 3 dice
    for (let i = 0; i < 3; i++) {
        abilityScores += dieRollArray[i];
    }

    return abilityScores;
}

function roll5D6() {
    let abilityScores = 0;

    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const die3 = Math.floor(Math.random() * 6) + 1;
    const die4 = Math.floor(Math.random() * 6) + 1;
    const die5 = Math.floor(Math.random() * 6) + 1;

    const dieRollArray = [die1, die2, die3, die4, die5];

    // Sort in descending order (highest first)
    dieRollArray.sort((a, b) => b - a);

    // Sum the top 3 dice
    for (let i = 0; i < 3; i++) {
        abilityScores += dieRollArray[i];
    }

    return abilityScores;
}

function rollD5D6D7() {
    const die1 = Math.floor(Math.random() * 5) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const die3 = Math.floor(Math.random() * 7) + 1;

    return die1 + die2 + die3;
}

function roll2D6Plus6() {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    return die1 + die2 + 6;
}

function rollAbilityScores(input) {
    let abilityScores = 0;

    // Roll 3d6
    if (input === 1) {
        abilityScores = roll3D6();
    }
    
    // Roll 4d6, drop the lowest
    if (input === 2) {
        abilityScores = roll4D6();
    }

    // Roll 5d6, use the three highest
    if (input === 3) {
        abilityScores = roll5D6();
    }
    
    // Roll d5, d6, d7
    if (input === 4) {
        abilityScores = rollD5D6D7();
    }
    
    // Roll 2d6 + 6
    if (input === 5) {
        abilityScores = roll2D6Plus6();
    }

    return abilityScores;
}

// Export all functions for use in other modules
export {
    roll3D6,
    roll4D6,
    roll5D6,
    rollD5D6D7,
    roll2D6Plus6,
    rollAbilityScores
};