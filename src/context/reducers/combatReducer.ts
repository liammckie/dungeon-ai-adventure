import { GameState } from "../gameState";

export const handleStartCombat = (state: GameState): GameState => {
  return { ...state, combatActive: true };
};

export const handleEndCombat = (state: GameState): GameState => {
  return { ...state, combatActive: false };
};

export const handleNextTurn = (state: GameState): GameState => {
  return { ...state, currentTurn: (state.currentTurn + 1) % state.characters.length };
};