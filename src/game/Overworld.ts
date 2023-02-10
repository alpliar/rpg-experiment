import { DirectionInput } from "./DirectionInput";
import type { IConfig } from "./models/config.model";
import { OverworldMap, overworldMaps } from "./OverworldMap";

export class Overworld {
  private element: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private directionInput: DirectionInput;
  map: OverworldMap;

  constructor(config: IConfig) {
    this.element = config.element;
    this.canvas = this.element?.querySelector(".game-canvas");
    this.ctx = this.canvas?.getContext("2d");
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.map.drawLowerImage(this.ctx);

      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });

        object.sprite.draw(this.ctx);
      });

      this.map.drawUpperImage(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  }

  init() {
    this.map = new OverworldMap(overworldMaps.DemoRoom);
    setTimeout(() => {
      this.startGameLoop();
    }, 1000);

    this.directionInput = new DirectionInput();
    this.directionInput.init();
  }
}
