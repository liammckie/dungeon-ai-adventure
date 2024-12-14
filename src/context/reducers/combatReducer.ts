import { GameState } from "../gameState";

export const handleStartCombat = (state: GameState, initiativeOrder?: string[]): GameState => {
  return {
    ...state,
    combatActive: true,
    currentTurn: 0,
    initiativeOrder: initiativeOrder || state.characters.map(char => char.id),
    gameLog: [
      ...state.gameLog,
      "Combat begins! Everyone roll for initiative!"
    ]
  };
};

export const handleEndCombat = (state: GameState): GameState => {
  return {
    ...state,
    combatActive: false,
    currentTurn: 0,
    initiativeOrder: [],
    gameLog: [
      ...state.gameLog,
      "Combat ends. The dust settles..."
    ]
  };
};

export const handleNextTurn = (state: GameState): GameState => {
  const nextTurn = (state.currentTurn + 1) % state.characters.length;
  const nextCharacter = state.characters[nextTurn];
  
  return {
    ...state,
    currentTurn: nextTurn,
    gameLog: [
      ...state.gameLog,
      `It's ${nextCharacter?.name}'s turn!`
    ]
  };
};