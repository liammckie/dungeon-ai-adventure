import React from "react";
import { Character } from "@/types/game";

interface TurnManagerProps {
  characters: Character[];
  currentTurn: number;
  onNextTurn: () => void;
}

export const TurnManager = ({ characters, currentTurn, onNextTurn }: TurnManagerProps) => {
  const currentCharacter = characters[currentTurn];
  
  return (
    <div className="space-y-2">
      {characters.map((char, index) => (
        <div key={char.id} className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            index === currentTurn ? 'bg-yellow-400' : 'bg-gray-400'
          }`} />
          <span className="text-sm font-medium text-fantasy-primary">
            {char.name}
          </span>
        </div>
      ))}
    </div>
  );
};