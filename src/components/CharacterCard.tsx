import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Character } from "@/types/game";

const getCharacterImage = (race: string, characterClass: string) => {
  // Map of character types to appropriate fantasy-themed images
  const imageMap = {
    "Human-Warrior": "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "Human-Mage": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    "Elf-Warrior": "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    "Elf-Mage": "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    "Dwarf-Warrior": "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    "Dwarf-Mage": "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
    "Halfling-Warrior": "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
    "Halfling-Mage": "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
  };

  const key = `${race}-${characterClass}`;
  return imageMap[key] || "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"; // Default image
};

export const CharacterCard = ({ character }: { character: Character }) => {
  const healthPercentage = (character.hp / character.maxHp) * 100;
  const characterImage = getCharacterImage(character.race, character.class);

  return (
    <Card className="p-4 bg-parchment border-fantasy-accent">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16 rounded-full border-2 border-fantasy-accent">
          <AvatarImage src={characterImage} alt={character.name} />
          <AvatarFallback className="bg-fantasy-primary text-white">
            {character.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-fantasy-primary">{character.name}</h3>
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