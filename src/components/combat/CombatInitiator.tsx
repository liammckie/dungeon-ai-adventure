import React from "react";
import { Button } from "@/components/ui/button";
import { Sword } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/hooks/use-toast";
import { rollDice } from "@/context/diceUtils";

export const CombatInitiator = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();

  const handleStartCombat = () => {
    const initiativeOrder = state.characters.map(char => ({
      id: char.id,
      initiative: rollDice({ type: "d20" }) + Math.floor((char.stats.dexterity - 10) / 2)
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

  return null;
};