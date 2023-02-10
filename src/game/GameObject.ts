import type { GameObjectConfig } from "./models/config.model";
import type { Direction } from "./models/direction.model";
import { Sprite } from "./Sprite";

export class GameObject {
  x: number;
  y: number;
  sprite: Sprite;
  gameObject: unknown;
  direction: Direction;

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
    });
  }

  update(state) {}
}
