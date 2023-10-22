import * as PIXI from 'pixi.js';

import { Background } from './game/Background';
import { Character } from './game/Character';

const app = new PIXI.Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view as HTMLCanvasElement);

const background = new Background(app);
background.render();

// Define a fixed speed for the background movement
const backgroundSpeed = 4; // Adjust the speed as needed

const character = new Character(app);
character.render();

app.ticker.add(() => {
  // Move the background based on the fixed speed
  background.moveBackground(backgroundSpeed);
});
