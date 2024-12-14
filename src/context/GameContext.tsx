import React, { createContext, useContext, useReducer } from "react";
import type { Character, GameState } from "@/types/game";

type GameAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" }
  | { type: "ADD_LOG"; message: string }
  | { type: "UPDATE_CHARACTER"; character: Character };

const initialState: GameState = {
  characters: [],
  currentTurn: 0,
  gameLog: [],
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