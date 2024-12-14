import { type CharacterRace } from "@/types/character";

export const races: CharacterRace[] = [
  {
    name: "High Elf",
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
    name: "Wood Elf",
    subrace: "Wood Elf",
    abilityScoreIncrease: {
      dexterity: 2,
      wisdom: 1,
    },
    traits: [
      "Darkvision",
      "Keen Senses",
      "Fey Ancestry",
      "Trance",
      "Fleet of Foot",
      "Mask of the Wild",
    ],
    languages: ["Common", "Elvish"],
    speed: 35,
    darkvision: 60,
  },
  {
    name: "Hill Dwarf",
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
];