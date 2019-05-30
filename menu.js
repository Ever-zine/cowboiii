import { affichage as affichageMenu } from './affichageMenu.js'
import { DOWN_ARROW, UP_ARROW, ENTER, posssibleMenuActions } from './model/utils.js'
import { launchGame } from './game.js'
import { launchOptions } from './options.js'
import { GameConfig } from './model/gameConfig.js'

let lastFrameTimeMs = 0;
let maxFPS = 60;
let delta = 0;
let fps = 60;
let framesThisSecond = 0;
let lastFpsUpdate = 0;
let stopMenu = false;

const menuActions = [posssibleMenuActions.PLAY, posssibleMenuActions.OPTIONS];

let selectedMenu = 0;
let downArrowPressed = false;
let upArrowPressed = false;
let enterPressed = false;

let gameConfig = new GameConfig();

//Traitement appui bouton
function keyDownHandler(e) {
  if(e.keyCode == DOWN_ARROW) {
    if (downArrowPressed === true) return;
    downArrowPressed = true;
    selectedMenu === menuActions.length - 1 ? selectedMenu = 0 : selectedMenu += 1;
  }
  else if(e.keyCode == UP_ARROW) {
    if (upArrowPressed === true) return;
    upArrowPressed = true;
    selectedMenu === 0 ? selectedMenu = menuActions.length - 1 : selectedMenu -= 1;
  }
  else if(e.keyCode == ENTER) {
    if (enterPressed === true) return;
    enterPressed = true;
    handleEnterButton();
  }
}

//Traitement relachement bouton
function keyUpHandler(e) {
  if(e.keyCode == DOWN_ARROW) {
    downArrowPressed = false;
  }
  else if(e.keyCode == UP_ARROW) {
    upArrowPressed = false;
  }
  else if(e.keyCode == ENTER) {
    enterPressed = false;
  }
}

function initMenu(theGameConfig = null) {
  if (theGameConfig !== null) {
    gameConfig = theGameConfig;
  } else {
    gameConfig = new GameConfig();
  }
  stopMenu = false;
  selectedMenu = 0;
  downArrowPressed = false;
  upArrowPressed = false;
  enterPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
}

function handleEnterButton() {
  let selectedMenuValue = menuActions[selectedMenu];
  switch (selectedMenuValue) {
    case posssibleMenuActions.PLAY:
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
      launchGame(gameConfig);
      break;
    case posssibleMenuActions.OPTIONS:
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
      stopMenu = true;
      launchOptions(gameConfig);
      break;
  }
}

function menu(timestamp) {
  // SOURCE : https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
    // Throttle the frame rate.
  if (timestamp > lastFpsUpdate + 1000) { // update every second
    fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS

    lastFpsUpdate = timestamp;
    framesThisSecond = 0;
  }
  framesThisSecond++;
  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    requestAnimationFrame(menu);
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  // Dessin du modèle
  affichageMenu(selectedMenu, menuActions);
  if (stopMenu === true) return;
  requestAnimationFrame(menu);
}

export function launchMenu(theGameConfig) {
  initMenu(theGameConfig);
  requestAnimationFrame(menu);
}

initMenu();
requestAnimationFrame(menu);
