import { Scene, DialogueOption } from "@/types/content";
import { tavernNPCs } from "../npcs/tavernNPCs";

export const TAVERN_SCENE: Scene = {
  id: "broken_blade_tavern",
  type: "tavern",
  name: "The Broken Blade Tavern",
  description: "The heavy oak doors of the Broken Blade Tavern creak open as you step inside. A gust of cold, damp air follows, sending a shiver through the dimly lit room. Shadows twist along the walls, cast by the weak, sputtering flames of a wrought-iron chandelier. The room smells of stale ale, damp wood, and faintly of iron — blood, long dried but never quite washed away. A hearth on the far side struggles against the oppressive chill, its meager flames flickering as though battling against an unseen force.",
  imageUrl: "/lovable-uploads/43403fdc-1e2f-44a9-aff8-6ef506fbad37.png",
  possibleEvents: [],
  availableNPCs: tavernNPCs,
  dialogueOptions: [
    {
      text: "Approach Barkeep Alaric",
      nextId: "talk_to_alaric",
      consequence: {
        type: "state",
        effect: "TALKING_TO_ALARIC",
        value: true
      }
    },
    {
      text: "Speak with Mira the Barmaid",
      nextId: "talk_to_mira",
      consequence: {
        type: "state",
        effect: "TALKING_TO_MIRA",
        value: true
      }
    },
    {
      text: "Listen to Old Man Loras",
      nextId: "talk_to_loras",
      consequence: {
        type: "state",
        effect: "LISTENING_TO_LORAS",
        value: true
      }
    },
    {
      text: "Investigate the Cellar",
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