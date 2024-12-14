import { NPC } from "@/types/content";

export const tavernNPCs: NPC[] = [
  {
    id: "alaric",
    name: "Barkeep Alaric",
    description: "A large, scarred man with cold, calculating eyes. His massive hands suggest he's more than capable of using the spiked club leaning within reach.",
    age: 45,
    race: "Human",
    traits: ["Intimidating", "Cautious", "Former Soldier"],
    inventory: [
      { id: "black_hollow_ale", name: "Black Hollow Ale", description: "A restorative brew that heals minor wounds.", type: "potion" },
      { id: "map_fragment", name: "Old Map Fragment", description: "Shows forgotten paths through the surrounding woods.", type: "misc" },
    ],
    imageUrl: "/lovable-uploads/ce42a9d6-6d7e-4e1b-9b5c-3e785d6f5d8d.png",
    dialogue: [
      {
        id: "greeting",
        text: "What do you want? Make it quick.",
        options: [
          { 
            text: "[Intimidate] Tell me what's going on here, or you'll regret it.",
            nextId: "intimidate_response",
            condition: {
              type: "skill",
              requirement: "INTIMIDATE_CHECK",
              value: 15
            }
          },
          { 
            text: "[Persuade] We're here to help. Tell us what you know.",
            nextId: "persuade_response",
            condition: {
              type: "skill",
              requirement: "PERSUADE_CHECK",
              value: 12
            }
          },
          { 
            text: "[Bribe] A few gold coins might refresh your memory.",
            nextId: "bribe_response",
            consequence: {
              type: "item",
              effect: "REMOVE_GOLD",
              value: 5
            }
          }
        ]
      }
    ]
  },
  {
    id: "mira",
    name: "Mira the Barmaid",
    description: "A nervous young woman who flits between tables, her tray trembling slightly. Her eyes constantly dart toward the heavy doors.",
    age: 25,
    race: "Human",
    traits: ["Nervous", "Observant", "Kind"],
    inventory: [
      { id: "miras_amulet", name: "Mira's Amulet", description: "A simple amulet that glows faintly in the presence of dark magic.", type: "trinket" }
    ],
    imageUrl: "/lovable-uploads/3223129a-8306-4983-92ef-74177bb1c2be.png",
    dialogue: [
      {
        id: "greeting",
        text: "C-can I help you with something?",
        options: [
          { 
            text: "What has everyone so frightened?",
            nextId: "mira_fears",
            consequence: {
              type: "state",
              effect: "MIRA_TRUST",
              value: true
            }
          },
          { 
            text: "Tell me about your sister.",
            nextId: "sister_story",
            condition: {
              type: "state",
              requirement: "MIRA_TRUST",
              value: true
            }
          }
        ]
      }
    ]
  },
  {
    id: "loras",
    name: "Old Man Loras",
    description: "A hunched figure in tattered robes, mumbling incoherently and drawing strange symbols on the tabletop.",
    age: 70,
    race: "Human",
    traits: ["Cryptic", "Unstable", "Prophetic"],
    dialogue: [
      {
        id: "greeting",
        text: "The Pale Shadow comes... when the moon bleeds, and the Veil thins...",
        options: [
          { 
            text: "[Arcana] Examine his drawings",
            nextId: "arcana_check",
            condition: {
              type: "skill",
              requirement: "ARCANA_CHECK",
              value: 16
            }
          },
          { 
            text: "[Insight] Study his behavior",
            nextId: "insight_check",
            condition: {
              type: "skill",
              requirement: "INSIGHT_CHECK",
              value: 14
            }
          }
        ]
      }
    ]
  }
];