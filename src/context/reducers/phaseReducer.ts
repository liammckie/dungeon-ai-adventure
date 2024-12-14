import { GameState } from "../gameState";
import { GamePhase } from "@/types/game";

export const handleSetPhase = (state: GameState, phase: GamePhase): GameState => {
  return {
    ...state,
    currentPhase: phase,
    gameLog: [
      ...state.gameLog,
      `Entering ${phase} phase...`
    ]
  };
};