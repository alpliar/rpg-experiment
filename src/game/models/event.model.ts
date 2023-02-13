import { GameObject } from "../GameObject";
import { Behavior } from "./behavior.model";

export interface BehaviorEvent extends Behavior {
  who?: GameObject["id"];
}
