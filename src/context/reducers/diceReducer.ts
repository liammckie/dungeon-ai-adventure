import { GameState } from "../gameState";
import { DiceRoll, RollType } from "@/types/game";
import { rollDice, rollWithAdvantage, rollWithDisadvantage } from "@/utils/diceRolls";

export const handleRollDice = (
  state: GameState,
  rollType: RollType,
  options?: {
    advantage?: boolean;
    disadvantage?: boolean;
    modifier?: number;
  }
): GameState => {
  const roll: DiceRoll = {
    type: rollType as any,
    count: 1,
    modifier: options?.modifier || 0,
    advantage: options?.advantage,
    disadvantage: options?.disadvantage,
  };

  let result;
  if (options?.advantage) {
    result = rollWithAdvantage(roll);
  } else if (options?.disadvantage) {
    result = rollWithDisadvantage(roll);
  } else {
    result = rollDice(roll);
  }

  return {
    ...state,
    lastRoll: {
      total: result.total,
      rolls: result.rolls,
      type: rollType,
    },
    gameLog: [
      ...state.gameLog,
      `Rolled ${rollType}: ${result.rolls.join(", ")} = ${result.total}`,
    ],
  };
};