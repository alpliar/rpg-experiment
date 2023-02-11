import type { GameObject } from "./GameObject";
import type { Animations } from "./models/animation.model";
import type { SpriteConfig } from "./models/config.model";

export class Sprite {
  image: HTMLImageElement;
  isLoaded: boolean;
  isShadowLoaded: boolean;
  shadow: HTMLImageElement | undefined;
  useShadow: boolean;
  currentAnimationFrame: number;
  gameObject: GameObject;
  animations: Animations;
  currentAnimation: keyof Animations;
  animationFrameLimit: number;
  animationFrameProgress: number;

  constructor(config: SpriteConfig) {
    this.isLoaded = false;
    this.isShadowLoaded = false;

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
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };

    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;

    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded &&
      this.useShadow &&
      this.shadow &&
      ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }
}
