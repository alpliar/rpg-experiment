import type { GameObject } from "../GameObject";
import type { Animations } from "./animation.model";
import type { Direction } from "./direction.model";

export interface OverworldConfig {
  element: HTMLElement;
}
export interface OverworldMapConfig {
  gameObjects: Record<string, GameObject>;
  lowerSrc: string;
  upperSrc: string;
  walls: Record<string, boolean>;
}

export interface GameObjectConfig {
  x?: number;
  y?: number;
  direction?: Direction;
  src: string;
}

export interface PersonConfig extends GameObjectConfig {
  isPlayerControlled?: boolean;
}

export interface SpriteConfig {
  src: string;
  animations?: Animations;
  currentAnimation?: keyof Animations;
  gameObject: GameObject;
  animationFrameLimit?: number;
}
