import React from "react";
import { Button } from "@/components/ui/button";
import { Sword, Shield, ArrowRight, Backpack, Heart } from "lucide-react";
import { Character } from "@/types/game";

interface CombatActionsProps {
  onAction: (actionType: string) => void;
  character: Character;
}

export const CombatActions = ({ onAction, character }: CombatActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 bg-black/80 rounded-lg border border-fantasy-frame-border">
      <Button
        onClick={() => onAction("attack")}
        className="bg-fantasy-warrior hover:bg-fantasy-warrior/90 text-white flex items-center gap-2"
      >
        <Sword className="h-4 w-4" />
        Attack
      </Button>
      <Button
        onClick={() => onAction("defend")}
        className="bg-fantasy-cleric hover:bg-fantasy-cleric/90 text-white flex items-center gap-2"
      >
        <Shield className="h-4 w-4" />
        Defend
      </Button>
      <Button
        onClick={() => onAction("move")}
        className="bg-fantasy-rogue hover:bg-fantasy-rogue/90 text-white flex items-center gap-2"
      >
        <ArrowRight className="h-4 w-4" />
        Move
      </Button>
      <Button
        onClick={() => onAction("useItem")}
        className="bg-fantasy-mage hover:bg-fantasy-mage/90 text-white flex items-center gap-2"
      >
        <Backpack className="h-4 w-4" />
        Use Item
      </Button>
      <Button
        onClick={() => onAction("rest")}
        className="col-span-2 bg-fantasy-primary hover:bg-fantasy-primary/90 text-white flex items-center gap-2"
      >
        <Heart className="h-4 w-4" />
        Rest
      </Button>
    </div>
  );
};