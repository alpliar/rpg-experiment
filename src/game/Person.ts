import { GameObject } from "./GameObject";
import { Behavior } from "./models/behavior.model";
import type { PersonConfig } from "./models/config.model";
import type { Direction } from "./models/direction.model";
import { OverworldMap } from "./OverworldMap";
import { utils } from "./Utils";

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

  //TODO: fix type
  update(state: { arrow: Direction; map: OverworldMap }) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      // We're keyboard ready & have an arrow pressed
      if (
        !state.map.isCutScenePlaying &&
        this.isPlayerControlled &&
        state.arrow
      ) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite();
    }
  }

  //TODO: Fix type
  startBehavior(
    state: { arrow: Direction; map: OverworldMap },
    behavior: Behavior
  ) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      // stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        if (behavior.retry) {
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);
        }
        return;
      }

      // Ready to walk
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite();
    }

    if (behavior.type === "stand") {
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
      }, behavior.time!);
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    if (property === "x") this.x += change;
    if (property === "y") this.y += change;
    this.movingProgressRemaining -= 1;

    if (this.movingProgressRemaining === 0) {
      // walk finished
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
    }
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
