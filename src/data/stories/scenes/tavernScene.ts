import { Scene } from "@/types/content";
import { TAVERN_NPCS } from "../npcs/tavernNPCs";

export const TAVERN_SCENE: Scene = {
  id: "broken_blade_tavern",
  type: "tavern",
  name: "The Broken Blade Tavern",
  description: "A dimly lit tavern with creaking floorboards and suspicious patrons. The air is thick with tension and the smell of stale ale.",
  possibleEvents: [],
  availableNPCs: TAVERN_NPCS,
  environmentEffects: {
    time: "night",
    weather: "fog"
  }
};