import React from "react";
import { Character } from "@/types/game";

interface HealthManagerProps {
  character: Character;
  onHealthChange: (newHealth: number) => void;
}

export const HealthManager = ({ character, onHealthChange }: HealthManagerProps) => {
  const healthPercentage = (character.hp / character.maxHp) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>{character.name}</span>
        <span>{character.hp}/{character.maxHp} HP</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-500 transition-all duration-300"
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
    </div>
  );
};