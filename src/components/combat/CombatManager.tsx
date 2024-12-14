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
import { calculateDamage, calculateHit } from "./CombatUtils";
import { TurnManager } from "./TurnManager";
import { HealthManager } from "./HealthManager";

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
  const [isAITurnInProgress, setIsAITurnInProgress] = useState(false);
  const currentCharacter = state.characters[state.currentTurn];
  
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
    // Only process AI turns when it's their turn and no other processing is happening
    if (currentCharacter?.isAI && !isProcessingTurn && !isAITurnInProgress) {
      handleAITurn();
    }
  }, [currentCharacter, isProcessingTurn]);

  const handleAITurn = async () => {
    if (!currentCharacter?.isAI) return;
    
    setIsAITurnInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for visibility
    
    const playerCharacter = state.characters.find(char => !char.isAI);
    if (playerCharacter) {
      await handleAttack(playerCharacter);
    }
    
    setIsAITurnInProgress(false);
  };

  const handleAttack = async (target: Character) => {
    if (!currentCharacter || isProcessingTurn) return;
    setIsProcessingTurn(true);

    const hits = calculateHit(currentCharacter);
    
    if (hits) {
      const damage = calculateDamage(currentCharacter);
      const newHP = Math.max(0, target.hp - damage);
      
      // Update character health
      dispatch({
        type: "UPDATE_CHARACTER",
        character: {
          ...target,
          hp: newHP
        }
      });

      // Log the attack
      dispatch({
        type: "ADD_LOG",
        message: `${currentCharacter.name} hits ${target.name} for ${damage} damage!`
      });

      // Show combat message
      toast({
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
        <>
          <CombatTurnIndicator 
            currentCharacter={currentCharacter}
            isPlayerTurn={!currentCharacter.isAI}
          />
          
          <TurnManager 
            characters={state.characters}
            currentTurn={state.currentTurn}
            onNextTurn={handleNextTurn}
          />
          
          <div className="space-y-4">
            {state.characters.map(char => (
              <HealthManager
                key={char.id}
                character={char}
                onHealthChange={(newHealth) => {
                  dispatch({
                    type: "UPDATE_CHARACTER",
                    character: { ...char, hp: newHealth }
                  });
                }}
              />
            ))}
          </div>
        </>
      )}

      {!currentCharacter?.isAI && !isProcessingTurn && !selectedAction && (
        <CombatActions 
          onAction={handleAction}
          character={currentCharacter}
        />
      )}

      {!currentCharacter?.isAI && selectedAction === "attack" && !isProcessingTurn && (
        <TargetSelector
          targets={getPossibleTargets()}
          onTargetSelect={handleAttack}
          onCancel={() => setSelectedAction(null)}
        />
      )}
    </div>
  );
};
