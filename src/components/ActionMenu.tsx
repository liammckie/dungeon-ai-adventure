import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Sword, Shield, MoveRight, Eye, Backpack, Heart } from "lucide-react";

export const ActionMenu = () => {
  const { state, dispatch } = useGame();
  const currentCharacter = state.characters[state.currentTurn];
  const isPlayerTurn = state.combatActive && currentCharacter && !currentCharacter.isAI;

  const handleAction = (action: string) => {
    dispatch({
      type: "ADD_LOG",
      message: `${currentCharacter?.name} performs ${action}`,
    });
  };

  if (!isPlayerTurn) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        onClick={() => handleAction("Attack")}
        className="flex items-center gap-2 bg-gradient-to-br from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 border border-fantasy-frame-border"
      >
        <Sword className="h-4 w-4" />
        Attack
      </Button>
      <Button
        onClick={() => handleAction("Defend")}
        className="flex items-center gap-2 bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 border border-fantasy-frame-border"
      >
        <Shield className="h-4 w-4" />
        Defend
      </Button>
      <Button
        onClick={() => handleAction("Move")}
        className="flex items-center gap-2 bg-gradient-to-br from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 border border-fantasy-frame-border"
      >
        <MoveRight className="h-4 w-4" />
        Move
      </Button>
      <Button
        onClick={() => handleAction("Search")}
        className="flex items-center gap-2 bg-gradient-to-br from-yellow-700 to-yellow-900 hover:from-yellow-600 hover:to-yellow-800 border border-fantasy-frame-border"
      >
        <Eye className="h-4 w-4" />
        Search
      </Button>
      <Button
        onClick={() => handleAction("Use Item")}
        className="flex items-center gap-2 bg-gradient-to-br from-green-700 to-green-900 hover:from-green-600 hover:to-green-800 border border-fantasy-frame-border"
      >
        <Backpack className="h-4 w-4" />
        Use Item
      </Button>
      <Button
        onClick={() => handleAction("Rest")}
        className="flex items-center gap-2 bg-gradient-to-br from-pink-700 to-pink-900 hover:from-pink-600 hover:to-pink-800 border border-fantasy-frame-border"
      >
        <Heart className="h-4 w-4" />
        Rest
      </Button>
    </div>
  );
};