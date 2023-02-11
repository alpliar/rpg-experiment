import { DirectionInput } from "./DirectionInput";
import { GameObject } from "./GameObject";
import type { OverworldConfig } from "./models/config.model";
import { OverworldMap, overworldMaps } from "./OverworldMap";
import { Person } from "./Person";

export class Overworld {
  private element: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private directionInput: DirectionInput;
  map: OverworldMap;

  constructor(config: OverworldConfig) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas")!;
    this.ctx = this.canvas.getContext("2d")!;
    this.map = new OverworldMap(overworldMaps.DemoRoom);
    this.directionInput = new DirectionInput();
  }

  startGameLoop() {
    const step = () => {
      // Clear canvas before drawing
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish camera
      const cameraPerson: GameObject = this.map.gameObjects.hero;

      // Update objects position before drawing
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
      });

      // Draw lower layer of map
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // Draw upper layer of map
      this.map.drawUpperImage(this.ctx, cameraPerson);

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
