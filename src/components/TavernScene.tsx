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
import { useToast } from "@/hooks/use-toast";
import { rollDice } from "@/context/diceUtils";
import { BLACK_HOLLOW_NPCS } from "@/data/stories/blackHollow";

const npcs = BLACK_HOLLOW_NPCS;

export const TavernScene = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [selectedNPC, setSelectedNPC] = useState<typeof npcs[0] | null>(null);
  const [currentDialogue, setCurrentDialogue] = useState<string | null>(null);

  const handleNPCInteraction = (npc: typeof npcs[0]) => {
    setSelectedNPC(npc);
    // Set the initial dialogue ID from the NPC's first dialogue entry
    const initialDialogue = npc.dialogue[0];
    if (initialDialogue) {
      setCurrentDialogue(initialDialogue.id);
    }
  };

  const handleDialogueOption = (option: any) => {
    // Handle skill check if present
    if (option.condition?.type === "quest" && option.condition.requirement === "skill_check") {
      const roll = rollDice({ type: "d20" });
      const success = roll >= option.condition.value.dc;
      
      dispatch({
        type: "ADD_LOG",
        message: `Skill Check (DC ${option.condition.value.dc}): Rolled ${roll} - ${success ? "Success!" : "Failure"}`
      });

      toast({
        title: success ? "Skill Check Successful!" : "Skill Check Failed",
        description: `You rolled a ${roll}, ${success ? "meeting" : "failing to meet"} the DC of ${option.condition.value.dc}`,
      });

      // If failed, don't proceed with dialogue
      if (!success) return;
    }

    // Add any available quests to the game log
    if (selectedNPC?.quests) {
      selectedNPC.quests.forEach(quest => {
        dispatch({
          type: "ADD_LOG",
          message: `New Quest Available: ${quest.title}`
        });
        
        toast({
          title: "New Quest Available",
          description: quest.title,
        });
      });
    }

    // If there's no next dialogue ID, close the dialog
    if (!option.nextId) {
      setSelectedNPC(null);
      setCurrentDialogue(null);
      return;
    }

    // Update to the next dialogue
    setCurrentDialogue(option.nextId);
  };

  const getCurrentDialogueNode = () => {
    if (!selectedNPC || !currentDialogue) return null;
    return selectedNPC.dialogue.find(d => d.id === currentDialogue);
  };

  const dialogueNode = getCurrentDialogueNode();

  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/ada54cb6-accb-4576-b63b-03d16eee4365.png')] bg-cover bg-center p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/70 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">The Broken Blade Tavern</h2>
          <p className="text-amber-200 mb-6">
            The tavern is dimly lit, with creaking floorboards and suspicious patrons. The air is thick with tension and the smell of stale ale.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {npcs.map((npc) => (
              <Card 
                key={npc.id}
                className="p-4 bg-amber-900/60 hover:bg-amber-900/80 transition-colors cursor-pointer"
                onClick={() => handleNPCInteraction(npc)}
              >
                <div className="flex items-center gap-3">
                  {npc.id === "alaric" ? (
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

      <Dialog open={!!selectedNPC} onOpenChange={(open) => {
        if (!open) {
          setSelectedNPC(null);
          setCurrentDialogue(null);
        }
      }}>
        <DialogContent className="bg-amber-900/95 text-amber-200 border-amber-600">
          <DialogHeader>
            <DialogTitle className="text-amber-400">{selectedNPC?.name}</DialogTitle>
            <DialogDescription className="text-amber-200">
              {dialogueNode?.text}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {dialogueNode?.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleDialogueOption(option)}
                className="w-full bg-amber-800 hover:bg-amber-700 justify-start text-left"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};