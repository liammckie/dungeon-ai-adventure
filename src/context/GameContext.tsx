import React, { createContext, useContext, useReducer } from "react";
import type { Character, GameState } from "@/types/game";

type GameAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" }
  | { type: "ADD_LOG"; message: string }
  | { type: "UPDATE_CHARACTER"; character: Character };

const initialCharacters: Character[] = [
  {
    id: "player1",
    name: "Your Character",
    class: "Warrior",
    race: "Human",
    stats: {
      strength: 16,
      dexterity: 14,
      constitution: 15,
      intelligence: 12,
      wisdom: 10,
      charisma: 13,
    },
    hp: 20,
    maxHp: 20,
    inventory: [],
    isAI: false,
  },
  {
    id: "ai1",
    name: "Eldrin the Wise",
    class: "Mage",
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
    inventory: [],
    isAI: true,
  },
  {
    id: "ai2",
    name: "Thorgar Ironbeard",
    class: "Warrior",
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
    inventory: [],
    isAI: true,
  },
];

const initialState: GameState = {
  characters: initialCharacters,
  currentTurn: 0,
  gameLog: ["Welcome to the dungeon! Prepare for combat..."],
  combatActive: false,
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