import { type CharacterRace } from "@/types/character";

export const races: CharacterRace[] = [
  {
    name: "Human",
    abilityScoreIncrease: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
    traits: [
      "Versatile",
      "Extra Language",
    ],
    languages: ["Common", "Choice"],
    speed: 30,
  },
  {
    name: "Elf",
    subrace: "High Elf",
    abilityScoreIncrease: {
      dexterity: 2,
      intelligence: 1,
    },
    traits: [
      "Darkvision",
      "Keen Senses",
      "Fey Ancestry",
      "Trance",
      "Elf Weapon Training",
      "Cantrip",
    ],
    languages: ["Common", "Elvish"],
    speed: 30,
    darkvision: 60,
  },
  {
    name: "Dwarf",
    subrace: "Hill Dwarf",
    abilityScoreIncrease: {
      constitution: 2,
      wisdom: 1,
    },
    traits: [
      "Darkvision",
      "Dwarven Resilience",
      "Dwarven Combat Training",
      "Tool Proficiency",
      "Stonecunning",
      "Dwarven Toughness",
    ],
    languages: ["Common", "Dwarvish"],
    speed: 25,
    darkvision: 60,
  },
  {
    name: "Halfling",
    subrace: "Lightfoot",
    abilityScoreIncrease: {
      dexterity: 2,
      charisma: 1,
    },
    traits: [
      "Lucky",
      "Brave",
      "Halfling Nimbleness",
      "Naturally Stealthy",
    ],
    languages: ["Common", "Halfling"],
    speed: 25,
  },
  {
    name: "Dragonborn",
    abilityScoreIncrease: {
      strength: 2,
      charisma: 1,
    },
    traits: [
      "Draconic Ancestry",
      "Breath Weapon",
      "Damage Resistance",
    ],
    languages: ["Common", "Draconic"],
    speed: 30,
  },
  {
    name: "Gnome",
    subrace: "Forest Gnome",
    abilityScoreIncrease: {
      intelligence: 2,
      dexterity: 1,
    },
    traits: [
      "Darkvision",
      "Gnome Cunning",
      "Natural Illusionist",
      "Speak with Small Beasts",
    ],
    languages: ["Common", "Gnomish"],
    speed: 25,
    darkvision: 60,
  },
  {
    name: "Half-Elf",
    abilityScoreIncrease: {
      charisma: 2,
      // Two other ability scores of choice increase by 1
    },
    traits: [
      "Darkvision",
      "Fey Ancestry",
      "Skill Versatility",
    ],
    languages: ["Common", "Elvish"],
    speed: 30,
    darkvision: 60,
  },
  {
    name: "Tiefling",
    abilityScoreIncrease: {
      charisma: 2,
      intelligence: 1,
    },
    traits: [
      "Darkvision",
      "Hellish Resistance",
      "Infernal Legacy",
    ],
    languages: ["Common", "Infernal"],
    speed: 30,
    darkvision: 60,
  },
];