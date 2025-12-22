export function getGender(characterGender) {
    if (characterGender === 1) {
        const gender = Math.floor(Math.random() * 11) + 1;

        if (gender === 1) {
            return 'Other';
        }
        else if (gender >= 2 && gender <= 6) {
            return 'Male';
        }
        else {
            return 'Female';
        }
    }
    else if (characterGender === 2) {
        return 'Female';
    }
    else if (characterGender === 3) {
        return 'Male';
    }
    else if (characterGender === 4) {
        return 'Other';
    }
    else {
        return '';
    }
}

// Function to get name gender index
export function getNameGender(select) {
    if (select === 'Male') {
        return 0;
    }
    else if (select === 'Female') {
        return 1;
    }
    else {
        const randNumber = Math.floor(Math.random() * 2);
        return randNumber;
    }
}

// Default export (optional)
export default getGender;