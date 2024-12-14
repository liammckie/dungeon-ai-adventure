import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { handleCombatAction } from "./CombatUtils";

export const CombatManager = () => {
  const { state, dispatch } = useGame();
  
  const handleAction = (action: string) => {
    handleCombatAction(action, state, dispatch);
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => handleAction("attack")}>Attack</Button>
      <Button onClick={() => handleAction("defend")}>Defend</Button>
    </div>
  );
};