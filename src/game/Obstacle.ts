import * as PIXI from 'pixi.js';

export class Obstacle {
  public sprite: PIXI.Sprite;
  private app: PIXI.Application;
  private speed: number; // Speed at which obstacles move towards the character
  private amplitude: number; // Adjust this value for the amplitude of the obstacle's vertical movement
  private frequency: number; // Adjust this value for the frequency of the obstacle's vertical movement
  private initialY: number;

  constructor(
    app: PIXI.Application,
    texture: PIXI.Texture,
    characterX: number
  ) {
    this.app = app;
    this.speed = 5; // Adjust the speed as needed
    this.amplitude = 5; // Adjust the amplitude for the vertical movement
    this.frequency = 0.01; // Adjust the frequency for the vertical movement

    // Create the obstacle sprite
    this.sprite = new PIXI.Sprite(texture);

    // Adjust size
    this.sprite.width = 70;
    this.sprite.height = 70;

    // Set the initial position of the obstacle to the right of the character
    this.sprite.x = characterX + app.screen.width;
    this.sprite.y = app.screen.height - 100; // Adjust the Y position as needed

    // Store the initial Y position
    this.initialY = this.sprite.y;

    app.stage.addChild(this.sprite);
  }

  public update() {
    // Move the obstacle towards the character
    this.sprite.x -= this.speed;

    // Apply a smooth vertical oscillation to the obstacle
    const delta = this.amplitude * Math.sin(this.frequency * this.sprite.x);
    this.sprite.y = this.initialY + delta;

    // Remove the obstacle if it's off the screen
    if (this.sprite.x < -this.sprite.width) {
      this.app.stage.removeChild(this.sprite);
    }
  }
}
