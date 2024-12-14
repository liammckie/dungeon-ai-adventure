import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

export const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useGame();
  const playerCharacter = state.characters.find(char => !char.isAI);

  if (!playerCharacter) return null;

  return (
    <div className="bg-parchment rounded-lg border-2 border-fantasy-frame-border animate-frame-glow">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="w-full flex items-center justify-between p-4 hover:bg-fantasy-frame-glow/20"
      >
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span className="font-semibold">Inventory</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>

      {isOpen && (
        <ScrollArea className="h-[300px] p-4">
          <div className="grid grid-cols-2 gap-2">
            {playerCharacter.inventory.map((item, index) => (
              <div
                key={index}
                className="p-2 bg-parchment-light rounded border border-fantasy-frame-border hover:bg-parchment-dark transition-colors cursor-pointer"
              >
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-600">{item.type}</p>
              </div>
            ))}
          </div>
          {playerCharacter.inventory.length === 0 && (
            <p className="text-center text-gray-500 italic">No items in inventory</p>
          )}
        </ScrollArea>
      )}
    </div>
  );
};