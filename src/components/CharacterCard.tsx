import React from "react";
import { Character } from "@/types/game";
import { Progress } from "@/components/ui/progress";
import { Shield, Skull } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const healthPercentage = (character.hp / character.maxHp) * 100;
  
  return (
    <div className="bg-black/40 rounded-lg p-4 border border-fantasy-frame-border">
      <div className="flex items-start gap-4">
        {character.imageUrl ? (
          <img 
            src={character.imageUrl} 
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-fantasy-frame-border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-fantasy-frame-border">
            {character.isHostile ? (
              <Skull className="w-8 h-8 text-red-500" />
            ) : (
              <Shield className="w-8 h-8 text-blue-500" />
            )}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{character.name}</h3>
          <p className="text-sm text-gray-300">Level {character.level} {character.class}</p>
          {character.description && (
            <p className="text-sm text-gray-400 mt-1">{character.description}</p>
          )}
          
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">HP</span>
              <span className="text-gray-300">
                {character.hp}/{character.maxHp}
                {character.temporaryHp ? ` (+${character.temporaryHp})` : ""}
              </span>
            </div>
            <Progress value={healthPercentage} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};