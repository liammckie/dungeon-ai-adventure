import { Scene, NPC } from "./content";

export interface StoryBranch {
  id: string;
  title: string;
  description: string;
  requirements?: {
    type: 'quest' | 'level' | 'item' | 'reputation';
    value: any;
  }[];
  scenes: Scene[];
  nextBranches?: string[]; // IDs of possible next branches
}

export interface Story {
  id: string;
  title: string;
  description: string;
  chapters: StoryChapter[];
  worldStateUpdates: Record<string, any>;
}

export interface StoryChapter {
  id: string;
  title: string;
  description: string;
  initialBranch: string; // ID of the starting branch
  branches: StoryBranch[];
  npcs: NPC[];
  requiredLevel?: number;
}