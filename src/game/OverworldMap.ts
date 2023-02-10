import type { GameObject } from "./GameObject";
import type { IConfig } from "./models/config.model";
import { Person } from "./Person";
import { utils } from "./Utils";

export class OverworldMap {
  gameObjects: Record<string, GameObject>;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;

  constructor(config: IConfig) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

export const overworldMaps: Record<string, IConfig> = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        isPlayerControlled: true,
      }),
      npc1: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(1),
        src: "/images/characters/people/npc1.png",
      }),
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
  },
};

export const demoRoom = overworldMaps.DemoRoom;
