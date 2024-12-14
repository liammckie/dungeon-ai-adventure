import { GameState } from "../gameState";
import { RollType, RollResult } from "@/types/game";
import {
  rollAbilityCheck,
  rollSavingThrow,
  rollAttack,
  rollDamage,
  rollInitiative
} from "@/utils/diceRolls";

interface RollOptions {
  abilityModifier?: number;
  proficiencyBonus?: number;
  advantage?: boolean;
  disadvantage?: boolean;
  diceCount?: number;
  diceType?: string;
  isCritical?: boolean;
}

export const handleRollDice = (
  state: GameState,
  rollType: RollType,
  options: RollOptions
): GameState => {
  let result: RollResult;

  switch (rollType) {
    case "ability":
      result = rollAbilityCheck(
        options.abilityModifier || 0,
        options.proficiencyBonus,
        { advantage: options.advantage, disadvantage: options.disadvantage }
      );
      break;
    case "saving":
      result = rollSavingThrow(
        options.abilityModifier || 0,
        { advantage: options.advantage, disadvantage: options.disadvantage }
      );
      break;
    case "attack":
      result = rollAttack(
        options.abilityModifier || 0,
        { advantage: options.advantage, disadvantage: options.disadvantage }
      );
      break;
    case "damage":
      result = rollDamage(
        options.diceCount || 1,
        options.diceType || 'd6',
        options.abilityModifier || 0,
        options.isCritical
      );
      break;
    case "initiative":
      result = rollInitiative(
        options.abilityModifier || 0,
        { advantage: options.advantage, disadvantage: options.disadvantage }
      );
      break;
    default:
      result = rollAbilityCheck(
        options.abilityModifier || 0,
        options.proficiencyBonus,
        { advantage: options.advantage, disadvantage: options.disadvantage }
      );
  }

  return {
    ...state,
    lastRoll: result,
    gameLog: [
      ...state.gameLog,
      `Roll Result (${rollType}): ${result.total} [${result.rolls.join(', ')}]${
        result.modifier ? ` + ${result.modifier}` : ''
      }${result.isNatural20 ? ' (Natural 20!)' : ''}${
        result.isNatural1 ? ' (Natural 1!)' : ''
      }${result.isCritical ? ' (Critical!)' : ''}`
    ]
  };
};