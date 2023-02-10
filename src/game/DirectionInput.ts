import type { Direction } from "./models/direction.model";

export class DirectionInput {
  heldDirections: Array<Direction> = [];
  map: Record<KeyboardEvent["code"], Direction>;

  constructor() {
    this.map = {
      ArrowUp: "up",
      KeyZ: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyQ: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const dir = this.map[e.code];
      if (dir && !this.heldDirections.includes(dir)) {
        this.heldDirections.unshift(dir);
      }
    });

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);

      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
