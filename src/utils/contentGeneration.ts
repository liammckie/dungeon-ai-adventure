import { Scene, StoryEvent, NPC, TimeOfDay, Weather, SceneType } from "@/types/content";
import { rollDice } from "@/context/diceUtils";

const STORY_LOCATIONS: Record<SceneType, {
  name: string;
  descriptions: string[];
}> = {
  tavern: {
    name: "The Gilded Flagon",
    descriptions: [
      "Warm light spills from the windows of this well-worn establishment.",
      "The scent of hearth smoke and ale fills this refuge from the gathering storm.",
      "A haven of warmth and light amid the growing darkness of Eldermoor."
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
  dungeon: {
    name: "The Shattered Spire",
    descriptions: [
      "Ancient stone walls bear the scars of forgotten battles.",
      "The air is thick with the dust of centuries and the whispers of the dead.",
      "Shadows dance in the flickering torchlight, hiding ancient secrets."
    ]
  },
  village: {
    name: "Village of Eldermoor",
    descriptions: [
      "Rain-soaked streets lined with flickering lanterns cast dancing shadows on cobblestone paths.",
      "The village square stands eerily empty, abandoned market stalls telling tales of recent panic.",
      "Mist curls around the village well, where ancient symbols hint at forgotten rituals."
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
  sceneType: SceneType,
  playerLevel: number,
  worldState: Record<string, any>
): Scene => {
  const sceneId = `scene_${Date.now()}`;
  const timeOfDay = generateTimeOfDay();
  const weather = generateWeather();
  
  const location = STORY_LOCATIONS[sceneType];
  const baseDescription = location.descriptions[Math.floor(Math.random() * location.descriptions.length)];
  
  const scene: Scene = {
    id: sceneId,
    type: sceneType,
    name: location.name,
    description: `${baseDescription} ${getTimeDescription(timeOfDay)} ${getWeatherDescription(weather)}`,
    possibleEvents: [],
    requiredLevel: Math.max(1, playerLevel - 2),
    availableNPCs: [],
    environmentEffects: {
      time: timeOfDay,
      weather: weather,
    },
  };

  return scene;
};