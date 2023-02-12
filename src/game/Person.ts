import { GameObject } from "./GameObject";
import type { PersonConfig } from "./models/config.model";
import type { Direction } from "./models/direction.model";
import { OverworldMap } from "./OverworldMap";

export class Person extends GameObject {
  isPlayerControlled: boolean;
  directionUpdate: Record<Direction, [string, number]>;
  movingProgressRemaining: number;

  constructor(config: PersonConfig) {
    super(config);
    this.movingProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.directionUpdate = {
      down: ["y", 1],
      up: ["y", -1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state: { arrow: Direction; map: OverworldMap }) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite();
    }
  }

  // TODO: Fix params
  startBehavior(
    state: { arrow: Direction; map: OverworldMap },
    behavior: { type: any; direction: any }
  ) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    if (property === "x") this.x += change;
    if (property === "y") this.y += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      // console.log("walking", this.direction);
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }

    this.sprite.setAnimation("idle-" + this.direction);
  }
}
