import {Entity} from "./Entity";
import {Population} from "../entitis/Population";
import {Goal} from "../entitis/Goal";
import {Dot} from "../entitis/Dot";
import {Obsticle} from "../entitis/Obsticle";

export class Game {
  ctx: CanvasRenderingContext2D;
  private game_objects: Entity[] = [];
  population!: Population;
  goal!: Goal;
  obstacles!: Obsticle[];

  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  start() {
    this.population = new Population(800, this);
    this.goal = new Goal(this);
    this.obstacles = [
      new Obsticle(this, {x: 0, y: 450}, {x:200, y:30}),
      new Obsticle(this, {x: 250, y: 450}, {x:550, y:30}),
      new Obsticle(this, {x: 0, y: 300}, {x:550, y:30}),
      new Obsticle(this, {x: 600, y: 300}, {x:200, y:30}),
    ];
  }

  update(delta_time: number) {
    // this.game_objects.forEach(object=>object.update(delta_time))
    this.draw();
    this.population.dots.forEach(row => row.update(delta_time));
    this.population.update(delta_time);
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.game_objects.forEach(object => object.draw())
    this.goal.draw();
    this.population.dots.forEach(row => row.draw());
    this.obstacles.forEach(row => row.draw());
  }
}
