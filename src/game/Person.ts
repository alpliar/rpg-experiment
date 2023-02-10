import { GameObject } from "./GameObject";
import type { PersonConfig } from "./models/config.model";
import type { Direction } from "./models/direction.model";

export class Person extends GameObject {
  isPlayerControlled: boolean;
  directionUpdate: Record<Direction, [string, number]>;
  movingProgressRemaining: number;

  constructor(config: PersonConfig) {
    super(config);
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.movingProgressRemaining = 0;
    this.directionUpdate = {
      down: ["y", 1],
      up: ["y", -1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    this.updatePosition();

    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
}
