import { Bullet } from './Bullet.js'
import { XYPosition } from './XYPosition.js'

export class Cowboy {
  id;
  width;
  height;
  centerPosition;
  munitions;
  life;
  bulletFired = [];
  accroupi = false;
  deltaYAccroupi;
  timeLastAccroupi = 0;
  canAccroupi = true;
  timeAccroupi = 0;
  cooldownAccroupi = 0;

  /**
   * 
   * @param {string} id identification unique du cowboy
   * @param {number} width largeur du cowboy
   * @param {number} height hauteur du cowboy
   * @param {XYPosition} centerPosition position au centre du cowboy
   * @param {number} munitions nombre de munition du cowboy
   * @param {number} life points de vie du cowboy
   */
  constructor(id, width, height, centerPosition, munitions, life, deltaYAccroupi) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.centerPosition = centerPosition;
    this.munitions = munitions;
    this.life = life;
    this.deltaYAccroupi = deltaYAccroupi;
  }

  /**
   * Retourne un `booléen`
   * Vérifie si l'objet est entré en collision avec le cowboy durant son mouvement
   * @param {XYPosition} beforePosition position de l'objet avant son mouvement
   * @param {XYPosition} afterPosition position de l'objet après son mouvement
   */
  isCollision(beforePosition, afterPosition) {
    // Ici on ne prend pas en compte le y, les balles sont sur une trajectoire rectiligne
    // Avec aucun force en y et partent toujours du même y
    // On considère qu'il y a collision si :
    // 1. centerPosition est entre beforePosition et afterPosition 
    //        Cowboy hitbox ↓             
    //                ----------          
    //        before  | center |    after 
    //                ----------          
    //-----------------OU-----------------
    //        Cowboy hitbox ↓             
    //                ----------          
    //        after   | center |    before 
    //                ----------          
    // 2. si afterPosition est dans la hitbox définie par width et centerPosition
    //        Cowboy hitbox ↓             
    //                ----------          
    //                | after  |          
    //                ----------          
    //                ← Width →           
    if (
      (beforePosition.x < this.centerPosition.x && afterPosition.x > this.centerPosition.x
        && this.centerPosition.y - (this.height / 2) < afterPosition.y && this.centerPosition.y + (this.height / 2) > afterPosition.y) ||
      (beforePosition.x > this.centerPosition.x && afterPosition.x < this.centerPosition.x
        && this.centerPosition.y - (this.height / 2) < afterPosition.y && this.centerPosition.y + (this.height / 2) > afterPosition.y)
    ) {
      // On est dans le cas 1
      return true;
    }

    if (this.centerPosition.x - (this.width / 2) < afterPosition.x && this.centerPosition.x + (this.width / 2) > afterPosition.x &&
    this.centerPosition.y - (this.height / 2) < afterPosition.y && this.centerPosition.y + (this.height / 2) > afterPosition.y) {
      // On est dans le cas 2
      return true
    }

    return false;
  }

  /**
   * Renvoie un objet `Bullet`
   * Fait tirer une balle par le cowboy si son nombre de balle lui permet de tirer
   * @param {string} idCible id de la cible de la balle
   * @param {number} dx distance parcourue en x par la balle par frame (positif ou négatif suivant la direction)
   * @param {number} dy distance parcourue en y par la balle par frame (positif ou négatif suivant la direction) DEVRAIT ÊTRE ÉGALE À ZÉRO
   */
  fire(idCible, dx, dy) {
    if (this.life <= 0) return;
    if (this.accroupi) return;
    if (this.munitions <= 0) {
      return null
    }
    this.munitions -= 1;
    let bulletPosition
    if (dx > 0) {
      bulletPosition = new XYPosition(this.centerPosition.x + this.width / 2, this.centerPosition.y);
    } else {
      bulletPosition = new XYPosition(this.centerPosition.x - this.width / 2 - 15, this.centerPosition.y);
    }
    this.addBulletFired(new Bullet(idCible, bulletPosition, dx, dy));
  }

  /**
   * Retourn un `booléen`
   * Vérifie si un balle touche le cowboy ou non durant la frame
   * La vérification des collision par balle doit se faire avant le mouvement des balles
   * Si la balle le touche, elle doit être détruite et le joueur perds un point de vie
   * @param {Bullet} bullet objet balle
   */
  willBeTouchedByBullet(bullet) {
    let collision = this.isCollision(bullet.position, bullet.nextPosition());
    if (collision) {
      this.life -= 1;
      return true;
    }
    return false;
  }

  addBulletFired(bullet) {
    this.bulletFired.push(bullet);
  }

  removeBulletFired(bullet) {
    this.bulletFired.splice(this.bulletFired.indexOf(bullet), 1);
  }

  /**
   * Met le cowboy en mode accroupi ou non
   */
  toggleAccroupi() {
    if (this.life <= 0) return;
    if (!this.canAccroupi) return;
    this.accroupi = !this.accroupi;
    if (this.accroupi) {
      this.timeLastAccroupi = Date.now();
      this.height -= this.deltaYAccroupi;
      this.centerPosition.y += this.deltaYAccroupi / 2 - 1;
    } else {
      this.timeLastAccroupi = Date.now();
      this.canAccroupi = false;
      this.height += this.deltaYAccroupi;
      this.centerPosition.y -= this.deltaYAccroupi / 2 - 1;
    }
  }

  get accroupi() {
    return this.accroupi;
  }
}