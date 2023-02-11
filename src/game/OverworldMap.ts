import { canvas } from "./Constants";
import type { GameObject } from "./GameObject";
import type { OverworldMapConfig } from "./models/config.model";
import { Direction } from "./models/direction.model";
import { Person } from "./Person";
import { utils } from "./Utils";

export class OverworldMap {
  gameObjects: Record<string, GameObject>;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  walls: Record<string, boolean>;

  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(canvas.widthCells / 2 - 1) - cameraPerson.x,
      utils.withGrid(canvas.heightCells / 2 - 1) - cameraPerson.y
    );
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX: number, currentY: number, direction: Direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }
}

export const overworldMaps: Record<string, OverworldMapConfig> = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        isPlayerControlled: true,
        src: "/images/characters/people/hero.png",
      }),
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
      }),
    },
    walls: {
      // "16,16": true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        isPlayerControlled: true,
        src: "/images/characters/people/hero.png",
      }),
      npc1: new Person({
        x: utils.withGrid(9),
        y: utils.withGrid(6),
        src: "/images/characters/people/npc2.png",
      }),
      npc2: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(8),
        src: "/images/characters/people/npc3.png",
      }),
    },
    walls: {},
  },
};

export const demoRoom = overworldMaps.DemoRoom;
