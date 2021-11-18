import {Entity} from "./Entity";
import {Dot} from "../entitis/Dot";

export class Game {
  ctx: CanvasRenderingContext2D;
  private game_objects: Entity[] = [];
  private dot!: Dot;
  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  start() {
    this.dot = new Dot(this);
    this.game_objects = [this.dot];
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
