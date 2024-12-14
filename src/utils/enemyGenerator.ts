import { Character, CharacterClass, CharacterRace } from "@/types/game";

export const generateEnemy = (): Character => ({
  id: `enemy_${Date.now()}`,
  name: "Forest Bandit",
  race: "Human" as CharacterRace,
  class: "Rogue" as CharacterClass,
  background: "Criminal",
  level: 1,
  xp: 0,
  hp: 20,
  maxHp: 20,
  stats: {
    strength: 12,
    dexterity: 14,
    constitution: 12,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  inventory: [],
  traits: [],
  proficiencies: {
    armor: [],
    weapons: ["shortsword", "dagger"],
    tools: ["thieves' tools"],
    skills: ["stealth", "deception"],
    languages: ["Common"],
    saves: ["dexterity"]
  },
  isAI: true
});