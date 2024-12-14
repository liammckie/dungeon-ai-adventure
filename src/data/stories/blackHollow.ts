import { Story, StoryChapter } from "@/types/story";
import { Scene, NPC } from "@/types/content";

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
            nextId: "alaric_leave"
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
  },
  {
    id: "mira",
    name: "Mira the Barmaid",
    description: "A young woman with nervous eyes, constantly glancing at the windows.",
    dialogue: [
      {
        id: "mira_intro",
        text: "Please, keep your voice down. These walls have ears...",
        options: [
          {
            text: "What do you mean by that?",
            nextId: "mira_explain"
          }
        ]
      }
    ]
  }
];

const TAVERN_SCENE: Scene = {
  id: "broken_blade_tavern",
  type: "tavern",
  name: "The Broken Blade Tavern",
  description: "A dimly lit tavern with creaking floorboards and suspicious patrons. The air is thick with tension and the smell of stale ale.",
  possibleEvents: [],
  availableNPCs: BLACK_HOLLOW_NPCS,
  environmentEffects: {
    time: "night",
    weather: "fog"
  }
};

const CHAPEL_SCENE: Scene = {
  id: "chapel_exterior",
  type: "dungeon",
  name: "The Abandoned Chapel",
  description: "A decrepit stone chapel looms atop the hill, its broken windows like hollow eyes staring down at the village below.",
  possibleEvents: [],
  availableNPCs: [],
  environmentEffects: {
    time: "night",
    weather: "fog"
  }
};

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
    },
    {
      id: "chapel_investigation",
      title: "The Abandoned Chapel",
      description: "Investigate the mysterious chapel on the hill.",
      requirements: [
        { type: "quest", value: "vanishing_villagers" }
      ],
      scenes: [CHAPEL_SCENE],
      nextBranches: ["midnight_raid"]
    },
    {
      id: "midnight_raid",
      title: "The Midnight Raid",
      description: "Defend the village from a mysterious attack.",
      requirements: [
        { type: "quest", value: "chapel_investigated" }
      ],
      scenes: [], // TODO: Add midnight raid scenes
      nextBranches: []
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
