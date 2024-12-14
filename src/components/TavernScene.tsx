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
import { MessageSquare, Beer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NPC {
  id: string;
  name: string;
  description: string;
  dialogue: string;
  quest?: {
    title: string;
    description: string;
    difficulty: number;
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

export const TavernScene = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);

  const handleNPCInteraction = (npc: NPC) => {
    setSelectedNPC(npc);
  };

  const handleAcceptQuest = (quest: NonNullable<NPC["quest"]>) => {
    toast({
      title: "Quest Accepted!",
      description: `You have accepted the quest "${quest.title}". Good luck on your adventure!`,
    });
    
    dispatch({
      type: "ADD_LOG",
      message: `Accepted quest: ${quest.title}`,
    });
    
    setSelectedNPC(null);
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

              <Button
                onClick={() => handleAcceptQuest(selectedNPC.quest!)}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Accept Quest
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};