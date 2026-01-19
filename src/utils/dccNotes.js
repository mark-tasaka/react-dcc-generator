// dccNotes.js

export function getNotes(select) {
    if (select >= 0 && select <= 10) {
        return "Special Abilities: Infravision (60'), smell gold and gems.";
    }
    else if (select >= 11 && select <= 20) {
        return "Special Abilities: Infravision (60'), iron vulnerability, +4 bonus to detect secret doors.";
    }
    else if (select >= 21 && select <= 30) {
        return "Special Abilities: Infravision (30'), two-weapon fighting, good luck charm.";
    }
    else {
        return '';
    }
}

export function dieRollMethodText(choice) {
    switch (choice) {
        case 1:
            return 'Ability Scores: Roll 3d6 (Old School);';
        case 2:
            return 'Ability Scores: Roll 4d6 (drop the lowest die);';
        case 3:
            return 'Ability Scores: Roll 5d6 (use the 3 highest);';
        case 4:
            return 'Ability Scores: Roll 1d5+1d6+1d7;';
        case 5:
            return 'Ability Scores: Roll 2d6+6;';
        default:
            return '';
    }
}

export function hitPointsMethodText(choice) {
    switch (choice) {
        case 1:
            return ' HP: 1d4; ';
        case 2:
            return ' HP: max hp; ';
        default:
            return '';
    }
}