import { Cowboy } from "./model/Cowboy.js";
import { XYPosition } from "./model/XYPosition.js";
import { 
  BASE_MUNITIONS as CONFIG_BASE_MUNITIONS,
  BASE_LIFE as CONFIG_BASE_LIFE,
  SPEED_X_BULLET as CONFIG_SPEED_X_BULLET,
  COOLDOWN_ACCROUPI as CONFIG_COOLDOWN_ACCROUPI,
  TIME_ACCROUPI as CONFIG_TIME_ACCROUPI,
  WIDTH_COWBOY, HEIGHT_COWBOY, DELTA_ACCROUPI, 
  J1_ACCROUPI_BUTTON_CODE, J1_FIRE_BUTTON_CODE, J2_ACCROUPI_BUTTON_CODE, J2_FIRE_BUTTON_CODE, ENTER
} from "./model/utils.js";
import { affichage as affichageGame } from "./affichageGame.js"
import { launchMenu } from './menu.js'
import { GameConfig } from "./model/gameConfig.js";

let cowboyList = [];
let j1FirePressed = false;
let j1AccroupiPressed = false;
let j2FirePressed = false;
let j2AccroupiPressed = false;
let j2AvancePressed = false;
let enterPressed = false;
let lastFrameTimeMs = 0;
let maxFPS = 60;
let delta = 0;
let fps = 60;
let framesThisSecond = 0;
let lastFpsUpdate = 0;
let isGameEnded = false;
let stopGame = false;

let GAME_CONFIG = new GameConfig();
let BASE_MUNITIONS = CONFIG_BASE_MUNITIONS;
let BASE_LIFE = CONFIG_BASE_LIFE;
let SPEED_X_BULLET = CONFIG_SPEED_X_BULLET;
let COOLDOWN_ACCROUPI = CONFIG_COOLDOWN_ACCROUPI;
let TIME_ACCROUPI = CONFIG_TIME_ACCROUPI;

//Traitement appui bouton
function keyDownHandler(e) {
  if(e.keyCode == J1_FIRE_BUTTON_CODE) {
    if (j1FirePressed === true) return;
    j1FirePressed = true;
    cowboyList[0].fire("2", SPEED_X_BULLET, 0);
  }
  else if(e.keyCode == J1_ACCROUPI_BUTTON_CODE) {
    if (j1AccroupiPressed === true) return;
    j1AccroupiPressed = true;
    cowboyList[0].toggleAccroupi();
  }
  else if(e.keyCode == J2_FIRE_BUTTON_CODE) {
    if (j2FirePressed === true) return;
    j2FirePressed = true;
    cowboyList[1].fire("1", -SPEED_X_BULLET, 0);
  }
  else if(e.keyCode == J2_ACCROUPI_BUTTON_CODE) {
    if (j2AccroupiPressed === true) return;
    j2AccroupiPressed = true;
    cowboyList[1].toggleAccroupi();
  } else if (e.keyCode == ENTER) {
    if (enterPressed === true) return;
    enterPressed = true;
    handleEnterPressed();
  }
}

//Traitement relachement bouton
function keyUpHandler(e) {
  if(e.keyCode == J1_FIRE_BUTTON_CODE) {
    j1FirePressed = false;
  }
  else if(e.keyCode == J1_ACCROUPI_BUTTON_CODE) {
    j1AccroupiPressed = false;
  }
  else if(e.keyCode == J2_FIRE_BUTTON_CODE) {
    j2FirePressed = false;
  }
  else if(e.keyCode == J2_ACCROUPI_BUTTON_CODE) {
    j2AccroupiPressed = false;
  }
  else if (e.keyCode == ENTER) {
    enterPressed = false;
  }
}

function handleEnterPressed() {
  if (isGameEnded === true) {
    stopGame = true;
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyUpHandler, false);
    launchMenu(GAME_CONFIG);
  }
}

