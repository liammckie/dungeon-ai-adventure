import { NPC } from "@/types/content";

export const tavernNPCs: NPC[] = [
  {
    id: "alaric",
    name: "Barkeep Alaric",
    description: "A large, scarred man with cold, calculating eyes. Former soldier turned tavern keeper.",
    age: 45,
    race: "Human",
    traits: ["Stern", "Vigilant", "Protective"],
    inventory: [],
    dialogue: [{
      id: "alaric_main",
      text: "What can I get you?",
      options: [
        {
          text: "Tell me what's going on here.",
          nextId: "alaric_info",
          condition: {
            type: "level",
            requirement: "min_level",
            value: 1
          }
        }
      ]
    }]
  },
  {
    id: "mira",
    name: "Mira the Barmaid",
    description: "A nervous young woman who constantly watches the door.",
    age: 22,
    race: "Human",
    traits: ["Nervous", "Observant", "Kind"],
    inventory: [],
    dialogue: [{
      id: "mira_main",
      text: "Can I... help you with something?",
      options: [
        {
          text: "You seem worried. Is everything alright?",
          nextId: "mira_worried",
          condition: {
            type: "level",
            requirement: "min_level",
            value: 1
          }
        }
      ]
    }]
  },
  {
    id: "old_man_loras",
    name: "Old Man Loras",
    description: "A hunched figure in tattered robes, lost in dark visions.",
    age: 78,
    race: "Human",
    traits: ["Cryptic", "Prophetic", "Deranged"],
    inventory: [],
    imageUrl: "/lovable-uploads/8deac7da-ec2e-417c-bc01-de61df60ff76.png",
    dialogue: [{
      id: "loras_main",
      text: "The Pale Shadow comes... when the moon bleeds...",
      options: [
        {
          text: "What do you mean by 'Pale Shadow'?",
          nextId: "loras_shadow",
          condition: {
            type: "level",
            requirement: "min_level",
            value: 1
          }
        }
      ]
    }]
  }
];