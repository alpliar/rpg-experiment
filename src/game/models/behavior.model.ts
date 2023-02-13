import { Person } from "../Person";
import { Direction } from "./direction.model";

export type BehaviorType = "walk" | "stand";

export interface Behavior {
  type: BehaviorType;
  direction: Direction;
  time?: number;
  retry?: boolean;
  who?: Person["id"];
}
