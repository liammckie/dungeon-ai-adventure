import { Character } from "@/types/game";

export const calculateLevelUp = (character: Character): Character => {
  const xpThreshold = character.level * 1000;
  if (character.xp >= xpThreshold) {
    const newLevel = character.level + 1;
    const hpIncrease = character.class === "Fighter" ? 10 : 6;
    
    return {
      ...character,
      level: newLevel,
      maxHp: character.maxHp + hpIncrease,
      hp: character.maxHp + hpIncrease,
      stats: {
        ...character.stats,
        strength: character.stats.strength + 1,
        constitution: character.stats.constitution + 1,
      },
    };
  }
  return character;
};