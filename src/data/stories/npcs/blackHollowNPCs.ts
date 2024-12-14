import { NPC } from "@/types/content";
import { CharacterStats } from "@/types/game";

const ALARIC_STATS: CharacterStats = {
  strength: 10, // +0
  dexterity: 10, // +0
  constitution: 12, // +1
  intelligence: 10, // +0
  wisdom: 10, // +0
  charisma: 10, // +0
};

const GALEN_STATS: CharacterStats = {
  strength: 12, // +1
  dexterity: 16, // +3
  constitution: 12, // +1
  intelligence: 10, // +0
  wisdom: 12, // +1
  charisma: 10, // +0
};

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
      },
      {
        id: "alaric_disappearances",
        text: "It started about a month ago. First it was just travelers, but now even locals are vanishing. The mayor's trying to keep it quiet, but everyone's scared.",
        options: [
          {
            text: "I'll investigate this.",
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
  },
  {
    id: "hunter_galen",
    name: "Hunter Galen",
    description: "A weathered woodsman with keen eyes and a well-maintained longbow.",
    dialogue: [
      {
        id: "galen_intro",
        text: "You're not from around here. Good. We need fresh eyes on this trouble.",
        options: [
          {
            text: "What kind of trouble?",
            nextId: "galen_trouble"
          },
          {
            text: "Tell me about the surrounding woods.",
            nextId: "galen_woods"
          }
        ]
      },
      {
        id: "galen_trouble",
        text: "Something's stirring in the old graveyard. I've seen lights there at night, and heard... things that shouldn't be.",
        options: [
          {
            text: "I'll investigate the graveyard.",
            nextId: null
          }
        ]
      }
    ],
    quests: [
      {
        id: "graveyard_watch",
        title: "The Graveyard Watch",
        description: "Investigate the strange occurrences at the old graveyard with Hunter Galen.",
        difficulty: 12,
        completed: false,
        rewards: [
          { type: "xp", amount: 300 },
          { type: "gold", amount: 50 }
        ]
      }
    ]
  }
];