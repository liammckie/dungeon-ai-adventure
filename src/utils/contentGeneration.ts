import { Scene, StoryEvent, NPC, TimeOfDay, Weather } from "@/types/content";
import { rollDice } from "@/context/diceUtils";

const STORY_LOCATIONS = {
  eldermoor: {
    name: "Village of Eldermoor",
    descriptions: [
      "Rain-soaked streets lined with flickering lanterns cast dancing shadows on cobblestone paths.",
      "The village square stands eerily empty, abandoned market stalls telling tales of recent panic.",
      "Mist curls around the village well, where ancient symbols hint at forgotten rituals."
    ]
  },
  forest: {
    name: "Forest of Whispers",
    descriptions: [
      "Ancient trees loom overhead, their branches swaying in an unseen wind.",
      "Twisted roots and creeping mist choke the narrow paths between the trees.",
      "The forest grows darker and more forbidding with each step forward."
    ]
  },
  tavern: {
    name: "The Gilded Flagon",
    descriptions: [
      "Warm light spills from the windows of this well-worn establishment.",
      "The scent of hearth smoke and ale fills this refuge from the gathering storm.",
      "A haven of warmth and light amid the growing darkness of Eldermoor."
    ]
  }
};

const generateTimeOfDay = (): TimeOfDay => {
  const roll = rollDice({ type: 'd4' });
  const times: TimeOfDay[] = ['dawn', 'day', 'dusk', 'night'];
  return times[roll - 1];
};

const generateWeather = (): Weather => {
  const roll = rollDice({ type: 'd4' });
  const weather: Weather[] = ['clear', 'rain', 'storm', 'fog'];
  return weather[roll - 1];
};

const getWeatherDescription = (weather: Weather): string => {
  const descriptions: Record<Weather, string> = {
    clear: "The sky above is surprisingly clear, though an underlying tension remains.",
    rain: "A steady rain falls, drumming against cobblestones and thatched roofs.",
    storm: "Thunder rolls across dark skies as lightning illuminates the gathering shadows.",
    fog: "A thick, unnatural fog clings to the ground, obscuring the path ahead."
  };
  return descriptions[weather];
};

const getTimeDescription = (time: TimeOfDay): string => {
  const descriptions: Record<TimeOfDay, string> = {
    dawn: "The first light of dawn struggles to pierce through the gloom.",
    day: "Even in daylight, something feels wrong about the familiar surroundings.",
    dusk: "Long shadows stretch across the ground as darkness approaches.",
    night: "Night has fallen, bringing with it an almost palpable sense of danger."
  };
  return descriptions[time];
};

export const generateScene = (
  sceneType: Scene['type'],
  playerLevel: number,
  worldState: Record<string, any>
): Scene => {
  const sceneId = `scene_${Date.now()}`;
  const timeOfDay = generateTimeOfDay();
  const weather = generateWeather();
  
  const location = STORY_LOCATIONS[sceneType as keyof typeof STORY_LOCATIONS] || STORY_LOCATIONS.eldermoor;
  const baseDescription = location.descriptions[Math.floor(Math.random() * location.descriptions.length)];
  
  const scene: Scene = {
    id: sceneId,
    type: sceneType,
    name: location.name,
    description: `${baseDescription} ${getTimeDescription(timeOfDay)} ${getWeatherDescription(weather)}`,
    possibleEvents: generatePossibleEvents(sceneType, playerLevel),
    requiredLevel: Math.max(1, playerLevel - 2),
    availableNPCs: generateNPCs(sceneType),
    environmentEffects: {
      time: timeOfDay,
      weather: weather,
    },
  };

  return scene;
};

const generatePossibleEvents = (type: Scene['type'], playerLevel: number): StoryEvent[] => {
  const events: StoryEvent[] = [
    {
      id: `event_${Date.now()}`,
      type: 'combat',
      title: "Shadows in the Night",
      description: "Dark figures emerge from the mist, their intentions clearly hostile.",
      difficulty: Math.max(10, playerLevel * 2),
      rewards: [
        { type: 'gold', amount: playerLevel * 10 },
        { type: 'xp', amount: playerLevel * 100 }
      ],
      conditions: [],
      consequences: []
    }
  ];

  if (type === 'forest') {
    events.push({
      id: `event_${Date.now()}_forest`,
      type: 'discovery',
      title: "Ancient Warding Stones",
      description: "Hidden among the twisted roots, you spot strange stones marked with glowing runes.",
      difficulty: 15,
      rewards: [
        { type: 'item', amount: 1, itemId: 'runestone_of_echoes' }
      ],
      conditions: [],
      consequences: []
    });
  }

  return events;
};

const generateNPCs = (type: Scene['type']): NPC[] => {
  const npcs: NPC[] = [];
  
  if (type === 'eldermoor') {
    npcs.push({
      id: "elder_rowan",
      name: "Elder Rowan",
      description: "A weathered man with knowing eyes and a cautious demeanor.",
      dialogue: [
        {
          id: "greeting",
          text: "These are dark times, stranger. What brings you to our troubled village?",
          options: [
            {
              text: "I've heard about the disappearances.",
              nextId: "quest_offer"
            }
          ]
        }
      ]
    });
  }

  return npcs;
};