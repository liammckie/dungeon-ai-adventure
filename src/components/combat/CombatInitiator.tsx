import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { rollDice } from "@/utils/diceRolls";

export const CombatInitiator = () => {
  const { dispatch } = useGame();
  
  const handleInitiateCombat = () => {
    const initiativeRoll = rollDice({ 
      type: "d20",
      count: 1,
      modifier: 0
    });
    
    dispatch({ 
      type: "START_COMBAT"
    });
  };

  return (
    <Button 
      onClick={handleInitiateCombat}
      variant="destructive"
      className="w-full"
    >
      Initiate Combat
    </Button>
  );
};