import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Sword, Shield, Running, Eye, Backpack, Heart } from "lucide-react";

export const ActionMenu = () => {
  const { state, dispatch } = useGame();
  const currentCharacter = state.characters[state.currentTurn];
  const isPlayerTurn = state.combatActive && currentCharacter && !currentCharacter.isAI;

  const handleAction = (action: string) => {
    dispatch({
      type: "ADD_LOG",
      message: `${currentCharacter?.name} performs ${action}`,
    });
    // Add more specific action handling here
  };

  if (!isPlayerTurn) return null;

  return (
    <div className="bg-parchment rounded-lg border-2 border-fantasy-frame-border p-4 animate-frame-glow">
      <h3 className="text-lg font-bold text-fantasy-primary mb-4">Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => handleAction("Attack")}
          className="flex items-center gap-2 bg-fantasy-warrior hover:bg-fantasy-warrior/90"
        >
          <Sword className="h-4 w-4" />
          Attack
        </Button>
        <Button
          onClick={() => handleAction("Defend")}
          className="flex items-center gap-2 bg-fantasy-cleric hover:bg-fantasy-cleric/90"
        >
          <Shield className="h-4 w-4" />
          Defend
        </Button>
        <Button
          onClick={() => handleAction("Move")}
          className="flex items-center gap-2 bg-fantasy-rogue hover:bg-fantasy-rogue/90"
        >
          <Running className="h-4 w-4" />
          Move
        </Button>
        <Button
          onClick={() => handleAction("Search")}
          className="flex items-center gap-2 bg-fantasy-mage hover:bg-fantasy-mage/90"
        >
          <Eye className="h-4 w-4" />
          Search
        </Button>
        <Button
          onClick={() => handleAction("Use Item")}
          className="flex items-center gap-2 bg-fantasy-secondary hover:bg-fantasy-secondary/90"
        >
          <Backpack className="h-4 w-4" />
          Use Item
        </Button>
        <Button
          onClick={() => handleAction("Rest")}
          className="flex items-center gap-2 bg-fantasy-primary hover:bg-fantasy-primary/90"
        >
          <Heart className="h-4 w-4" />
          Rest
        </Button>
      </div>
    </div>
  );
};