import React from "react";
import { Character } from "@/types/game";

interface CombatTurnIndicatorProps {
  currentCharacter: Character;
  isPlayerTurn: boolean;
}

export const CombatTurnIndicator = ({ currentCharacter, isPlayerTurn }: CombatTurnIndicatorProps) => {
  return (
    <div className="p-4 bg-black/70 rounded-lg border border-fantasy-frame-border mb-4">
      <h3 className="text-lg font-bold text-fantasy-primary">
        {currentCharacter.name}'s Turn
      </h3>
      <p className="text-sm text-fantasy-secondary">
        {isPlayerTurn ? "Choose your action..." : "Enemy is planning their move..."}
      </p>
    </div>
  );
};