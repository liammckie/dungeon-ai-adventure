import { GameState } from "../gameState";

export const handleAddLog = (state: GameState, message: string): GameState => {
  return {
    ...state,
    gameLog: [...state.gameLog, message]
  };
};