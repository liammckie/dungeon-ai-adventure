import React from "react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";

export const CombatControls = () => {
  const { state, dispatch } = useGame();

  const handleStartCombat = () => {
    dispatch({ type: "START_COMBAT" });
    dispatch({ type: "ADD_LOG", message: "Combat has started! Prepare for battle!" });
  };

  const handleEndCombat = () => {
    dispatch({ type: "END_COMBAT" });
    dispatch({ type: "ADD_LOG", message: "Combat has ended. Rest and recover." });
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
    <div className="flex gap-4 justify-center p-4 bg-parchment rounded-lg border-2 border-fantasy-accent">
      {!state.combatActive ? (
        <Button
          onClick={handleStartCombat}
          className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white font-semibold px-6 py-3"
        >
          Start Combat
        </Button>
      ) : (
        <>
          <Button
            onClick={handleNextTurn}
            className="bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white font-semibold px-6 py-3"
          >
            Next Turn
          </Button>
          <Button
            onClick={handleEndCombat}
            variant="outline"
            className="border-2 border-fantasy-accent text-fantasy-accent hover:bg-fantasy-accent/10 font-semibold px-6 py-3"
          >
            End Combat
          </Button>
        </>
      )}
    </div>
  );
};