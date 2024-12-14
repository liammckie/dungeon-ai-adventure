import { GameState } from "@/context/gameState";
import { rollDice } from "@/utils/diceRolls";
import { Character } from "@/types/game";

export const handleCombatAction = (
  action: string,
  state: GameState,
  dispatch: React.Dispatch<any>
) => {
  const currentCharacter = state.characters[state.currentTurn];
  
  switch (action) {
    case "attack": {
      const damage = rollDice({ type: "d8", count: 1 });
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} attacks for ${damage.total} damage!`
      });
      break;
    }
    case "defend": {
      const roll = rollDice({ type: "d20", count: 1 });
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} takes a defensive stance (${roll.total})`
      });
      break;
    }
    default:
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} performs ${action}`
      });
  }

  dispatch({ type: "NEXT_TURN" });
};