import React from "react";
import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/hooks/use-toast";
import { Character } from "@/types/game";
import { CombatActions } from "./CombatActions";
import { TargetSelector } from "./TargetSelector";
import { rollDice } from "@/context/diceUtils";

export const CombatManager = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const currentCharacter = state.characters[state.currentTurn];

  const calculateDamage = (attacker: Character) => {
    const weaponDamage = rollDice({ type: "d8" });
    const strengthMod = Math.floor((attacker.stats.strength - 10) / 2);
    return weaponDamage + strengthMod;
  };

  const handleAttack = (target: Character) => {
    if (!currentCharacter) return;

    const strengthMod = Math.floor((currentCharacter.stats.strength - 10) / 2);
    const proficiencyBonus = 2;
    const toHitRoll = rollDice({ type: "d20" }) + strengthMod + proficiencyBonus;
    const targetAC = 12;

    if (toHitRoll >= targetAC) {
      const damage = calculateDamage(currentCharacter);
      const newHP = Math.max(0, target.hp - damage);
      
      dispatch({
        type: "UPDATE_CHARACTER",
        character: {
          ...target,
          hp: newHP
        }
      });

      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} hits ${target.name} for ${damage} damage!`
      });

      toast({
        title: "Hit!",
        description: `Dealt ${damage} damage to ${target.name}`,
      });

      if (newHP <= 0) {
        dispatch({
          type: "ADD_LOG",
          message: `${target.name} has been defeated!`
        });
      }
    } else {
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name}'s attack missed ${target.name}!`
      });

      toast({
        title: "Miss!",
        description: `The attack missed ${target.name}`,
      });
    }
    
    handleNextTurn();
  };

  const handleAction = (actionType: string) => {
    if (!currentCharacter) return;
    setSelectedAction(actionType);

    if (actionType !== "attack") {
      switch (actionType) {
        case "defend":
          dispatch({
            type: "ADD_LOG",
            message: `${currentCharacter.name} takes a defensive stance.`
          });
          break;
        case "move":
          dispatch({
            type: "ADD_LOG",
            message: `${currentCharacter.name} moves to a new position.`
          });
          break;
        case "useItem":
          dispatch({
            type: "ADD_LOG",
            message: `${currentCharacter.name} uses an item.`
          });
          break;
        case "rest":
          const healAmount = Math.floor(currentCharacter.maxHp * 0.25);
          dispatch({
            type: "UPDATE_CHARACTER",
            character: {
              ...currentCharacter,
              hp: Math.min(currentCharacter.maxHp, currentCharacter.hp + healAmount)
            }
          });
          dispatch({
            type: "ADD_LOG",
            message: `${currentCharacter.name} takes a moment to catch their breath and recovers ${healAmount} HP.`
          });
          break;
      }
      handleNextTurn();
    }
  };

  const handleNextTurn = () => {
    setSelectedAction(null);
    dispatch({ type: "NEXT_TURN" });
    
    const nextCharacter = state.characters[(state.currentTurn + 1) % state.characters.length];
    
    if (nextCharacter) {
      toast({
        title: `${nextCharacter.name}'s Turn`,
        description: "Choose your action wisely...",
      });

      if (nextCharacter.isAI) {
        setTimeout(() => {
          const playerCharacter = state.characters.find(char => !char.isAI);
          if (playerCharacter) {
            handleAttack(playerCharacter);
          }
        }, 1500);
      }
    }
  };

  const getPossibleTargets = () => {
    return state.characters.filter(char => 
      char.isAI !== currentCharacter?.isAI && char.hp > 0
    );
  };

  const isPlayerTurn = currentCharacter && !currentCharacter.isAI;

  return (
    <div className="space-y-4 animate-fade-in">
      {isPlayerTurn && !selectedAction && (
        <CombatActions 
          onAction={handleAction}
          character={currentCharacter}
        />
      )}

      {isPlayerTurn && selectedAction === "attack" && (
        <TargetSelector
          targets={getPossibleTargets()}
          onTargetSelect={handleAttack}
          onCancel={() => setSelectedAction(null)}
        />
      )}

      {!isPlayerTurn && (
        <Button
          onClick={handleNextTurn}
          className="w-full bg-fantasy-secondary hover:bg-fantasy-secondary/90"
        >
          <FastForward className="mr-2 h-4 w-4" />
          Next Turn
        </Button>
      )}
    </div>
  );
};