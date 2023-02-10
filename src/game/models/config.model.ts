import type { GameObject } from "../GameObject";
import type { Animations } from "./animation.model";
import type { Direction } from "./direction.model";

export interface IConfig {
  element?: HTMLElement;
  x?: number;
  y?: number;
  src?: string;
  gameObject?: GameObject;
  animations?: Animations;
  currentAnimation?: keyof Animations;
  gameObjects?: Record<string, GameObject>;
  lowerSrc?: string;
  upperSrc?: string;
  direction?: Direction;
  isPlayerControlled?: boolean;
}
