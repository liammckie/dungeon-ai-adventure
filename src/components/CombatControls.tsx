import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { useToast } from "@/hooks/use-toast";
import { CombatInitiator } from "./combat/CombatInitiator";
import { CombatManager } from "./combat/CombatManager";

export const CombatControls = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();

  const handleEndCombat = () => {
    dispatch({ type: "END_COMBAT" });
    toast({
      title: "Combat Ended",
      description: "The battle is over. Time to rest and recover.",
    });
  };

  return (
    <div className="space-y-4">
      <CombatInitiator />
      {state.combatActive && (
        <>
          <CombatManager />
          <Button
            onClick={handleEndCombat}
            variant="outline"
            className="w-full border-2 border-fantasy-accent text-fantasy-accent hover:bg-fantasy-accent/10"
          >
            End Combat
          </Button>
        </>
      )}
    </div>
  );
};