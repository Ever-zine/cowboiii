
const WIDTH_COWBOY = 100;
const HEIGHT_COWBOY = 200;
const DELTA_ACCROUPI = 115;

const J1_FIRE_BUTTON_CODE = 70;
const J1_ACCROUPI_BUTTON_CODE = 86;
const J2_FIRE_BUTTON_CODE = 37;
const J2_ACCROUPI_BUTTON_CODE = 40;
const DOWN_ARROW = 40;
const UP_ARROW = 38;
const ENTER = 13;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const BASE_MUNITIONS = 10;
const COOLDOWN_ACCROUPI = 0;
const TIME_ACCROUPI = 3000;
const BASE_LIFE = 3;
const SPEED_X_BULLET = 70;

const posssibleMenuActions = {
  PLAY: 'play',
  R: 'R',
  OPTIONS: 'options'
}

const posssibleOptionsInput = {
  MUNITIONS: 'munitions',
  LIFE: 'life',
  COOLDOWNACCROUPI: 'cooldownAccroupi',
  SPEEDXBULLET: 'speedXBullet',
  TIMEACCROUPI: 'timeAccroupi',
  QUIT: 'retour'
}

export {
  BASE_MUNITIONS,
  WIDTH_COWBOY,
  HEIGHT_COWBOY,
  DELTA_ACCROUPI,
  BASE_LIFE,
  SPEED_X_BULLET,
  J1_ACCROUPI_BUTTON_CODE,
  J1_FIRE_BUTTON_CODE,
  J2_ACCROUPI_BUTTON_CODE,
  J2_FIRE_BUTTON_CODE,
  COOLDOWN_ACCROUPI,
  TIME_ACCROUPI,
  DOWN_ARROW,
  UP_ARROW,
  ENTER,
  LEFT_ARROW,
  RIGHT_ARROW,
  posssibleMenuActions,
  posssibleOptionsInput
}