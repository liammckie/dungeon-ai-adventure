export const tavernNPCs = [
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
  },
  {
    id: "npc3",
    name: "Grom the Mercenary",
    description: "A burly warrior with a scarred face, always looking for a fight.",
    age: 35,
    race: "Half-Orc",
    traits: ["Brave", "Loyal"],
    inventory: [
      { id: "sword", name: "Sword", description: "A sharp steel sword.", type: "weapon", damage: "1d8" },
      { id: "shield", name: "Shield", description: "A sturdy wooden shield.", type: "armor", armorClass: 2 },
    ],
  },
  {
    id: "npc4",
    name: "Mira the Herbalist",
    description: "An elderly woman with a wealth of knowledge about herbs and potions.",
    age: 60,
    race: "Human",
    traits: ["Wise", "Caring"],
    inventory: [
      { id: "healing_potion", name: "Healing Potion", description: "Restores health.", type: "misc" },
      { id: "herbs", name: "Herbs", description: "Used for potions and remedies.", type: "misc" },
    ],
  },
];

export const tavernQuests = [
  {
    id: "quest1",
    title: "The Haunted Cellar",
    description: "Strange noises have been coming from the tavern cellar.",
    status: "active",
    difficulty: "Easy"
  },
  {
    id: "quest2",
    title: "A Missing Patron",
    description: "One of the regulars hasn't been seen for days. Investigate their whereabouts.",
    status: "active",
    difficulty: "Medium"
  },
  {
    id: "quest3",
    title: "The Stolen Recipe",
    description: "A famous recipe has been stolen from the tavern. Find the thief!",
    status: "active",
    difficulty: "Hard"
  }
];
