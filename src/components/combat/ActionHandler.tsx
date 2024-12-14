import { Character } from "@/types/game";
import { Dispatch } from "react";
import { GameAction } from "@/types/actions";
import { CombatMessageType } from "./CombatMessage";

export const handleCombatAction = (
  action: string,
  currentCharacter: Character,
  dispatch: Dispatch<GameAction>,
  onNextTurn: () => void,
  showToast: (props: { description: React.ReactNode }) => void
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
      showToast({
        description: {
          type: "heal" as CombatMessageType,
          target: currentCharacter.name,
          healing: healAmount,
        },
      });
      onNextTurn();
      break;

    case "move":
    case "useItem":
      // Implement these actions later
      onNextTurn();
      break;
  }
};