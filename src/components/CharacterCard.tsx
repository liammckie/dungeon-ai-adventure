import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Character } from "@/types/game";
import { Shield } from "lucide-react";

export const CharacterCard = ({ character }: { character: Character }) => {
  const healthPercentage = (character.hp / character.maxHp) * 100;

  return (
    <Card className="p-4 bg-parchment border-fantasy-accent">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16 rounded-full border-2 border-fantasy-accent">
          {character.imageUrl ? (
            <AvatarImage src={character.imageUrl} alt={character.name} />
          ) : (
            <AvatarFallback className="bg-fantasy-primary text-white">
              {character.name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-fantasy-primary">{character.name}</h3>
            {!character.isHostile && (
              <Shield className="h-4 w-4 text-green-500" />
            )}
          </div>
          <p className="text-sm text-fantasy-secondary">
            Level {character.level} {String(character.race)} {String(character.class)}
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>HP</span>
              <span>{character.hp}/{character.maxHp}</span>
            </div>
            <Progress value={healthPercentage} className="h-2" />
          </div>
          {character.description && (
            <p className="mt-2 text-sm text-fantasy-secondary italic">
              {character.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};