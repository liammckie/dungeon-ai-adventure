import { Scene } from "@/types/content";
import { tavernNPCs } from "../npcs/tavernNPCs";

export const FOREST_SCENES: Scene[] = [
  {
    id: "broken_blade_tavern",
    type: "tavern",
    name: "The Broken Blade Tavern",
    description: "A cozy, dimly lit tavern where adventurers gather to share tales and drink. The air is thick with the smell of ale and wood smoke from the hearth. Barkeep Alaric tends to his patrons while keeping a watchful eye on the room.",
    imageUrl: "/lovable-uploads/43403fdc-1e2f-44a9-aff8-6ef506fbad37.png",
    possibleEvents: [],
    availableNPCs: tavernNPCs,
    dialogueOptions: [
      {
        text: "Approach the barkeep",
        response: "You walk towards the bar where Alaric is cleaning mugs.",
        nextId: "talk_to_barkeep"
      },
      {
        text: "Listen to the local gossip",
        response: "You lean in to catch snippets of nearby conversations.",
        nextId: "tavern_gossip"
      },
      {
        text: "Order a drink",
        response: "You signal to the barkeep that you'd like to order.",
        nextId: "order_drink"
      }
    ],
    environmentEffects: {
      time: "night",
      weather: "clear"
    }
  },
  {
    id: "haunted_graveyard",
    type: "graveyard",
    name: "The Haunted Graveyard",
    description: "Ancient tombstones rise from the misty ground, their weathered surfaces telling tales of lives long past. The full moon casts an ethereal light through the twisted branches overhead, while skeletal figures dance in the distance.",
    imageUrl: "/lovable-uploads/70676219-78f0-4c20-84e8-e3baccff0562.png",
    possibleEvents: [],
    availableNPCs: [],
    dialogueOptions: [
      {
        text: "Investigate the dancing skeletons",
        response: "You cautiously approach the skeletons, trying to discern their movements.",
        nextId: "skeleton_encounter"
      },
      {
        text: "Search for clues among the graves",
        response: "You kneel down to examine the inscriptions on the tombstones.",
        nextId: "search_graves"
      },
      {
        text: "Follow the eerie whispers",
        response: "The whispers seem to beckon you deeper into the graveyard.",
        nextId: "follow_whispers"
      }
    ],
    environmentEffects: {
      time: "night",
      weather: "fog"
    }
  },
  {
    id: "cursed_chapel",
    type: "chapel",
    name: "The Cursed Chapel",
    description: "Stained glass windows pulse with an otherworldly light, casting colorful shadows across the ruined chapel floor. Hooded figures stand in a circle, their chants echoing through the ancient halls.",
    imageUrl: "/lovable-uploads/076d0054-7bc5-4f07-a970-9f0e18e9b796.png",
    possibleEvents: [],
    availableNPCs: [],
    dialogueOptions: [
      {
        text: "Confront the cultists",
        response: "You step forward, demanding to know what they are doing.",
        nextId: "confront_cultists"
      },
      {
        text: "Observe the ritual from hiding",
        response: "You find a shadowy corner to watch the cultists without being seen.",
        nextId: "observe_ritual"
      },
      {
        text: "Search for the ritual dagger",
        response: "You look around for any signs of the dagger used in the ritual.",
        nextId: "search_altar"
      }
    ],
    environmentEffects: {
      time: "night",
      weather: "clear"
    }
  },
  {
    id: "midnight_raid",
    type: "forest",
    name: "The Midnight Raid",
    description: "The forest clearing erupts in chaos as shadowy figures clash under the pale moonlight. Screams and the clash of steel fill the air as villagers flee from their mysterious attackers.",
    imageUrl: "/lovable-uploads/5b015d5d-009f-4b23-a2d2-632e87b46691.png",
    possibleEvents: [],
    availableNPCs: [],
    dialogueOptions: [
      {
        text: "Defend the villagers",
        response: "You rush forward, ready to protect those in danger.",
        nextId: "protect_villagers"
      },
      {
        text: "Chase the attackers",
        response: "You sprint after the fleeing figures, determined to catch them.",
        nextId: "pursue_raiders"
      },
      {
        text: "Rally the guards",
        response: "You shout for the guards to come and assist in the defense.",
        nextId: "call_reinforcements"
      }
    ],
    environmentEffects: {
      time: "night",
      weather: "fog"
    }
  }
];
