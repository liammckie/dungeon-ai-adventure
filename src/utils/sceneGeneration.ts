import { Scene } from "@/types/content";
import { WorldState } from "@/types/worldState";

export const generateForestScene = (playerLevel: number, worldState: Record<string, any>): Scene => {
  const timeOfDay = worldState.timeOfDay || "day";
  const weather = worldState.weather || "clear";
  
  const forestScenes = [
    {
      name: "The Whispering Woods",
      description: "The path from Black Hollow leads you into a dense forest. Ancient trees loom overhead, their branches swaying gently in the breeze. The air is thick with the scent of pine and damp earth. You can still see the village in the distance, but the forest beckons you deeper into its mysteries."
    },
    {
      name: "The Old Forest Road",
      description: "A well-worn path winds through the forest, evidence of frequent travel between Black Hollow and neighboring settlements. Moss-covered stones line the way, and you notice fresh tracks in the soft earth - both human and animal."
    },
    {
      name: "The Forest Crossroads",
      description: "You come upon a crossroads marked by an ancient stone waymarker. The worn inscriptions speak of different destinations, and you notice signs of recent activity - perhaps from travelers or merchants passing through."
    }
  ];

  const selectedScene = forestScenes[Math.floor(Math.random() * forestScenes.length)];

  return {
    id: `forest_${Date.now()}`,
    type: 'forest',
    name: selectedScene.name,
    description: selectedScene.description,
    possibleEvents: [],
    availableNPCs: [],
    environmentEffects: {
      time: timeOfDay,
      weather: weather
    }
  };
};

export const generateTavernScene = (playerLevel: number, worldState: Record<string, any>): Scene => {
  return {
    id: "broken_blade_tavern",
    type: "tavern",
    name: "The Broken Blade Tavern",
    description: "The tavern is dimly lit, with creaking floorboards and suspicious patrons. The air is thick with tension and the smell of stale ale.",
    possibleEvents: [],
    availableNPCs: [],
    environmentEffects: {
      time: "night",
      weather: "fog"
    }
  };
};