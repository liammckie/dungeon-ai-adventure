import React from "react";
import { Button } from "@/components/ui/button";
import { Character } from "@/types/game";
import { Target } from "lucide-react";

interface TargetSelectorProps {
  targets: Character[];
  onTargetSelect: (target: Character) => void;
  onCancel: () => void;
}

export const TargetSelector = ({ targets, onTargetSelect, onCancel }: TargetSelectorProps) => {
  if (targets.length === 0) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-bold text-fantasy-primary">Select Target</h3>
      <div className="grid grid-cols-1 gap-2">
        {targets.map((target) => (
          <Button
            key={target.id}
            onClick={() => onTargetSelect(target)}
            className="w-full flex items-center justify-between bg-fantasy-warrior/80 hover:bg-fantasy-warrior"
          >
            <span className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {target.name}
            </span>
            <span className="text-sm">HP: {target.hp}/{target.maxHp}</span>
          </Button>
        ))}
      </div>
      <Button 
        onClick={onCancel}
        variant="outline" 
        className="w-full mt-2"
      >
        Cancel
      </Button>
    </div>
  );
};