import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/hooks/use-toast";
import { Character } from "@/types/game";
import { CombatActions } from "./CombatActions";
import { TargetSelector } from "./TargetSelector";
import { rollDice } from "@/context/diceUtils";

interface CharacterTurnState {
  id: string;
  actionBar: number;
  isReady: boolean;
}

export const CombatManager = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const [turnStates, setTurnStates] = useState<CharacterTurnState[]>([]);
  const currentCharacter = state.characters[state.currentTurn];
  const TURN_SPEED = 100; // Lower is faster

  // Initialize turn states for all characters
  useEffect(() => {
    if (state.combatActive) {
      setTurnStates(state.characters.map(char => ({
        id: char.id,
        actionBar: 0,
        isReady: false
      })));
    }
  }, [state.combatActive]);

  // Action bar fill effect
  useEffect(() => {
    if (state.combatActive) {
      const interval = setInterval(() => {
        setTurnStates(prev => prev.map(turnState => {
          if (turnState.actionBar >= 100) return turnState;
          
          const speed = state.characters.find(c => c.id === turnState.id)?.stats.dexterity || 10;
          const increment = (speed / TURN_SPEED) * 2;
          const newValue = Math.min(100, turnState.actionBar + increment);
          
          return {
            ...turnState,
            actionBar: newValue,
            isReady: newValue >= 100
          };
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [state.combatActive]);

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
    // Reset the current character's action bar
    setTurnStates(prev => prev.map(ts => 
      ts.id === currentCharacter?.id ? { ...ts, actionBar: 0, isReady: false } : ts
    ));
    
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
  const readyCharacters = turnStates.filter(ts => ts.isReady);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Action Bars */}
      <div className="space-y-2">
        {turnStates.map((ts) => {
          const char = state.characters.find(c => c.id === ts.id);
          if (!char) return null;
          
          return (
            <div key={ts.id} className="flex items-center gap-2">
              <span className="w-24 text-sm font-medium text-fantasy-primary truncate">
                {char.name}
              </span>
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-100 rounded-full ${
                    ts.isReady ? 'bg-yellow-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${ts.actionBar}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {isPlayerTurn && readyCharacters.some(ts => ts.id === currentCharacter.id) && !selectedAction && (
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