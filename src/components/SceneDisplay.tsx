import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "./ui/button";
import { ScrollText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDialogueForNPC } from "@/data/stories/scenes/tavernScene";
import { useToast } from "./ui/use-toast";

export const SceneDisplay = () => {
  const { state, dispatch } = useGame();
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [currentNPC, setCurrentNPC] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    if (state.currentScene?.dialogueOptions?.[optionIndex]) {
      const option = state.currentScene.dialogueOptions[optionIndex];
      
      // Handle NPC-specific dialogue
      if (option.nextId?.startsWith("talk_to_")) {
        const npcId = option.nextId.replace("talk_to_", "");
        setCurrentNPC(npcId);
        const npcDialogue = getDialogueForNPC(npcId);
        
        if (npcDialogue.length > 0) {
          dispatch({
            type: "ADD_LOG",
            message: `Approaching ${npcId.charAt(0).toUpperCase() + npcId.slice(1)}...`
          });
          
          // Update scene with NPC-specific dialogue
          dispatch({
            type: "SET_SCENE",
            scene: {
              ...state.currentScene,
              dialogueOptions: npcDialogue
            }
          });
        }
      }
      
      // Handle consequences
      if (option.consequence) {
        switch (option.consequence.type) {
          case "state":
            dispatch({
              type: "UPDATE_WORLD_STATE",
              key: option.consequence.effect,
              value: option.consequence.value
            });
            break;
          case "item":
            // Handle item consequences
            toast({
              title: "Item Update",
              description: `${option.consequence.effect}: ${option.consequence.value}`,
            });
            break;
        }
      }
      
      dispatch({
        type: "ADD_LOG",
        message: `Selected: ${option.text}`
      });
    }
  };

  const handleBackToMain = () => {
    setCurrentNPC(null);
    if (state.currentScene) {
      dispatch({
        type: "SET_SCENE",
        scene: {
          ...state.currentScene,
          dialogueOptions: state.currentScene.dialogueOptions
        }
      });
    }
  };

  return (
    <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border min-h-[800px] relative overflow-hidden">
      <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg h-full flex flex-col">
        {state.currentScene && (
          <>
            <h2 className="text-3xl font-bold text-amber-400 mb-6 font-serif tracking-wide">
              {state.currentScene.name}
            </h2>
            
            {/* Scene Image */}
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden border-2 border-fantasy-frame-border">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={state.currentScene.imageUrl}
                alt={state.currentScene.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Dialogue Section */}
            <div className="flex-1 flex flex-col">
              <div className="bg-black/40 p-6 rounded-lg border border-fantasy-frame-border mb-4">
                <p className="text-xl leading-relaxed text-amber-200 font-serif">
                  {state.currentScene.description}
                </p>
              </div>

              {/* Dialogue Options */}
              <div className="mt-auto space-y-2">
                {currentNPC && (
                  <Button
                    onClick={handleBackToMain}
                    className="w-full bg-black/50 hover:bg-fantasy-primary/80 text-amber-200 mb-4"
                  >
                    ← Return to main options
                  </Button>
                )}
                
                {state.currentScene.dialogueOptions ? (
                  state.currentScene.dialogueOptions.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={cn(
                        "w-full text-left justify-start gap-2",
                        selectedOption === index 
                          ? "bg-fantasy-primary text-white" 
                          : "bg-black/50 hover:bg-fantasy-primary/80 text-amber-200"
                      )}
                      disabled={option.condition && !state.worldState[option.condition.requirement]}
                    >
                      <MessageSquare className="h-4 w-4" />
                      {option.text}
                    </Button>
                  ))
                ) : (
                  <Button
                    onClick={() => handleOptionSelect(0)}
                    className="w-full bg-black/50 hover:bg-fantasy-primary/80 text-amber-200 flex items-center gap-2"
                  >
                    <ScrollText className="h-4 w-4" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};