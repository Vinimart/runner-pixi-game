import * as PIXI from 'pixi.js';

import { Background } from './game/Background';
import { Character } from './game/Character';
import { Obstacle } from './game/Obstacle';

const backgroundSpeed = 0.5; // Adjust the speed as needed

const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view as HTMLCanvasElement);

const background = new Background(app);
const character = new Character(app);
character.render();

const obstacleTexture = [
  PIXI.Texture.from("assets/sprites/obstacles/box.png"),
  PIXI.Texture.from("assets/sprites/obstacles/longbox.png"),
];

const obstacles: Obstacle[] = [];

let time = 0;

app.ticker.add(() => {
  time -= 1 / 60;

  if (time <= 0) {
    time = Math.random() * 2 + 2;

    obstacles.push(new Obstacle(app, obstacleTexture, character.sprite.x));
  }
});

app.ticker.add(() => {
  // Move the background based on the fixed speed
  background.moveBackground(backgroundSpeed);

  // Update obstacles
  for (const obstacle of obstacles) {
    obstacle.update();

    // Check for collision between character and obstacles
    if (character.collidesWith(obstacle.sprite)) {
      app.stage.removeChild(obstacle.sprite);
    }
  }
});
