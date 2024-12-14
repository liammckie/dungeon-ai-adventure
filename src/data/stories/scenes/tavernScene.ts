import { Scene, DialogueOption } from "@/types/content";
import { tavernNPCs } from "../npcs/tavernNPCs";

export const TAVERN_SCENE: Scene = {
  id: "broken_blade_tavern",
  type: "tavern",
  name: "The Broken Blade Tavern",
  description: "The heavy oak doors of the Broken Blade Tavern creak open as you step inside.",
  imageUrl: "/lovable-uploads/43403fdc-1e2f-44a9-aff8-6ef506fbad37.png",
  possibleEvents: [],
  availableNPCs: tavernNPCs,
  dialogueOptions: [
    {
      text: "Approach Barkeep Alaric",
      response: "You approach the weathered barkeep who nods in acknowledgment.",
      nextId: "talk_to_alaric",
      consequence: {
        type: "state",
        effect: "TALKING_TO_ALARIC",
        value: true
      }
    },
    {
      text: "Speak with Mira the Barmaid",
      response: "Mira notices your approach and gives a friendly smile.",
      nextId: "talk_to_mira",
      consequence: {
        type: "state",
        effect: "TALKING_TO_MIRA",
        value: true
      }
    },
    {
      text: "Listen to Old Man Loras",
      response: "The elderly patron seems eager to share his tales.",
      nextId: "talk_to_loras",
      consequence: {
        type: "state",
        effect: "LISTENING_TO_LORAS",
        value: true
      }
    },
    {
      text: "Investigate the Cellar",
      response: "You make your way towards the cellar door.",
      nextId: "investigate_cellar",
      consequence: {
        type: "state",
        effect: "INVESTIGATING_CELLAR",
        value: true
      }
    }
  ],
  environmentEffects: {
    time: "night",
    weather: "fog"
  }
};

export const getDialogueForNPC = (npcId: string): DialogueOption[] => {
  const npc = tavernNPCs.find(npc => npc.id === npcId);
  return npc?.dialogue[0]?.options || [];
};