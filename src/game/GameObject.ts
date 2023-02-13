import { Behavior } from "./models/behavior.model";
import type { GameObjectConfig } from "./models/config.model";
import type { Direction } from "./models/direction.model";
import { BehaviorEvent } from "./models/event.model";
import { OverworldEvent } from "./OverworldEvent";
import { OverworldMap } from "./OverworldMap";
import { Sprite } from "./Sprite";

export class GameObject {
  public id?: string;
  x: number;
  y: number;
  sprite: Sprite;
  gameObject: unknown;
  direction: Direction;
  isMounted: boolean;
  behaviorLoop: Behavior[];
  behaviorLoopIndex: number;

  constructor(config: GameObjectConfig) {
    this.id = undefined;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
  }

  mount(map: OverworldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // Object Behavior
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  // TODO: Fix param types
  update(_state: { arrow: Direction; map?: OverworldMap }) {}

  async doBehaviorEvent(map: OverworldMap) {
    // Don't execute behavior if there is a cutscene playing or no behavior to play
    if (map.isCutScenePlaying || this.behaviorLoop.length === 0) {
      return;
    }

    // setting up event
    let event: BehaviorEvent = this.behaviorLoop[this.behaviorLoopIndex];
    event.who = this.id;

    // create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event });
    await eventHandler.init();

    // setting next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    // fire next event
    this.doBehaviorEvent(map);
  }
}
