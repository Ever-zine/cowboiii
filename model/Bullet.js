import { XYPosition } from "./XYPosition.js";

export class Bullet {
  idCible;
  position;
  dx;
  dy;

  /**
   * 
   * @param {string} idCible id de la cible de la balle
   * @param {XYPosition} position position de la balle
   * @param {number} dx distance parcourue en x par frame
   * @param {number} dy distance parcourue en y par frame
   */
  constructor(idCible, position, dx, dy) {
    this.idCible = idCible;
    this.position = position;
    this.dx = dx;
    this.dy = dy;
  }

  /**
   * Fait avancer la balle
   */
  move() {
    this.position = this.nextPosition();
  }

  /**
   * Renvoie la prochaine position de la balle
   */
  nextPosition() {
    return new XYPosition(this.position.x + this.dx, this.position.y + this.dy);
  }
}