export class XYPosition {
  x;
  y;

  /**
   * 
   * @param {number} x position x
   * @param {number} y position y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  get x() {
    return x;
  }

  set x(newX) {
    this.x = newX;
  }

  get y() {
    return y;
  }

  set y(newY) {
    this.y = newY;
  }
}