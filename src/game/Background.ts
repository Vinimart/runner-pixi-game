import * as PIXI from 'pixi.js';

export class Background {
  private staticBackground: PIXI.Sprite;
  private staticBackground2: PIXI.Sprite;
  private movingLayerContainer: PIXI.Container;
  private app: PIXI.Application;
  private numMovingLayers: number = 3; // Number of moving layers
  private movingLayers: PIXI.Sprite[] = [];

  constructor(app: PIXI.Application) {
    this.app = app;

    // Create the static background layer
    this.staticBackground = PIXI.Sprite.from(
      "assets/sprites/background/parallax-mountain-bg.png"
    );

    this.staticBackground2 = PIXI.Sprite.from(
      "assets/sprites/background/parallax-mountain-trees.png"
    );

    this.centerAndScale(this.staticBackground);

    // scale and position the static background2
    this.staticBackground2.anchor.set(0.5);
    this.staticBackground2.x = this.app.screen.width / 2;
    this.staticBackground2.y = this.app.screen.height / 1.45;
    this.staticBackground2.width = this.app.screen.width;
    this.staticBackground2.height = 600;

    // Create a container for the moving layers
    this.movingLayerContainer = new PIXI.Container();

    // Create and position multiple moving layers (mountains)
    for (let i = 0; i < this.numMovingLayers; i++) {
      const movingLayer = PIXI.Sprite.from(
        "assets/sprites/background/parallax-mountain-mountains.png"
      );
      this.centerAndScale(movingLayer);

      // Position the moving layer horizontally based on its index
      movingLayer.x = i * movingLayer.width;

      // Position the moving layer below the static background
      movingLayer.y = app.screen.height - movingLayer.height / 2;

      // Scale the moving layers to fill the screen
      movingLayer.scale.set(2, 2);

      this.movingLayers.push(movingLayer);
      this.movingLayerContainer.addChild(movingLayer);
    }

    // Add the container to the stage
    app.stage.addChild(
      this.staticBackground,
      this.movingLayerContainer,
      this.staticBackground2
    );
  }

  private centerAndScale(sprite: PIXI.Sprite) {
    sprite.anchor.set(0.5);
    sprite.x = this.app.screen.width / 2;
    sprite.y = this.app.screen.height / 2;
    sprite.width = this.app.screen.width;
    sprite.height = this.app.screen.height;
  }

  public moveBackground(speed: number) {
    for (let i = 0; i < this.numMovingLayers; i++) {
      // Move each moving layer (mountains) to the left based on the speed
      this.movingLayers[i].x -= speed;

      // Check if a moving layer has moved completely out of the screen to the left
      if (this.movingLayers[i].x <= -this.movingLayers[i].width) {
        // If it has, reposition it to the right to create an infinite loop
        this.movingLayers[i].x = Math.round(
          this.movingLayers[i].x +
            this.movingLayers[i].width * this.numMovingLayers
        );
      }
    }
  }
}
