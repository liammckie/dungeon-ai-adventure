import { Story, StoryChapter } from "@/types/story";
import { TAVERN_SCENE } from "./scenes/tavernScene";
import { TAVERN_NPCS } from "./npcs/tavernNPCs";

export const BLACK_HOLLOW_CHAPTER: StoryChapter = {
  id: "black_hollow_ch1",
  title: "The Cursed Village",
  description: "Investigate the mysterious disappearances plaguing the village of Black Hollow.",
  initialBranch: "tavern_investigation",
  npcs: TAVERN_NPCS,
  branches: [
    {
      id: "tavern_investigation",
      title: "The Broken Blade Tavern",
      description: "Gather information about the disappearances from the local tavern.",
      scenes: [TAVERN_SCENE],
      nextBranches: ["chapel_investigation", "midnight_raid"]
    }
  ]
};

export const SHADOWS_OF_DREAD_KEEP: Story = {
  id: "shadows_of_dread_keep",
  title: "Shadows of the Dread Keep",
  description: "Uncover the dark secrets lurking beneath the cursed village of Black Hollow.",
  chapters: [BLACK_HOLLOW_CHAPTER],
  worldStateUpdates: {
    currentLocation: "Black Hollow",
    timeOfDay: "night",
    weather: "fog",
    questProgress: {
      vanishing_villagers: false,
      chapel_investigated: false
    }
  }
};