export function getArchaicAlignment(choice, species) {

  // Option 1 ── Clan of the Cog: every character shares the same alignment
  if (choice === 1) {
    return 'Clan of the Cog';
  }

  // Option 2 ── By Genotypes: alignment determined by species
  if (choice === 2) {
    if (species === 'Pure Strain Human') return 'The Curates';
    if (species === 'Mutant')            return 'The Children of the Glow';
    if (species === 'Manimal')           return 'The Chosen Zuu';
    if (species === 'Plantient')         return 'The Atomic Equinox';
  }

  // Fallback
  return 'Clan of the Cog';
}