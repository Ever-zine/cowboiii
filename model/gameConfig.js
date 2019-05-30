import { 
  BASE_MUNITIONS,
  BASE_LIFE,
  SPEED_X_BULLET,
  COOLDOWN_ACCROUPI,
  TIME_ACCROUPI
} from "./utils.js";

export class GameConfig {
  munitions;
  life;
  speedXBullet;
  cooldownAccroupi;
  timeAccroupi;

  constructor() {
    this.munitions = BASE_MUNITIONS;
    this.life = BASE_LIFE;
    this.speedXBullet = SPEED_X_BULLET;
    this.cooldownAccroupi = COOLDOWN_ACCROUPI;
    this.timeAccroupi = TIME_ACCROUPI;
  }
}






