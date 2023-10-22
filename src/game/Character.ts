import * as PIXI from 'pixi.js';

export class Character {
  public sprite: PIXI.AnimatedSprite;

  private app: PIXI.Application;
  private originalY: number;
  private isJumping: boolean = false;
  private jumpFrame: number = 0;
  private jumpDuration: number = 0;
  private maxJumpDuration: number = 35;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.originalY = this.app.screen.height - 100;

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

    window.addEventListener("keydown", (event) => {
      if (event.key === " " && !this.isJumping) {
        this.isJumping = true;
        this.sprite.stop();
        this.jumpDuration = 0;
        this.jumpAnimation();
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.key === " " && this.isJumping) {
        if (this.jumpDuration < this.maxJumpDuration) {
          this.jumpDuration = this.maxJumpDuration;
        }
      }
    });
  }

  public render() {
    this.centerAndScale(this.sprite);
    this.app.stage.addChild(this.sprite);
  }

  public collidesWith(obstacle: PIXI.Sprite): boolean {
    // Get bounds of character and obstacle
    const characterBounds = this.sprite.getBounds();
    const obstacleBounds = obstacle.getBounds();

    // Check for collision
    return (
      characterBounds.x + characterBounds.width > obstacleBounds.x &&
      characterBounds.x < obstacleBounds.x + obstacleBounds.width &&
      characterBounds.y + characterBounds.height > obstacleBounds.y &&
      characterBounds.y < obstacleBounds.y + obstacleBounds.height
    );
  }

  private centerAndScale(sprite: PIXI.Sprite) {
    sprite.anchor.set(0.2);
    sprite.x = this.app.screen.width / 8;
    sprite.y = this.originalY;
    sprite.scale.set(1.2, 1.2);
  }

  private jumpAnimation() {
    if (this.jumpDuration < this.maxJumpDuration) {
      this.sprite.gotoAndStop(this.jumpFrame);
      this.sprite.y -= 8;
      this.jumpDuration++;
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
      this.sprite.play();
    }
  }
}
