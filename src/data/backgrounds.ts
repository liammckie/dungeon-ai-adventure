import { type Background } from "@/types/character";

export const backgrounds: Background[] = [
  {
    name: "Criminal",
    skillProficiencies: ["Deception", "Stealth"],
    toolProficiencies: ["Thieves' Tools", "Gaming Set"],
    languages: 0,
    equipment: [
      { id: "crowbar", name: "Crowbar", description: "A simple crowbar", type: "tool" },
      { id: "dark-clothes", name: "Dark Clothes", description: "Dark common clothes including a hood", type: "misc" },
    ],
    feature: {
      name: "Criminal Contact",
      description: "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.",
    },
    characteristics: {
      personality: [
        "I always have a plan for what to do when things go wrong.",
        "I am always calm, no matter what the situation.",
      ],
      ideal: [
        "Honor - I don't steal from others in the trade.",
        "Freedom - Chains are meant to be broken, as are those who would forge them.",
      ],
      bond: [
        "I'm trying to pay off an old debt I owe to a generous benefactor.",
        "I will get revenge on the corrupt organization that ruined my life.",
      ],
      flaw: [
        "When I see something valuable, I can't think about anything but how to steal it.",
        "I have a weakness for the vices of the city, especially hard drink.",
      ],
    },
  },
  {
    name: "Sage",
    skillProficiencies: ["Arcana", "History"],
    toolProficiencies: [],
    languages: 2,
    equipment: [
      { id: "ink-pen", name: "Ink Pen", description: "A simple ink pen", type: "tool" },
      { id: "parchment", name: "Parchment", description: "Sheets of parchment", type: "misc" },
      { id: "small-knife", name: "Small Knife", description: "A small knife", type: "tool" },
    ],
    feature: {
      name: "Researcher",
      description: "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it.",
    },
    characteristics: {
      personality: [
        "I use polysyllabic words that convey the impression of great erudition.",
        "I've read every book in the world's greatest libraries – or I like to boast that I have.",
      ],
      ideal: [
        "Knowledge - The path to power and self-improvement is through knowledge.",
        "Beauty - What is beautiful points us beyond itself toward what is true.",
      ],
      bond: [
        "I've been searching my whole life for the answer to a certain question.",
        "My life's work is a series of tomes related to a specific field of lore.",
      ],
      flaw: [
        "I am easily distracted by the promise of information.",
        "Most people scream and run when they see a demon. I stop and take notes on its anatomy.",
      ],
    },
  },
];