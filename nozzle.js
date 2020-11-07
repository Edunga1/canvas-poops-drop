import Unit from "./unit.js";
import Poop from "./poop.js";

export default class Nozzle extends Unit {
  constructor() {
    super();
    this.leftSize = 100;
    this.rightSize = 107;
    this.gapRate = 1.5;
    this.chancePoop = 0.98;
    this.minChancePoop = 0.9;
    this.maxChancePoop = this.chancePoop;
    this.poopShadowRate = 1.2;
    this.poopPosYRate = 0.2;
    this.poops = [];
  }

  update() {
    this.decreaseSensitivity();

    if (Math.random() > this.chancePoop) {
      const dx = (Math.random() - 0.5) * 15;
      const poop = new Poop();
      poop.x = (this.x + dx) * 0.99;
      poop.y = this.y + this.leftSize * this.poopPosYRate;
      poop.resize(this.canvasHeigh, this.canvasHeigh);
      poop.init();
      this.poops.push(poop);
    }

    const toRemoveIndexes = [];
    for (let poop of this.poops) {
      poop.update();
      if (poop.isArrive) {
        toRemoveIndexes.push(this.poops.indexOf(poop));
      }
    }

    toRemoveIndexes.reverse();
    for (let idx of toRemoveIndexes) {
      this.poops.splice(idx, 1);
    }
  }

  draw(ctx) {
    const leftnozzlex = this.x - this.leftSize / this.gapRate;
    const rightnozzlex = this.x + this.rightSize / this.gapRate;

    // poop shadows
    for (let poop of this.poops) {
      poop.drawShadow(ctx);
    }

    // poops
    for (let poop of this.poops) {
      poop.draw(ctx);
    }

    // right nozzle
    ctx.beginPath();
    ctx.fillStyle = "#F4E2DB";
    ctx.arc(rightnozzlex, this.y, this.rightSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    // right nozzle stroke
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.lineWidth = 3;
    ctx.arc(rightnozzlex, this.y, this.rightSize, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    // left nozzle
    ctx.beginPath();
    ctx.fillStyle = "#F4E2DB";
    ctx.arc(leftnozzlex, this.y, this.leftSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    // left nozzle stroke
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.5;
    ctx.arc(leftnozzlex, this.y, this.leftSize, 0.7, Math.PI);
    ctx.stroke();
    ctx.closePath();

    // debug
    ctx.fillStyle = "black";
    ctx.fillText(this.poops.length + " poops", 10, 10);
    ctx.fillText(this.chancePoop, 10, 20);
  }

  increaseSensitivity() {
    this.chancePoop = Math.max(this.chancePoop * 0.9995, this.minChancePoop);
  }

  decreaseSensitivity() {
    this.chancePoop = Math.min(this.chancePoop * 1.00005, this.maxChancePoop);
  }
}
