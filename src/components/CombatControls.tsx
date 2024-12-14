import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";

export const CombatControls = () => {
  const { state, dispatch } = useGame();

  const handleStartCombat = () => {
    dispatch({ type: "START_COMBAT" });
    dispatch({ type: "ADD_LOG", message: "Combat has started!" });
  };

  const handleEndCombat = () => {
    dispatch({ type: "END_COMBAT" });
    dispatch({ type: "ADD_LOG", message: "Combat has ended." });
  };

  const handleNextTurn = () => {
    dispatch({ type: "NEXT_TURN" });
    const currentCharacter = state.characters[state.currentTurn];
    dispatch({
      type: "ADD_LOG",
      message: `It's ${currentCharacter.name}'s turn!`,
    });
  };

  return (
    <div className="flex gap-4">
      {!state.combatActive ? (
        <Button
          onClick={handleStartCombat}
          className="bg-fantasy-primary hover:bg-fantasy-primary/90"
        >
          Start Combat
        </Button>
      ) : (
        <>
          <Button
            onClick={handleNextTurn}
            className="bg-fantasy-secondary hover:bg-fantasy-secondary/90"
          >
            Next Turn
          </Button>
          <Button
            onClick={handleEndCombat}
            variant="outline"
            className="border-fantasy-accent text-fantasy-accent"
          >
            End Combat
          </Button>
        </>
      )}
    </div>
  );
};