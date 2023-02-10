import type { GameObject } from "./GameObject";
import type { Animations } from "./models/animation.model";
import type { SpriteConfig } from "./models/config.model";

export class Sprite {
  image: HTMLImageElement;
  isLoaded: boolean;
  isShadowLoaded: boolean;
  shadow: HTMLImageElement;
  useShadow: boolean;
  currentAnimationFrame: number;
  gameObject: GameObject;
  animations: Animations;
  currentAnimation: keyof Animations;

  constructor(config: SpriteConfig) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.useShadow = true;

    if (this.useShadow) {
      this.shadow = new Image();
      this.shadow.src = "/images/characters/shadow.png";
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      };
    }

    this.animations = config.animations || {
      idleDown: [[0, 0]],
      // walkDown: [
      //   [0, 0],
      //   [1, 0],
      //   [2, 0],
      //   [3, 0],
      // ],
    };

    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    this.gameObject = config.gameObject;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    if (this.isLoaded) ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
