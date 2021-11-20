import {Dot} from "./Dot";
import {Game} from "../core/Game";
import {Entity} from "../core/Entity";
import {Vector} from "../core/Vector";

export class Population extends Entity {
  dots: Dot[] = [];
  acceleration!: Vector;
  position!: Vector;
  size!: Vector;
  velocity!: Vector;
  gen = 1;
  best_dot = 0;
  private fitness_sum: number = 0;
  min_step = 1000;
  private info_panel: HTMLDivElement;
  best_step = 1000;

  constructor(size: number, private game: Game) {
    super();
    this.dots = new Array(size).fill(0).map(_ => (new Dot(game)));
    this.info_panel = document.querySelector('.info')!
    game.canvas.addEventListener("click", e => {
      this.dots.forEach(dot => {
        dot.position.x = e.clientX
        dot.position.y = e.clientY
      });
    });
  }


  draw(): void {
  }

  update(delta_time: number): void {
    //check for obstacle
    for (let obstacle of this.game.obstacles) {
      for (let dot of this.dots) {
        if (Vector.does_collide(dot.position, dot.size, obstacle.position, obstacle.size)) {
          // dot.acceleration.reverse();
          // dot.velocity.reverse();
          dot.dead = true;
          dot.fitness -= 1;
        }
      }
    }
    if (this.all_dead) {
      this.calculate_fitness();
      this.natural_selection();
      this.mutate_baby();
    }
    this.info_panel.querySelector<HTMLSpanElement>('#gen')!.innerText = this.gen.toString();
    this.info_panel.querySelector<HTMLSpanElement>('#min_step')!.innerText = this.best_step.toString();
  }

  calculate_fitness() {
    for (let dot of this.dots) {
      dot.calculate_fitness();
    }
  }

  get all_dead(): boolean {
    for (let dot of this.dots) {
      if (!dot.dead && !dot.goal_reached) {
        return false;
      }
    }
    return true;
  }

  private natural_selection() {
    const newDots = [];
    this.set_best_dot();
    newDots[0] = this.dots[this.best_dot].give_baby();
    newDots[0].is_best = true;
    for (let i = 1; i < this.dots.length; i++) {
      const parent = this.dots[this.best_dot];
      newDots.push(parent.give_baby());
    }
    this.dots = newDots;
    this.gen++;
  }

  private calculate_fitness_sum() {
    this.fitness_sum = 0;
    this.fitness_sum = this.dots.map(row => row.fitness).reduce((a, b) => {
      return a + b;
    });
  }

  get select_parent(): Dot {
    const random = Math.random() * this.fitness_sum;
    let running_sum = 0;
    for (let i = 0; i < this.dots.length; i++) {
      running_sum += this.dots[i].fitness;
      if (running_sum > random) {
        return this.dots[i];
      }
    }
    return this.dots[0];
  }

  private mutate_baby() {
    for (let i = 1; i < this.dots.length; i++) {
      this.dots[i].brain.mutate()
    }
  }

  set_best_dot() {
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }
    this.best_dot = maxIndex;
    this.best_step = this.dots[this.best_dot].brain.step;
    // this.min_step = this.dots[this.best_dot].brain.step;
    // if (this.dots[this.best_dot].goal_reached) {
    //   this.min_step = this.dots[this.best_dot].brain.step
    // }
  }
}