/**
 * Initalise le jeu
 */
function initGame(gameConfig) {
  GAME_CONFIG = gameConfig;
  BASE_LIFE = gameConfig.life;
  BASE_MUNITIONS = gameConfig.munitions;
  SPEED_X_BULLET = gameConfig.speedXBullet;
  COOLDOWN_ACCROUPI = gameConfig.cooldownAccroupi;
  TIME_ACCROUPI = gameConfig.timeAccroupi;
  cowboyList = [];
  j1FirePressed = false;
  j1AccroupiPressed = false;
  j2FirePressed = false;
  j2AccroupiPressed = false;
  j2AvancePressed = false;
  enterPressed = false;
  isGameEnded = false;
  stopGame = false;
  cowboyList.push(new Cowboy("1", WIDTH_COWBOY, HEIGHT_COWBOY, new XYPosition(160, 440), BASE_MUNITIONS, BASE_LIFE, DELTA_ACCROUPI));
  cowboyList.push(new Cowboy("2", WIDTH_COWBOY, HEIGHT_COWBOY, new XYPosition(800, 440), BASE_MUNITIONS, BASE_LIFE, DELTA_ACCROUPI));
  //Attente appui bouton
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
}

/**
 * Boucle de jeu
 */
function game(timestamp) {
  // SOURCE : https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
    // Throttle the frame rate.
  if (timestamp > lastFpsUpdate + 1000) { // update every second
    fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS

    lastFpsUpdate = timestamp;
    framesThisSecond = 0;
  }
  framesThisSecond++;
  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    requestAnimationFrame(game);
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  // Vérification des collisions
  let bulletToDelete = [];
  for (let i = 0; i < cowboyList.length; i++) {
    const cowboy = cowboyList[i];
    if (cowboy.life <= 0) {
      isGameEnded = true;
    }
    if(!cowboy.canAccroupi) {
      cowboy.cooldownAccroupi = cowboy.timeLastAccroupi + COOLDOWN_ACCROUPI - Date.now();
      if (cowboy.cooldownAccroupi < 0) {
        cowboy.canAccroupi = true;
      }
    }
    
    if (cowboy.accroupi === true) {
      cowboy.timeAccroupi = cowboy.timeLastAccroupi + TIME_ACCROUPI - Date.now();
      if (cowboy.timeAccroupi < 0) {
          cowboy.toggleAccroupi();
      }
    }
    for (let j = 0; j < cowboy.bulletFired.length; j++) {
      const bullet = cowboy.bulletFired[j];

      let cible = cowboyList.find(function (cowboy) {
        return cowboy.id === bullet.idCible;
      });
      // Mouvement de la balle
      bullet.move();
      let willBeTouched = cible.willBeTouchedByBullet(bullet);
      // Détruire la balle si elle sort de l'écran
      if (willBeTouched) {
        bulletToDelete.push({ cowboy: cowboy, bullet: bullet });
      }

    }
  }
  // Dessin du modèle
  affichageGame(cowboyList, fps, isGameEnded);

  // Destruction des balles après l'affichage
  for (let i = 0; i < bulletToDelete.length; i++) {
    bulletToDelete[i].cowboy.removeBulletFired(bulletToDelete[i].bullet);
  }
  if (stopGame) return;
  requestAnimationFrame(game);
}

export function launchGame(gameConfig) {
  initGame(gameConfig);
  requestAnimationFrame(game);
}


// Normalement le jeu tourne en 60 fps


// A Faire => Les event listener sur les touche de tire
// Sur la touche pour le joueur 1 ("F"), faire cowboyList[0].fire("2", vitesseEnX, 0); avec une vitesse en x pas trop grande, (genre 100 ça met 1-2 secondes pour toucher l cible)
// Sur la touche pour le joueur 2 ("ENTER") faire cowboyList[1].fire("1", vitesseEnX, 0);
// A faire => La fonction affichage avec les canvas
