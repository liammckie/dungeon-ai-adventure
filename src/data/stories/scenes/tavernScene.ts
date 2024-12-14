import { Scene } from "@/types/content";
import { tavernNPCs } from "../npcs/tavernNPCs";

export const TAVERN_SCENE: Scene = {
  id: "broken_blade_tavern",
  type: "tavern",
  name: "The Broken Blade Tavern",
  description: "A dimly lit tavern with creaking floorboards and suspicious patrons. The air is thick with tension and the smell of stale ale.",
  imageUrl: "/lovable-uploads/076d0054-7bc5-4f07-a970-9f0e18e9b796.png",
  possibleEvents: [],
  availableNPCs: tavernNPCs,
  dialogueOptions: [
    {
      text: "Approach the bartender",
      nextId: "talk_bartender"
    },
    {
      text: "Listen to the bard's tale",
      nextId: "listen_bard"
    },
    {
      text: "Find a quiet table",
      nextId: "sit_alone"
    }
  ],
  environmentEffects: {
    time: "night",
    weather: "fog"
  }
};