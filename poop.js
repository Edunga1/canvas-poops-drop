import Unit from "./unit.js";

export default class Poop extends Unit {
  constructor() {
    super();
    this.nums = parseInt(Math.random() * 5 + 1);
    this.pieces = [];
    this.isArrive = false;
  }

  init() {
    for (let i = 0; i < this.nums; i++) {
      const piece = new Piece();
      piece.x = this.x;
      piece.y = this.y;
      piece.shuffle();
      piece.resize(this.canvasWidth, this.canvasHeigh);
      this.pieces.push(piece);
    }
  }

  update() {
    this.pieces.forEach((p) => p.update());
    const allArrived = this.pieces.every((p) => p.isArrive);
    if (!this.isArrive && allArrived) {
      this.isArrive = true;
    }
  }

  drawShadow(ctx) {
    this.pieces.forEach((p) => p.drawShadow(ctx));
  }

  draw(ctx) {
    this.pieces.forEach((p) => p.draw(ctx));
  }
}

class Piece extends Unit {
  constructor() {
    super();
    this.vel = 1;
    this.maxVel = 20;
    this.r = Math.random() * 5 + 5;
    this.color = "#773C00";
    this.shadowColor = "#B45B00";
    this.isArrive = false;
    this.shadowRate = 1.2;
  }

  static funVel(x) {
    return Math.pow(x, 4);
  }

  shuffle() {
    this.y = this.y + Math.random() * 10;
  }

  update() {
    this.vel += 0.01;
    this.y += Piece.funVel(this.vel);
    if (!this.isArrive && this.y >= this.canvasHeigh + this.r) {
      this.isArrive = true;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  drawShadow(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.shadowColor;
    ctx.arc(this.x, this.y, this.r * this.shadowRate, 0, 2 * Math.PI);
    ctx.fill();
  }
}
