import { Scene, StoryEvent, NPC } from "@/types/content";

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

export const BLACK_HOLLOW_SCENES: Scene[] = [
  {
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
  },
  {
    id: "chapel_exterior",
    type: "dungeon",
    name: "The Abandoned Chapel",
    description: "A decrepit stone chapel looms atop the hill, its broken windows like hollow eyes staring down at the village below.",
    possibleEvents: [
      {
        id: "chapel_entrance",
        type: "puzzle",
        title: "The Chapel Door",
        description: "A heavy oak door blocks the entrance, secured by an ancient lock.",
        difficulty: 15,
        rewards: [],
        conditions: [
          {
            type: "quest",
            requirement: "vanishing_villagers",
            value: "active"
          }
        ],
        consequences: []
      }
    ],
    availableNPCs: [],
    environmentEffects: {
      time: "night",
      weather: "fog"
    }
  }
];

export const BLACK_HOLLOW_STORY = {
  id: "black_hollow",
  title: "Shadows of the Dread Keep - Chapter 1: The Cursed Village",
  description: "Investigate the mysterious disappearances plaguing the village of Black Hollow.",
  initialScene: "broken_blade_tavern",
  scenes: BLACK_HOLLOW_SCENES,
  worldStateUpdates: {
    currentLocation: "Black Hollow",
    timeOfDay: "night",
    weather: "fog",
    questProgress: {
      vanishing_villagers: false
    }
  }
};