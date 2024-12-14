import { Character } from "@/types/game";
import { GameAction } from "@/types/actions";
import { Dispatch } from "react";
import { Toast } from "@/components/ui/use-toast";

export const handleAction = (
  action: string,
  currentCharacter: Character,
  dispatch: Dispatch<GameAction>,
  onNextTurn: () => void,
  showToast: (props: Toast) => void
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
      const healAmount = Math.floor(currentCharacter.maxHp * 0.2);
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
      showToast({
        title: "Healing",
        description: `${currentCharacter.name} healed for ${healAmount} HP`
      });
      onNextTurn();
      break;

    default:
      console.warn(`Unhandled action: ${action}`);
      break;
  }
};