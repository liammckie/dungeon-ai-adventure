import { NPC } from "@/types/content";

export const tavernNPCs: NPC[] = [
  {
    id: "npc1",
    name: "Brom the Barkeeper",
    description: "A stout man with a jovial demeanor, always ready to serve a drink.",
    age: 45,
    race: "Human",
    traits: ["Friendly", "Talkative"],
    inventory: [
      { id: "ale", name: "Ale", description: "A refreshing drink.", type: "misc" },
      { id: "mead", name: "Mead", description: "A sweet honey drink.", type: "misc" },
    ],
    dialogue: [
      {
        id: "greeting",
        text: "Welcome to the Broken Blade! What can I get you?",
        options: [
          { text: "I'll have an ale", nextId: "serve_ale" },
          { text: "What's the word around town?", nextId: "gossip" }
        ]
      }
    ]
  },
  {
    id: "npc2",
    name: "Elara the Bard",
    description: "A talented bard who plays enchanting melodies on her lute.",
    age: 30,
    race: "Elf",
    traits: ["Charming", "Musical"],
    inventory: [
      { id: "lute", name: "Lute", description: "A beautifully crafted lute.", type: "focus" },
      { id: "songbook", name: "Songbook", description: "A collection of songs.", type: "misc" },
    ],
    dialogue: [
      {
        id: "greeting",
        text: "Care to hear a tale of adventure?",
        options: [
          { text: "Yes, please share", nextId: "tell_tale" },
          { text: "Maybe later", nextId: "farewell" }
        ]
      }
    ]
  }
];