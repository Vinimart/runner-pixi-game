import * as PIXI from 'pixi.js';

export class Character {
  private app: PIXI.Application;
  private sprite: PIXI.AnimatedSprite;
  private jumpHeight: number = 200;
  private originalY: number;
  private isJumping: boolean = false;
  private jumpFrame: number = 0;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.originalY = this.app.screen.height - 100;

    // Create sprite sheet animation
    const spriteSheet = PIXI.BaseTexture.from("assets/sprites/cat/sheet.png");
    const width = 156;
    const height = 62;
    const numFrames = 9;

    const textures = [];

    for (let i = 0; i < numFrames; i++) {
      const frame = new PIXI.Texture(
        spriteSheet,
        new PIXI.Rectangle(i * width, 0, width, height)
      );
      textures.push(frame);
    }

    this.sprite = new PIXI.AnimatedSprite(textures);
    this.sprite.animationSpeed = 0.3;
    this.sprite.play();

    // Event listener for jump
    window.addEventListener("keydown", this.jump.bind(this));
  }

  public render() {
    this.centerAndScale(this.sprite);
    this.app.stage.addChild(this.sprite);
  }

  private centerAndScale(sprite: PIXI.Sprite) {
    sprite.anchor.set(0.4);
    sprite.x = this.app.screen.width / 8;
    sprite.y = this.originalY;
    sprite.scale.set(2, 2);
  }

  private jump(event: KeyboardEvent) {
    if (event.key === " " && !this.isJumping) {
      this.isJumping = true;
      this.sprite.stop();
      this.jumpAnimation();
    }
  }

  private jumpAnimation() {
    if (this.sprite.y > this.originalY - this.jumpHeight) {
      this.sprite.gotoAndStop(this.jumpFrame);
      this.sprite.y -= 8;
      requestAnimationFrame(this.jumpAnimation.bind(this));
    } else {
      this.fall();
    }
  }

  private fall() {
    if (this.sprite.y < this.originalY) {
      this.sprite.y += 5; 
      requestAnimationFrame(this.fall.bind(this));
    } else {
      this.isJumping = false;
      this.sprite.gotoAndStop(0);
      this.sprite.y = this.originalY;
      this.sprite.play(); // Resume the animation when falling is complete
    }
  }
}
