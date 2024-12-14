import { Scene, DialogueOption } from "@/types/content";
import { tavernNPCs } from "../npcs/tavernNPCs";

const TAVERN_DIALOGUE_OPTIONS: DialogueOption[] = [
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
    nextId: "listen_to_loras",
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
];

const ALARIC_DIALOGUE: DialogueOption[] = [
  {
    text: "[Intimidate] Tell me what's going on here, or you'll regret it.",
    nextId: "alaric_intimidate",
    condition: {
      type: "quest",
      requirement: "INTIMIDATE_CHECK",
      value: 15
    }
  },
  {
    text: "[Persuade] We're here to help. Tell us what you know.",
    nextId: "alaric_persuade",
    condition: {
      type: "quest",
      requirement: "PERSUADE_CHECK",
      value: 12
    }
  },
  {
    text: "[Bribe] A few gold coins might refresh your memory.",
    nextId: "alaric_bribe",
    consequence: {
      type: "item",
      effect: "REMOVE_GOLD",
      value: 5
    }
  },
  {
    text: "[Leave] End the conversation",
    nextId: "leave_conversation"
  }
];

export const TAVERN_SCENE: Scene = {
  id: "broken_blade_tavern",
  type: "tavern",
  name: "The Broken Blade Tavern",
  description: "The heavy oak doors of the Broken Blade Tavern creak open as you step inside. A gust of cold, damp air follows, sending a shiver through the dimly lit room. Shadows twist along the walls, cast by the weak, sputtering flames of a wrought-iron chandelier. The room smells of stale ale, damp wood, and faintly of iron — blood, long dried but never quite washed away. A hearth on the far side struggles against the oppressive chill, its meager flames flickering as though battling against an unseen force.",
  imageUrl: "/lovable-uploads/43403fdc-1e2f-44a9-aff8-6ef506fbad37.png",
  possibleEvents: [],
  availableNPCs: tavernNPCs,
  dialogueOptions: TAVERN_DIALOGUE_OPTIONS,
  environmentEffects: {
    time: "night",
    weather: "fog"
  }
};

export const getDialogueForNPC = (npcId: string) => {
  switch (npcId) {
    case "alaric":
      return ALARIC_DIALOGUE;
    // Add more NPC dialogue options here
    default:
      return [];
  }
};