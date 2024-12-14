import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Character } from "@/types/game";

export const CharacterCard = ({ character }: { character: Character }) => {
  const healthPercentage = (character.hp / character.maxHp) * 100;

  return (
    <Card className="p-4 bg-parchment border-fantasy-accent">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-fantasy-primary animate-torch-flicker" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-fantasy-primary">{character.name}</h3>
          <p className="text-sm text-fantasy-secondary">
            {character.race} {character.class}
          </p>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>HP</span>
              <span>{character.hp}/{character.maxHp}</span>
            </div>
            <Progress value={healthPercentage} className="h-2" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div>STR: {character.stats.strength}</div>
            <div>DEX: {character.stats.dexterity}</div>
            <div>CON: {character.stats.constitution}</div>
            <div>INT: {character.stats.intelligence}</div>
            <div>WIS: {character.stats.wisdom}</div>
            <div>CHA: {character.stats.charisma}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};