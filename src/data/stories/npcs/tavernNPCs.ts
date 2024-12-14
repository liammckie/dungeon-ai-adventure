import { NPC } from "@/types/content";

export const tavernNPCs: NPC[] = [
  {
    id: "alaric",
    name: "Barkeep Alaric",
    description: "A large, scarred man with cold, calculating eyes. Former soldier turned tavern keeper.",
    age: 45,
    race: "Human",
    class: "NPC",
    background: "Soldier",
    level: 1,
    xp: 0,
    hp: 10,
    maxHp: 10,
    stats: {
      strength: 14,
      dexterity: 12,
      constitution: 14,
      intelligence: 10,
      wisdom: 12,
      charisma: 10
    },
    inventory: [],
    traits: ["Stern", "Vigilant", "Protective"],
    proficiencies: {
      armor: [],
      weapons: ["Simple Weapons"],
      tools: ["Brewer's Supplies"],
      skills: ["Intimidation", "Perception"],
      languages: ["Common"],
      saves: []
    },
    isAI: true,
    dialogue: {
      greeting: "What can I get you?",
      options: [
        {
          text: "Tell me about this place",
          response: "The Broken Blade's been here longer than I have, and I've been here twenty years."
        },
        {
          text: "I'm looking for work",
          response: "Might have something that needs doing. Pay's good if you're capable."
        }
      ]
    }
  },
  {
    id: "mira",
    name: "Mira the Barmaid",
    description: "A nervous young woman who constantly watches the door.",
    age: 22,
    race: "Human",
    class: "NPC",
    background: "Commoner",
    level: 1,
    xp: 0,
    hp: 8,
    maxHp: 8,
    stats: {
      strength: 10,
      dexterity: 14,
      constitution: 10,
      intelligence: 12,
      wisdom: 10,
      charisma: 16
    },
    inventory: [],
    traits: ["Nervous", "Observant", "Kind"],
    proficiencies: {
      armor: [],
      weapons: ["Simple Weapons"],
      tools: [],
      skills: ["Insight", "Persuasion"],
      languages: ["Common"],
      saves: []
    },
    isAI: true,
    dialogue: {
      greeting: "Can I... help you with something?",
      options: [
        {
          text: "You seem worried. Is everything alright?",
          response: "It's just... the tavern has been quieter than usual."
        }
      ]
    }
  },
  {
    id: "old_man_loras",
    name: "Old Man Loras",
    description: "A hunched figure in tattered robes, lost in dark visions.",
    age: 78,
    race: "Human",
    class: "NPC",
    background: "Hermit",
    level: 1,
    xp: 0,
    hp: 6,
    maxHp: 6,
    stats: {
      strength: 8,
      dexterity: 10,
      constitution: 10,
      intelligence: 14,
      wisdom: 16,
      charisma: 8
    },
    inventory: [],
    traits: ["Cryptic", "Prophetic", "Deranged"],
    proficiencies: {
      armor: [],
      weapons: [],
      tools: [],
      skills: ["Arcana", "History"],
      languages: ["Common"],
      saves: []
    },
    isAI: true,
    dialogue: {
      greeting: "The Pale Shadow comes... when the moon bleeds...",
      options: [
        {
          text: "What do you mean by 'Pale Shadow'?",
          response: "A darkness that consumes all. Beware the night."
        }
      ]
    },
  }
];
