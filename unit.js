export default class Unit {
  constructor() {
    this.canvasWidth = 0;
    this.canvasHeigh = 0;
    this.x = 0;
    this.y = 0;
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeigh = height;
  }
}
