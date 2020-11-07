import Nozzel from "./nozzle.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("mousemove", this.fever.bind(this));

    this.nozzel = new Nozzel();
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.nozzel.x = this.width / 2;
    this.nozzel.y = -(this.nozzel.leftSize * 0.2);
    this.nozzel.resize(this.width, this.height);
  }

  animate(t) {
    this.nozzel.update();
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "#9ABD91";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fill();

    this.nozzel.draw(this.context);

    requestAnimationFrame(this.animate.bind(this));
  }

  fever() {
    this.nozzel.increaseSensitivity();
  }
}

window.onload = () => {
  new App();
};
