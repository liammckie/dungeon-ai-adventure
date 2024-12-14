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

  const handleAttack = (targetId: string) => {
    const attacker = state.characters[state.currentTurn];
    const target = state.characters.find(char => char.id === targetId);
    if (target) {
      dispatch({
        type: "ADD_LOG",
        message: `${attacker.name} attacks ${target.name}!`,
      });
      handleNextTurn();
    }
  };

  const handleDodge = () => {
    const character = state.characters[state.currentTurn];
    dispatch({
      type: "ADD_LOG",
      message: `${character.name} takes the Dodge action, making it harder to be hit until their next turn!`,
    });
    handleNextTurn();
  };

  const handleDash = () => {
    const character = state.characters[state.currentTurn];
    dispatch({
      type: "ADD_LOG",
      message: `${character.name} takes the Dash action, doubling their movement speed!`,
    });
    handleNextTurn();
  };

  const handleHide = () => {
    const character = state.characters[state.currentTurn];
    dispatch({
      type: "ADD_LOG",
      message: `${character.name} attempts to Hide from enemies!`,
    });
    handleNextTurn();
  };

  const handleUseItem = () => {
    const character = state.characters[state.currentTurn];
    dispatch({
      type: "ADD_LOG",
      message: `${character.name} uses an item from their inventory!`,
    });
    handleNextTurn();
  };

  const isPlayerTurn = state.combatActive && !state.characters[state.currentTurn].isAI;

  return (
    <div className="flex flex-col gap-4 p-4 bg-parchment rounded-lg border-2 border-fantasy-accent">
      {!state.combatActive ? (
        <Button
          onClick={handleStartCombat}
          className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white font-semibold px-6 py-3"
        >
          Start Combat
        </Button>
      ) : (
        <div className="space-y-4">
          {isPlayerTurn ? (
            <div className="grid grid-cols-1 gap-2">
              <p className="text-center font-semibold text-fantasy-primary">Your Turn - Choose an Action:</p>
              
              {/* Standard Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button
                  onClick={handleDodge}
                  className="bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white font-semibold"
                >
                  Dodge
                </Button>
                <Button
                  onClick={handleDash}
                  className="bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white font-semibold"
                >
                  Dash
                </Button>
                <Button
                  onClick={handleHide}
                  className="bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white font-semibold"
                >
                  Hide
                </Button>
                <Button
                  onClick={handleUseItem}
                  className="bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white font-semibold"
                >
                  Use Item
                </Button>
              </div>

              {/* Attack Options */}
              <p className="text-center font-semibold text-fantasy-primary mt-4">Attack Targets:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {state.characters
                  .filter(char => char.isAI)
                  .map(target => (
                    <Button
                      key={target.id}
                      onClick={() => handleAttack(target.id)}
                      className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white font-semibold"
                    >
                      Attack {target.name}
                    </Button>
                  ))}
              </div>
            </div>
          ) : (
            <Button
              onClick={handleNextTurn}
              className="bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white font-semibold px-6 py-3 w-full"
            >
              Next Turn
            </Button>
          )}
          <Button
            onClick={handleEndCombat}
            variant="outline"
            className="border-2 border-fantasy-accent text-fantasy-accent hover:bg-fantasy-accent/10 font-semibold px-6 py-3 w-full"
          >
            End Combat
          </Button>
        </div>
      )}
    </div>
  );
};