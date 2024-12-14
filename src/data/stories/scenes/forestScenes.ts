import { Scene } from "@/types/content";

export const FOREST_SCENES: Scene[] = [
  {
    id: "forest_path",
    type: "forest",
    name: "The Whispering Woods",
    description: "Ancient trees loom overhead, their branches swaying in an unseen wind. The path ahead is shrouded in mist, and strange sounds echo from deep within the forest.",
    possibleEvents: [],
    availableNPCs: [],
    environmentEffects: {
      time: "dusk",
      weather: "fog"
    }
  },
  {
    id: "forest_clearing",
    type: "forest",
    name: "Moonlit Clearing",
    description: "A natural clearing opens before you, bathed in soft moonlight. The grass is trampled in places, suggesting recent activity.",
    possibleEvents: [],
    availableNPCs: [],
    environmentEffects: {
      time: "night",
      weather: "clear"
    }
  }
];