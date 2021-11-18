import {Entity} from "./Entity";
import {Dot} from "../entitis/Dot";
import {Population} from "../entitis/Population";

export class Game {
  ctx: CanvasRenderingContext2D;
  private game_objects: Entity[] = [];
  private dot!: Population;
  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  start() {
    this.dot = new Population(1000, this);
    this.game_objects = [...this.dot.dots];
  }

  update(delta_time: number) {
    this.draw();
    this.game_objects.forEach(object=>object.update(delta_time))
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.game_objects.forEach(object => object.draw())
  }
}
