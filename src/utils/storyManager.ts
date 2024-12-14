import { Story, StoryBranch, StoryChapter } from "@/types/story";
import { Scene } from "@/types/content";
import { WorldState } from "@/types/worldState";

export class StoryManager {
  private currentStory: Story | null = null;
  private currentChapter: StoryChapter | null = null;
  private currentBranch: StoryBranch | null = null;
  private worldState: WorldState;

  constructor(worldState: WorldState) {
    this.worldState = worldState;
  }

  loadStory(story: Story) {
    this.currentStory = story;
    this.currentChapter = story.chapters[0];
    this.currentBranch = this.findBranch(this.currentChapter.initialBranch);
    
    // Update world state with story-specific values
    Object.entries(story.worldStateUpdates).forEach(([key, value]) => {
      this.worldState[key as keyof WorldState] = value;
    });
  }

  private findBranch(branchId: string): StoryBranch | null {
    if (!this.currentChapter) return null;
    return this.currentChapter.branches.find(branch => branch.id === branchId) || null;
  }

  getCurrentScene(): Scene | null {
    if (!this.currentBranch || !this.currentBranch.scenes.length) return null;
    return this.currentBranch.scenes[0]; // For now, return first scene. Later we can track scene progress
  }

  getAvailableNPCs() {
    return this.currentChapter?.npcs || [];
  }

  canProgressToBranch(branchId: string): boolean {
    const targetBranch = this.findBranch(branchId);
    if (!targetBranch) return false;

    // Check if all requirements are met
    return targetBranch.requirements?.every(req => {
      switch (req.type) {
        case 'quest':
          return this.worldState.questProgress[req.value];
        case 'level':
          return true; // TODO: Implement level check
        case 'reputation':
          return true; // TODO: Implement reputation check
        default:
          return false;
      }
    }) ?? true;
  }

  progressToBranch(branchId: string): boolean {
    if (!this.canProgressToBranch(branchId)) return false;
    
    const newBranch = this.findBranch(branchId);
    if (!newBranch) return false;

    this.currentBranch = newBranch;
    return true;
  }

  // Helper method to check if we can progress to next chapter
  canProgressToNextChapter(): boolean {
    if (!this.currentStory || !this.currentChapter) return false;
    const currentIndex = this.currentStory.chapters.indexOf(this.currentChapter);
    return currentIndex < this.currentStory.chapters.length - 1;
  }

  // Progress to next chapter if possible
  progressToNextChapter(): boolean {
    if (!this.canProgressToNextChapter()) return false;
    
    const currentIndex = this.currentStory!.chapters.indexOf(this.currentChapter!);
    this.currentChapter = this.currentStory!.chapters[currentIndex + 1];
    this.currentBranch = this.findBranch(this.currentChapter.initialBranch);
    return true;
  }
}