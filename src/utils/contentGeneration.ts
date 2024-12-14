import { Scene, StoryEvent, NPC, EventCondition, TimeOfDay, Weather } from "@/types/content";
import { rollDice } from "@/context/diceUtils";

export const generateScene = (
  sceneType: Scene['type'],
  playerLevel: number,
  worldState: Record<string, any>
): Scene => {
  const sceneId = `scene_${Date.now()}`;
  const timeOfDay: TimeOfDay = generateTimeOfDay();
  const weather: Weather = generateWeather();

  const scene: Scene = {
    id: sceneId,
    type: sceneType,
    name: generateSceneName(sceneType),
    description: generateSceneDescription(sceneType, timeOfDay, weather),
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

const generateSceneName = (type: Scene['type']): string => {
  const names: Record<Scene['type'], string[]> = {
    tavern: ["The Rusty Dragon", "The Prancing Pony", "The Golden Goblet"],
    forest: ["Whispering Woods", "Dark Forest", "Ancient Grove"],
    dungeon: ["Forgotten Crypt", "Dragon's Lair", "Ancient Ruins"],
    village: ["Riverwood", "Millbrook", "Oakvale"],
  };

  const possibleNames = names[type];
  const roll = rollDice({ type: 'd4' });
  return possibleNames[roll % possibleNames.length];
};

const generateSceneDescription = (
  type: Scene['type'],
  time: TimeOfDay,
  weather: Weather
): string => {
  const descriptions: Record<Scene['type'], string[]> = {
    tavern: [
      "A warm, inviting establishment filled with the murmur of conversation.",
      "The smell of hearty stew and ale fills this cozy tavern.",
    ],
    forest: [
      "Ancient trees tower overhead, their branches swaying gently.",
      "The forest floor is covered in a thick carpet of leaves.",
    ],
    dungeon: [
      "Cold stone walls echo with distant drips of water.",
      "Ancient symbols and worn statues line these dark corridors.",
    ],
    village: [
      "A peaceful settlement with thatched-roof houses and friendly faces.",
      "The village square bustles with local merchants and craftsmen.",
    ],
  };

  const baseDescription = descriptions[type][rollDice({ type: 'd4' }) % 2];
  const timeDesc = getTimeDescription(time);
  const weatherDesc = getWeatherDescription(weather);

  return `${baseDescription} ${timeDesc} ${weatherDesc}`;
};

const getTimeDescription = (time: TimeOfDay): string => {
  const descriptions: Record<TimeOfDay, string> = {
    dawn: "The first light of dawn casts long shadows.",
    day: "Bright daylight illuminates the scene.",
    dusk: "The fading light of dusk paints the sky in amber hues.",
    night: "The darkness of night is broken only by scattered lights.",
  };
  return descriptions[time];
};

const getWeatherDescription = (weather: Weather): string => {
  const descriptions: Record<Weather, string> = {
    clear: "The sky is clear and bright.",
    rain: "A steady rain falls from above.",
    storm: "Thunder rumbles in the distance as storm clouds gather.",
    fog: "A thick fog limits visibility.",
  };
  return descriptions[weather];
};

const generatePossibleEvents = (type: Scene['type'], playerLevel: number): StoryEvent[] => {
  const baseEvent: StoryEvent = {
    id: `event_${Date.now()}`,
    type: 'combat',
    title: "Unexpected Encounter",
    description: "A challenge appears before you...",
    difficulty: Math.max(10, playerLevel * 2),
    rewards: [
      { type: 'gold', amount: playerLevel * 10 },
      { type: 'xp', amount: playerLevel * 100 },
    ],
    conditions: [],
    consequences: [],
  };

  return [baseEvent];
};

const generateNPCs = (type: Scene['type']): NPC[] => {
  const baseNPC: NPC = {
    id: `npc_${Date.now()}`,
    name: "Friendly Stranger",
    description: "A mysterious figure with an interesting tale to tell.",
    dialogue: [
      {
        id: "greeting",
        text: "Greetings, traveler!",
        options: [
          {
            text: "Hello there!",
            nextId: "quest_offer",
          },
        ],
      },
    ],
  };

  return [baseNPC];
};