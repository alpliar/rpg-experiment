import { PersonEventDetail } from "./models/customEvents.model";
import { Coordinates, Direction } from "./models/direction.model";

export const utils = {
  withGrid(n: number): number {
    return n * 16;
  },
  asGridCoord(x: number, y: number): string {
    return `${x * 16},${y * 16}`;
  },
  nextPosition(
    initialX: number,
    initialY: number,
    direction: Direction
  ): Coordinates {
    let x = initialX;
    let y = initialY;

    const size = 16;

    switch (direction) {
      case "left":
        x -= size;
        break;
      case "right":
        x += size;
        break;
      case "up":
        y -= size;
        break;
      case "down":
        y += size;
    }

    return { x, y };
  },

  emitEvent(name: string, detail: PersonEventDetail) {
    const event = new CustomEvent<PersonEventDetail>(name, {
      detail,
    });

    document.dispatchEvent(event);
  },
};
