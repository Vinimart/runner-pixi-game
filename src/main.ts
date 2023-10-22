import * as PIXI from 'pixi.js';

import { Background } from './game/Background';
import { Character } from './game/Character';
import { Obstacle } from './game/Obstacle';

const backgroundSpeed = 4; // Adjust the speed as needed

const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view as HTMLCanvasElement);

const background = new Background(app);
background.render();

const character = new Character(app);
character.render();

const obstacleTexture = PIXI.Texture.from("assets/sprites/obstacles/box.png");

const obstacles: Obstacle[] = [];

app.ticker.add(() => {
  // Move the background based on the fixed speed
  background.moveBackground(backgroundSpeed);

  // Generate obstacles at regular intervals
  if (Math.random() < 0.008) {
    obstacles.push(new Obstacle(app, obstacleTexture, character.sprite.x));
  }

  // Update obstacles
  for (const obstacle of obstacles) {
    obstacle.update();

    // Check for collision between character and obstacles
    if (character.collidesWith(obstacle.sprite)) {
      app.stage.removeChild(obstacle.sprite);
    }
  }
});
