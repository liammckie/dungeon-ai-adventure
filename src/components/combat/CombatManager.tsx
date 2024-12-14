import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/hooks/use-toast";
import { Character } from "@/types/game";
import { CombatActions } from "./CombatActions";
import { TargetSelector } from "./TargetSelector";
import { CombatMessage } from "./CombatMessage";
import { CombatTurnIndicator } from "./CombatTurnIndicator";
import { calculateDamage, calculateHit, calculateHealAmount } from "./CombatUtils";

interface CharacterTurnState {
  id: string;
  actionBar: number;
  isReady: boolean;
}

export const CombatManager = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [turnStates, setTurnStates] = useState<CharacterTurnState[]>([]);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);
  const currentCharacter = state.characters[state.currentTurn];
  const TURN_SPEED = 100;

  useEffect(() => {
    if (state.combatActive) {
      setTurnStates(state.characters.map(char => ({
        id: char.id,
        actionBar: 0,
        isReady: false
      })));
    }
  }, [state.combatActive]);

  useEffect(() => {
    if (state.combatActive && !isProcessingTurn) {
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
  }, [state.combatActive, isProcessingTurn]);

  const handleAttack = async (target: Character) => {
    if (!currentCharacter) return;
    setIsProcessingTurn(true);

    const hits = calculateHit(currentCharacter);
    
    if (hits) {
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

      // Show combat message
      toast({
        title: "Hit!",
        description: <CombatMessage 
          type="attack"
          attacker={currentCharacter.name}
          target={target.name}
          damage={damage}
        />,
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
        description: <CombatMessage 
          type="miss"
          attacker={currentCharacter.name}
          target={target.name}
        />,
      });
    }
    
    // Add a delay before ending the turn
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessingTurn(false);
    handleNextTurn();
  };

  const handleAction = async (actionType: string) => {
    if (!currentCharacter) return;
    setSelectedAction(actionType);
    setIsProcessingTurn(true);

    if (actionType !== "attack") {
      switch (actionType) {
        case "defend":
          dispatch({
            type: "ADD_LOG",
            message: `${currentCharacter.name} takes a defensive stance.`
          });
          toast({
            description: <CombatMessage 
              type="defend"
              attacker={currentCharacter.name}
              target=""
            />,
          });
          break;
        case "rest":
          const healAmount = calculateHealAmount(currentCharacter);
          dispatch({
            type: "UPDATE_CHARACTER",
            character: {
              ...currentCharacter,
              hp: Math.min(currentCharacter.maxHp, currentCharacter.hp + healAmount)
            }
          });
          dispatch({
            type: "ADD_LOG",
            message: `${currentCharacter.name} recovers ${healAmount} HP.`
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
      }
      
      // Add a delay before ending the turn
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessingTurn(false);
      handleNextTurn();
    }
  };

  const handleNextTurn = () => {
    setSelectedAction(null);
    setTurnStates(prev => prev.map(ts => 
      ts.id === currentCharacter?.id ? { ...ts, actionBar: 0, isReady: false } : ts
    ));
    
    dispatch({ type: "NEXT_TURN" });
    
    const nextCharacter = state.characters[(state.currentTurn + 1) % state.characters.length];
    
    if (nextCharacter) {
      toast({
        description: <CombatTurnIndicator 
          currentCharacter={nextCharacter}
          isPlayerTurn={!nextCharacter.isAI}
        />,
      });

      if (nextCharacter.isAI) {
        setTimeout(async () => {
          const playerCharacter = state.characters.find(char => !char.isAI);
          if (playerCharacter) {
            await handleAttack(playerCharacter);
          }
        }, 2000);
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
      {currentCharacter && (
        <CombatTurnIndicator 
          currentCharacter={currentCharacter}
          isPlayerTurn={isPlayerTurn}
        />
      )}

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

      {isPlayerTurn && readyCharacters.some(ts => ts.id === currentCharacter.id) && !selectedAction && !isProcessingTurn && (
        <CombatActions 
          onAction={handleAction}
          character={currentCharacter}
        />
      )}

      {isPlayerTurn && selectedAction === "attack" && !isProcessingTurn && (
        <TargetSelector
          targets={getPossibleTargets()}
          onTargetSelect={handleAttack}
          onCancel={() => setSelectedAction(null)}
        />
      )}

      {!isPlayerTurn && !isProcessingTurn && (
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
