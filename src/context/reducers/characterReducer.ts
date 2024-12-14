import { GameState } from "../gameState";
import { Character } from "@/types/game";
import { calculateLevelUp } from "../levelingUtils";

export const handleUpdateCharacter = (state: GameState, character: Character): GameState => {
  return {
    ...state,
    characters: state.characters.map((char) =>
      char.id === character.id ? character : char
    ),
  };
};

export const handleCreateCharacter = (state: GameState, character: Character): GameState => {
  const aiCharacters: Character[] = [
    {
      id: "ai1",
      name: "Eldrin the Wise",
      class: "Wizard",
      race: "Elf",
      background: "Sage",
      stats: {
        strength: 8,
        dexterity: 14,
        constitution: 12,
        intelligence: 17,
        wisdom: 15,
        charisma: 14,
      },
      hp: 15,
      maxHp: 15,
      level: 1,
      xp: 0,
      inventory: [],
      traits: [],
      proficiencies: {
        armor: [],
        weapons: ["Dagger", "Dart", "Sling", "Quarterstaff", "Light Crossbow"],
        tools: [],
        skills: ["Arcana", "History"],
        languages: ["Common", "Elvish"],
        saves: ["intelligence", "wisdom"],
      },
      isAI: true,
    },
    {
      id: "ai2",
      name: "Thorgar Ironbeard",
      class: "Fighter",
      race: "Dwarf",
      background: "Soldier",
      stats: {
        strength: 17,
        dexterity: 12,
        constitution: 16,
        intelligence: 10,
        wisdom: 12,
        charisma: 11,
      },
      hp: 25,
      maxHp: 25,
      level: 1,
      xp: 0,
      inventory: [],
      traits: [],
      proficiencies: {
        armor: ["Light", "Medium", "Heavy", "Shields"],
        weapons: ["Simple", "Martial"],
        tools: [],
        skills: ["Athletics", "Intimidation"],
        languages: ["Common", "Dwarvish"],
        saves: ["strength", "constitution"],
      },
      isAI: true,
    },
  ];
  
  return {
    ...state,
    characters: [character, ...aiCharacters],
    gameLog: [...state.gameLog, `${character.name} joins the party!`],
  };
};

export const handleGainXP = (state: GameState, characterId: string, amount: number): GameState => {
  return {
    ...state,
    characters: state.characters.map((char) => {
      if (char.id === characterId) {
        const updatedChar = {
          ...char,
          xp: char.xp + amount,
        };
        const leveledChar = calculateLevelUp(updatedChar);
        if (leveledChar.level > char.level) {
          state.gameLog.push(`${char.name} has reached level ${leveledChar.level}!`);
        }
        return leveledChar;
      }
      return char;
    }),
  };
};