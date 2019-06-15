import { affichage as affichageOptions } from './affichageOptions.js'
import { DOWN_ARROW, UP_ARROW, ENTER, posssibleOptionsInput, LEFT_ARROW, RIGHT_ARROW } from './model/utils.js'
import { GameConfig } from './model/gameConfig.js'
import { launchMenu } from './menu.js'

let lastFrameTimeMs = 0;
let maxFPS = 60;
let delta = 0;
let fps = 60;
let framesThisSecond = 0;
let lastFpsUpdate = 0;
let stopConfig = false;

const optionsActions = [posssibleOptionsInput.MUNITIONS, posssibleOptionsInput.LIFE, posssibleOptionsInput.SPEEDXBULLET,
                        posssibleOptionsInput.TIMEACCROUPI, posssibleOptionsInput.COOLDOWNACCROUPI, posssibleOptionsInput.QUIT];

let selectedOptions = 0;
let downArrowPressed = false;
let upArrowPressed = false;
let enterPressed = false;
let leftArrowPressed = false;
let rightArrowPressed = false;

let myGameConfig;

//Traitement appui bouton 
function keyDownHandler(e) {
  if(e.keyCode == DOWN_ARROW) {
    if (downArrowPressed === true) return;
    downArrowPressed = true;
    selectedOptions === optionsActions.length - 1 ? selectedOptions = 0 : selectedOptions += 1;
  }
  else if(e.keyCode == UP_ARROW) {
    if (upArrowPressed === true) return;
    upArrowPressed = true;
    selectedOptions === 0 ? selectedOptions = optionsActions.length - 1 : selectedOptions -= 1;
  }
  else if(e.keyCode == ENTER) {
    if (enterPressed === true) return;
    enterPressed = true;
    handleEnterButton();
  }
  else if(e.keyCode == LEFT_ARROW) {
    if (enterPressed === true) return;
    leftArrowPressed = true;
    handleLeftButton();
  }
  else if(e.keyCode == RIGHT_ARROW) {
    if (enterPressed === true) return;
    rightArrowPressed = true;
    handleRightButton();
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
  else if(e.keyCode == LEFT_ARROW) {
    leftArrowPressed = false;
  }
  else if(e.keyCode == RIGHT_ARROW) {
    rightArrowPressed = false;
  }
}

function initOptions(gameConfig) {
  stopConfig = false;
  myGameConfig = gameConfig;
  selectedOptions = 0;
  downArrowPressed = false;
  upArrowPressed = false;
  enterPressed = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
}

function handleEnterButton() {
  let selectedMenuValue = optionsActions[selectedOptions];
  if (selectedMenuValue === posssibleOptionsInput.QUIT) {
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyUpHandler, false);
    stopConfig = true;
    launchMenu(myGameConfig);
  }
}

function handleLeftButton() {
  let selectedMenuValue = optionsActions[selectedOptions];
  if (selectedMenuValue !== posssibleOptionsInput.QUIT) {
    if (selectedMenuValue === posssibleOptionsInput.COOLDOWNACCROUPI || selectedMenuValue === posssibleOptionsInput.TIMEACCROUPI) {
      myGameConfig[selectedMenuValue] <= 0 ? myGameConfig[selectedMenuValue] = 0 : myGameConfig[selectedMenuValue] -= 250;
    } else if (selectedMenuValue === posssibleOptionsInput.MUNITIONS || selectedMenuValue === posssibleOptionsInput.LIFE) {
      myGameConfig[selectedMenuValue] <= 1 ? myGameConfig[selectedMenuValue] = Infinity : myGameConfig[selectedMenuValue] -= 1;
    } else {
      myGameConfig[selectedMenuValue] <= 1 ? myGameConfig[selectedMenuValue] = 1 : myGameConfig[selectedMenuValue] -= 1;
    }
  }
}

function handleRightButton() {
  let selectedMenuValue = optionsActions[selectedOptions];
  if (selectedMenuValue !== posssibleOptionsInput.QUIT) {
    if (selectedMenuValue === posssibleOptionsInput.COOLDOWNACCROUPI || selectedMenuValue === posssibleOptionsInput.TIMEACCROUPI) {
      myGameConfig[selectedMenuValue] += 250;
    } else if (selectedMenuValue === posssibleOptionsInput.SPEEDXBULLET) {
      myGameConfig[selectedMenuValue] >= 500 ? myGameConfig[selectedMenuValue] = 500 : myGameConfig[selectedMenuValue] += 1;
    } else {
      myGameConfig[selectedMenuValue] === Infinity ? myGameConfig[selectedMenuValue] = 1 : myGameConfig[selectedMenuValue] += 1;
    }
  }
}

function options(timestamp) {
  // SOURCE : https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
    // Throttle the frame rate.
  if (timestamp > lastFpsUpdate + 1000) { // update every second
    fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS

    lastFpsUpdate = timestamp;
    framesThisSecond = 0;
  }
  framesThisSecond++;
  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    requestAnimationFrame(options);
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  // Dessin du modèle
  affichageOptions(selectedOptions, optionsActions, myGameConfig);
  if (stopConfig === true) return;
  requestAnimationFrame(options);
}

export function launchOptions(gameConfig) {
  initOptions(gameConfig);
  requestAnimationFrame(options);
}

initOptions();
requestAnimationFrame(options);
