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
  mutation_start: HTMLInputElement;
  mutation_end: HTMLInputElement;
  private first_goal: boolean = false;

  private get goal_reached(): Boolean {
    for (let d of this.dots) {
      if (d.goal_reached) {
        return true;
      }
    }
    return false;
  }

  constructor(size: number, private game: Game) {
    super();
    this.dots = new Array(size).fill(0).map(_ => (new Dot(game)));
    this.info_panel = document.querySelector('.info')!
    this.mutation_start = this.info_panel.querySelector('.mutation-info .counter .start input')!;
    this.mutation_end = this.info_panel.querySelector('.mutation-info .counter .end input')!;
    this.mutation_start.value = '0';
    this.mutation_end.value = this.best_step.toString();
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
          // dot.fitness -= .0000001;
        }
      }
    }
    if (this.all_dead) {
      this.calculate_fitness();
      this.set_best_dot();
      this.info_panel.querySelector<HTMLSpanElement>('#gen')!.innerHTML = this.gen.toString();
      this.info_panel.querySelector<HTMLSpanElement>('#min_step')!.innerHTML = this.best_step.toString();
      if (this.goal_reached) {
        if (!this.first_goal) {
          this.mutation_start.value = (this.best_step).toString();
        }
        this.mutation_start.value = (parseInt(this.mutation_start.value) - 1).toString();
        this.mutation_end.value = this.mutation_start.value;
        this.first_goal = true;
      } else {
        this.mutation_end.value = this.best_step.toString();
        this.mutation_start.value = (this.best_step - 50).toString();
      }
      this.natural_selection();
      this.mutate_baby();
    }

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
    newDots[0] = this.dots[this.best_dot].give_baby();
    newDots[0].is_best = true;
    for (let i = 1; i < this.dots.length; i++) {
      const parent = this.dots[this.best_dot];
      newDots.push(parent.give_baby());
    }
    this.dots = newDots;
    this.gen++;
  }


  private mutate_baby() {
    for (let i = 1; i < this.dots.length; i++) {
      this.dots[i].brain.mutate()
    }
  }

  set_best_dot() {
    let max = 0;
    let maxIndex = 0;
    const goal_reached = this.goal_reached;
    let minStep = 1000;
    let i = 0;
    for (let dot of this.dots) {
      if (!goal_reached) {
        if (dot.fitness > max) {
          max = dot.fitness;
          maxIndex = i;
        }
      } else {
        if (dot.goal_reached) {
          if (minStep > dot.brain.step) {
            minStep = dot.brain.step;
            maxIndex = i;
          }
        }
      }
      i++;
    }
    this.best_dot = maxIndex;
    this.best_step = this.dots[this.best_dot].brain.step;
    // this.min_step = this.dots[this.best_dot].brain.step;
    // if (this.dots[this.best_dot].goal_reached) {
    //   this.min_step = this.dots[this.best_dot].brain.step
    // }
  }
}
