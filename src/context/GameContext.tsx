import React, { createContext, useContext, useReducer } from "react";
import type { Character, GameState, CharacterClass, CharacterRace } from "@/types/game";

type GameAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" }
  | { type: "ADD_LOG"; message: string }
  | { type: "UPDATE_CHARACTER"; character: Character }
  | { type: "CREATE_CHARACTER"; character: Character }
  | { type: "GAIN_XP"; characterId: string; amount: number };

const initialState: GameState = {
  characters: [],
  currentTurn: 0,
  gameLog: ["Welcome to the dungeon! Create your character to begin..."],
  combatActive: false,
};

const calculateLevelUp = (character: Character): Character => {
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

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START_COMBAT":
      return { ...state, combatActive: true };
    case "END_COMBAT":
      return { ...state, combatActive: false };
    case "NEXT_TURN":
      return { ...state, currentTurn: (state.currentTurn + 1) % state.characters.length };
    case "ADD_LOG":
      return { ...state, gameLog: [...state.gameLog, action.message] };
    case "UPDATE_CHARACTER":
      return {
        ...state,
        characters: state.characters.map((char) =>
          char.id === action.character.id ? action.character : char
        ),
      };
    case "CREATE_CHARACTER":
      const aiCharacters: Character[] = [
        {
          id: "ai1",
          name: "Eldrin the Wise",
          class: "Wizard",
          race: "Elf",
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
          isAI: true,
        },
        {
          id: "ai2",
          name: "Thorgar Ironbeard",
          class: "Fighter",
          race: "Dwarf",
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
          isAI: true,
        },
      ];
      return {
        ...state,
        characters: [action.character, ...aiCharacters],
        gameLog: [...state.gameLog, `${action.character.name} joins the party!`],
      };
    case "GAIN_XP":
      return {
        ...state,
        characters: state.characters.map((char) => {
          if (char.id === action.characterId) {
            const updatedChar = {
              ...char,
              xp: char.xp + action.amount,
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
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
