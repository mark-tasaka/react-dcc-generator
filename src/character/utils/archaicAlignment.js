// archaiAlignment.js

export function getArchaicAlignment(choice, species) {
    var alignment = "The Clan of the Cog";

    if (choice == "1") {
        if (species == "Pure Strain Human") {
            alignment = "The Curates";
        }

        if (species == "Mutant") {
            alignment = "The Children of the Glow";
        }

        if (species == "Manimal") {
            alignment = "The Chosen Zuu";
        }

        if (species == "Plantient") {
            alignment = "The Atomic Equinox";
        }
    }

    return alignment;
}