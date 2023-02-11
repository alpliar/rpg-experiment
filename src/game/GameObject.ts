import type { GameObjectConfig } from "./models/config.model";
import type { Direction } from "./models/direction.model";
import { OverworldMap } from "./OverworldMap";
import { Sprite } from "./Sprite";

export class GameObject {
  x: number;
  y: number;
  sprite: Sprite;
  gameObject: unknown;
  direction: Direction;
  isMounted: boolean;

  constructor(config: GameObjectConfig) {
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
    });
  }

  mount(map: OverworldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);
  }

  update(state) {}
}
