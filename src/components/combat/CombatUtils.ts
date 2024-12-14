import { Character } from "@/types/game";
import { rollDice } from "@/utils/diceRolls";
import { GameState } from "@/context/gameState";
import { GameAction } from "@/types/actions";

export const calculateDamage = (attacker: Character) => {
  const weaponDamage = rollDice({ type: "d8" }).total;
  const strengthMod = Math.floor((attacker.stats.strength - 10) / 2);
  return weaponDamage + strengthMod;
};

export const calculateHit = (attacker: Character, targetAC: number = 12) => {
  const strengthMod = Math.floor((attacker.stats.strength - 10) / 2);
  const proficiencyBonus = 2;
  const toHitRoll = rollDice({ type: "d20" }).total + strengthMod + proficiencyBonus;
  return toHitRoll >= targetAC;
};

export const calculateHealAmount = (character: Character) => {
  return Math.floor(character.maxHp * 0.25);
};

export const handleCombatAction = (
  action: string,
  state: GameState,
  dispatch: React.Dispatch<GameAction>
) => {
  const currentCharacter = state.characters[state.currentTurn];
  
  switch (action) {
    case "attack":
      const damage = calculateDamage(currentCharacter);
      dispatch({ 
        type: "ADD_LOG", 
        message: `${currentCharacter.name} attacks for ${damage} damage!` 
      });
      break;
    case "defend":
      dispatch({ 
        type: "ADD_LOG", 
        message: `${currentCharacter.name} takes a defensive stance.` 
      });
      break;
    default:
      break;
  }
  
  dispatch({ type: "NEXT_TURN" });
};