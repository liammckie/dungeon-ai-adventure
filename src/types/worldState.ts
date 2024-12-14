export type WorldStateValue = string | number | boolean | null;

export interface WorldState {
  currentLocation: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  weather: 'clear' | 'rainy' | 'stormy' | 'foggy';
  reputation: number;
  questProgress: Record<string, boolean>;
  discoveredLocations: string[];
  [key: string]: WorldStateValue | Record<string, boolean> | string[];
}