import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Sword, 
  Shield, 
  FastForward, 
  ArrowRight, 
  Heart, 
  Backpack 
} from "lucide-react";

export const CombatControls = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const currentCharacter = state.characters[state.currentTurn];

  const handleStartCombat = () => {
    // Roll initiative for all characters
    const initiativeOrder = state.characters.map(char => ({
      id: char.id,
      initiative: Math.floor(Math.random() * 20) + 1 + Math.floor((char.stats.dexterity - 10) / 2)
    }))
    .sort((a, b) => b.initiative - a.initiative);

    dispatch({ 
      type: "START_COMBAT",
      initiativeOrder: initiativeOrder.map(char => char.id)
    });
    
    toast({
      title: "Combat Started",
      description: "Roll for initiative! Combat begins...",
    });
  };

  const handleEndCombat = () => {
    dispatch({ type: "END_COMBAT" });
    toast({
      title: "Combat Ended",
      description: "The battle is over. Time to rest and recover.",
    });
  };

  const handleAction = (actionType: string) => {
    if (!currentCharacter) return;

    switch (actionType) {
      case "attack":
        dispatch({
          type: "ADD_LOG",
          message: `${currentCharacter.name} attacks!`
        });
        break;
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
  };

  const handleNextTurn = () => {
    dispatch({ type: "NEXT_TURN" });
    
    // Get the new current character after turn change
    const nextCharacter = state.characters[(state.currentTurn + 1) % state.characters.length];
    
    if (nextCharacter) {
      toast({
        title: `${nextCharacter.name}'s Turn`,
        description: "Choose your action wisely...",
      });
    }
  };

  const isPlayerTurn = currentCharacter && !currentCharacter.isAI;

  if (!state.combatActive) {
    return (
      <Button
        onClick={handleStartCombat}
        className="w-full bg-fantasy-primary hover:bg-fantasy-primary/90"
      >
        <Sword className="mr-2 h-4 w-4" />
        Start Combat
      </Button>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {isPlayerTurn ? (
          <>
            <Button
              onClick={() => handleAction("attack")}
              className="bg-fantasy-warrior hover:bg-fantasy-warrior/90"
            >
              <Sword className="mr-2 h-4 w-4" />
              Attack
            </Button>
            <Button
              onClick={() => handleAction("defend")}
              className="bg-fantasy-cleric hover:bg-fantasy-cleric/90"
            >
              <Shield className="mr-2 h-4 w-4" />
              Defend
            </Button>
            <Button
              onClick={() => handleAction("move")}
              className="bg-fantasy-rogue hover:bg-fantasy-rogue/90"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Move
            </Button>
            <Button
              onClick={() => handleAction("useItem")}
              className="bg-fantasy-mage hover:bg-fantasy-mage/90"
            >
              <Backpack className="mr-2 h-4 w-4" />
              Use Item
            </Button>
            <Button
              onClick={() => handleAction("rest")}
              className="col-span-2 bg-fantasy-primary hover:bg-fantasy-primary/90"
            >
              <Heart className="mr-2 h-4 w-4" />
              Rest
            </Button>
          </>
        ) : (
          <Button
            onClick={handleNextTurn}
            className="col-span-2 bg-fantasy-secondary hover:bg-fantasy-secondary/90"
          >
            <FastForward className="mr-2 h-4 w-4" />
            Next Turn
          </Button>
        )}
      </div>

      <Button
        onClick={handleEndCombat}
        variant="outline"
        className="w-full border-2 border-fantasy-accent text-fantasy-accent hover:bg-fantasy-accent/10"
      >
        End Combat
      </Button>
    </div>
  );
};