import { Story, StoryChapter } from "@/types/story";
import { TAVERN_SCENE } from "./scenes/tavernScene";
import { NPC } from "@/types/content";

export const BLACK_HOLLOW_NPCS: NPC[] = [
  {
    id: "alaric",
    name: "Barkeep Alaric",
    description: "A gruff man with suspicious eyes, wiping down the counter with practiced motions.",
    dialogue: [
      {
        id: "alaric_intro",
        text: "What do you want? We don't need any more trouble around here.",
        options: [
          {
            text: "[Intimidate] Tell me what's going on here, or I'll make you!",
            nextId: "alaric_intimidate",
            condition: {
              type: "quest",
              requirement: "skill_check",
              value: { skill: "intimidation", dc: 15 }
            }
          },
          {
            text: "[Persuade] We're here to help. What do you know?",
            nextId: "alaric_persuade",
            condition: {
              type: "quest",
              requirement: "skill_check",
              value: { skill: "persuasion", dc: 12 }
            }
          },
          {
            text: "Never mind, I'll be going.",
            nextId: null
          }
        ]
      },
      {
        id: "alaric_intimidate",
        text: "Alright, alright! People have been disappearing at night. We don't know who's behind it, but the old chapel on the hill might have something to do with it.",
        options: [
          {
            text: "Tell me more about these disappearances.",
            nextId: "alaric_disappearances"
          },
          {
            text: "What's special about the chapel?",
            nextId: "alaric_chapel"
          },
          {
            text: "I'll look into it.",
            nextId: null
          }
        ]
      }
    ],
    quests: [
      {
        id: "vanishing_villagers",
        title: "The Vanishing Villagers",
        description: "Discover why villagers are disappearing at night from Black Hollow.",
        difficulty: 15,
        completed: false,
        rewards: [
          { type: "xp", amount: 500 },
          { type: "gold", amount: 100 }
        ]
      }
    ]
  }
];

export const BLACK_HOLLOW_CHAPTER: StoryChapter = {
  id: "black_hollow_ch1",
  title: "The Cursed Village",
  description: "Investigate the mysterious disappearances plaguing the village of Black Hollow.",
  initialBranch: "tavern_investigation",
  npcs: BLACK_HOLLOW_NPCS,
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
