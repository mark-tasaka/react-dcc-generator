// Function to get alignment based on option
export function getAlignment(option) {
    let alignment = "";
    
    if (option === 1) {
        const alignChoice = [
            "Lawful",
            "Neutral", 
            "Chaotic"
        ];
        
        const selectAlign = Math.floor(Math.random() * 3);
        
        alignment = alignChoice[selectAlign];
    }
    else if (option === 2) {
        alignment = "Lawful";
    }
    else if (option === 3) {
        alignment = "Neutral";
    }
    else if (option === 4) {
        alignment = "Chaotic";
    }
    
    return alignment;
}
