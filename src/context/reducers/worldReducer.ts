import { GameState } from "../gameState";

export const handleUpdateWorldState = (
  state: GameState,
  key: string,
  value: any
): GameState => {
  return {
    ...state,
    worldState: {
      ...state.worldState,
      [key]: value
    }
  };
};