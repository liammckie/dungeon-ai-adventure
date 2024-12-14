import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { rollDice } from "@/utils/diceRolls";

export const CombatInitiator = () => {
  const { state, dispatch } = useGame();
  
  const handleInitiateCombat = () => {
    const initiativeRoll = rollDice({ type: "d20" });
    const initiativeTotal = initiativeRoll.total;
    
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