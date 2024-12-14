import React from "react";
import { Button } from "@/components/ui/button";
import { Sword, Map, MessageSquare, Heart } from "lucide-react";
import { GamePhase } from "@/types/game";
import { useToast } from "@/hooks/use-toast";

interface PhaseButtonsProps {
  currentPhase: GamePhase;
  onPhaseChange: (phase: GamePhase) => void;
}

export const PhaseButtons = ({ currentPhase, onPhaseChange }: PhaseButtonsProps) => {
  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <Button
        variant="outline"
        className={`${currentPhase === 'exploration' ? 'bg-fantasy-primary text-white' : ''}`}
        onClick={() => onPhaseChange('exploration')}
      >
        <Map className="w-4 h-4 mr-2" />
        Explore
      </Button>
      <Button
        variant="outline"
        className={`${currentPhase === 'interaction' ? 'bg-fantasy-primary text-white' : ''}`}
        onClick={() => onPhaseChange('interaction')}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Interact
      </Button>
      <Button
        variant="outline"
        className={`${currentPhase === 'combat' ? 'bg-fantasy-primary text-white' : ''}`}
        onClick={() => onPhaseChange('combat')}
      >
        <Sword className="w-4 h-4 mr-2" />
        Combat
      </Button>
      <Button
        variant="outline"
        className={`${currentPhase === 'rest' ? 'bg-fantasy-primary text-white' : ''}`}
        onClick={() => onPhaseChange('rest')}
      >
        <Heart className="w-4 h-4 mr-2" />
        Rest
      </Button>
    </div>
  );
};