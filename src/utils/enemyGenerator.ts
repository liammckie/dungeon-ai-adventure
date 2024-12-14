import { Character, CharacterClass, CharacterRace, CharacterStats } from "@/types/game";

const SKELETON_STATS: CharacterStats = {
  strength: 14, // +2
  dexterity: 14, // +2
  constitution: 14, // +2
  intelligence: 8, // -1
  wisdom: 8, // -1
  charisma: 4, // -3
};

const CULTIST_STATS: CharacterStats = {
  strength: 12, // +1
  dexterity: 12, // +1
  constitution: 10, // +0
  intelligence: 10, // +0
  wisdom: 10, // +0
  charisma: 10, // +0
};

const enemies = [
  {
    name: "Skeletal Guardian",
    race: "Undead" as CharacterRace,
    class: "Fighter" as CharacterClass,
    stats: SKELETON_STATS,
    hp: 13,
    maxHp: 13,
  },
  {
    name: "Cultist",
    race: "Human" as CharacterRace,
    class: "Fighter" as CharacterClass,
    stats: CULTIST_STATS,
    hp: 9,
    maxHp: 9,
  }
];

export const generateEnemy = (): Character => {
  const enemy = enemies[Math.floor(Math.random() * enemies.length)];
  
  return {
    id: `enemy_${Date.now()}`,
    name: enemy.name,
    race: enemy.race,
    class: enemy.class,
    background: "Soldier",
    level: 1,
    xp: 0,
    hp: enemy.hp,
    maxHp: enemy.maxHp,
    stats: enemy.stats,
    inventory: [],
    traits: [],
    proficiencies: {
      armor: ["light"],
      weapons: ["simple"],
      tools: [],
      skills: ["athletics"],
      languages: ["Common"],
      saves: ["strength"]
    },
    isAI: true
  };
};