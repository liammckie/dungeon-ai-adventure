import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, MessageSquare, Beer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NPC {
  id: string;
  name: string;
  description: string;
  dialogue: string;
  quest?: {
    title: string;
    description: string;
    difficulty: number; // DC check
  };
}

const npcs: NPC[] = [
  {
    id: "bartender",
    name: "Old Barkeep Thorin",
    description: "A sturdy dwarf with a braided beard and keen eyes.",
    dialogue: "Welcome to the Rusty Dragon Tavern! What brings you here, adventurer?",
    quest: {
      title: "The Missing Shipment",
      description: "My latest shipment of rare dwarven ale has been stolen. I suspect the local bandits are responsible. Could you help recover it?",
      difficulty: 15,
    },
  },
  {
    id: "mysterious-figure",
    name: "Hooded Figure",
    description: "A cloaked figure sits in the corner, nursing a drink.",
    dialogue: "Psst... I hear you're someone who can get things done...",
    quest: {
      title: "Dark Secrets",
      description: "There's something lurking in the old crypt outside town. The guards won't listen, but I know better.",
      difficulty: 18,
    },
  },
];

const rollD20 = () => Math.floor(Math.random() * 20) + 1;

const getDiceIcon = (roll: number) => {
  const icons = {
    1: <Dice1 className="h-8 w-8" />,
    2: <Dice2 className="h-8 w-8" />,
    3: <Dice3 className="h-8 w-8" />,
    4: <Dice4 className="h-8 w-8" />,
    5: <Dice5 className="h-8 w-8" />,
    6: <Dice6 className="h-8 w-8" />,
  };
  return icons[roll as keyof typeof icons] || <Dice6 className="h-8 w-8" />;
};

export const TavernScene = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [lastRoll, setLastRoll] = useState(0);

  const handleNPCInteraction = (npc: NPC) => {
    setSelectedNPC(npc);
  };

  const handleQuestAttempt = (quest: NonNullable<NPC["quest"]>) => {
    const roll = rollD20();
    setLastRoll(roll);
    setShowDiceRoll(true);

    setTimeout(() => {
      if (roll >= quest.difficulty) {
        toast({
          title: "Success!",
          description: `You rolled ${roll}. The quest "${quest.title}" has been accepted!`,
        });
        dispatch({
          type: "ADD_LOG",
          message: `Accepted quest: ${quest.title}`,
        });
      } else {
        toast({
          title: "Failed!",
          description: `You rolled ${roll}. You failed to convince them of your abilities.`,
          variant: "destructive",
        });
      }
      setShowDiceRoll(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/ada54cb6-accb-4576-b63b-03d16eee4365.png')] bg-cover bg-center p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/70 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">The Rusty Dragon Tavern</h2>
          <p className="text-amber-200 mb-6">
            The tavern is warm and inviting, filled with the murmur of conversation and the soft glow of candlelight.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {npcs.map((npc) => (
              <Card 
                key={npc.id}
                className="p-4 bg-amber-900/60 hover:bg-amber-900/80 transition-colors cursor-pointer"
                onClick={() => handleNPCInteraction(npc)}
              >
                <div className="flex items-center gap-3">
                  {npc.id === "bartender" ? (
                    <Beer className="h-6 w-6 text-amber-400" />
                  ) : (
                    <MessageSquare className="h-6 w-6 text-amber-400" />
                  )}
                  <div>
                    <h3 className="font-bold text-amber-200">{npc.name}</h3>
                    <p className="text-sm text-amber-300/80">{npc.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <Dialog open={!!selectedNPC} onOpenChange={() => setSelectedNPC(null)}>
        <DialogContent className="bg-amber-900/95 text-amber-200 border-amber-600">
          <DialogHeader>
            <DialogTitle className="text-amber-400">{selectedNPC?.name}</DialogTitle>
            <DialogDescription className="text-amber-200">
              {selectedNPC?.dialogue}
            </DialogDescription>
          </DialogHeader>

          {selectedNPC?.quest && (
            <div className="space-y-4">
              <div className="bg-amber-950/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-400 mb-2">{selectedNPC.quest.title}</h4>
                <p className="text-amber-200">{selectedNPC.quest.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  onClick={() => handleQuestAttempt(selectedNPC.quest!)}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Accept Quest (Roll Check)
                </Button>
                {showDiceRoll && (
                  <div className="animate-bounce">
                    {getDiceIcon(Math.min(6, Math.max(1, Math.ceil(lastRoll / 3.5))))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};