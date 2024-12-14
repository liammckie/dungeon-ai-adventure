import { Character } from "@/types/game";
import { Dispatch } from "react";
import { GameAction } from "@/types/actions";
import { CombatMessageType } from "./CombatMessage";

export const handleCombatAction = (
  action: string,
  currentCharacter: Character,
  dispatch: Dispatch<GameAction>,
  onNextTurn: () => void,
  showToast: (message: string) => void
) => {
  switch (action) {
    case "defend":
      dispatch({
        type: "UPDATE_CHARACTER",
        character: {
          ...currentCharacter,
          temporaryHp: (currentCharacter.temporaryHp || 0) + 2,
        },
      });
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} takes a defensive stance.`
      });
      onNextTurn();
      break;

    case "rest":
      const healAmount = Math.floor(currentCharacter.maxHp * 0.25);
      dispatch({
        type: "UPDATE_CHARACTER",
        character: {
          ...currentCharacter,
          hp: Math.min(currentCharacter.maxHp, currentCharacter.hp + healAmount),
        },
      });
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} rests and recovers ${healAmount} HP.`
      });
      showToast(`${currentCharacter.name} healed for ${healAmount} HP`);
      onNextTurn();
      break;

    case "move":
    case "useItem":
      // Implement these actions later
      onNextTurn();
      break;
  }
};