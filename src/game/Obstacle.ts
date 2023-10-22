import * as PIXI from 'pixi.js';

export class Obstacle {
  private app: PIXI.Application;
  private sprite: PIXI.Sprite;

  constructor(app: PIXI.Application, imagePath: string) {
    this.app = app;
    this.sprite = PIXI.Sprite.from(imagePath);
  }

  public render() {
    // Set the initial position and other properties of the obstacle
    this.centerAndScale(this.sprite);
    this.app.stage.addChild(this.sprite);
  }

  private centerAndScale(sprite: PIXI.Sprite) {
    sprite.anchor.set(0.5);
    // sprite.x =
    // sprite.y = /* Set initial Y position */
    // Set other properties as needed
  }

  public update() {
    // Update the obstacle's position or behavior
  }
}
