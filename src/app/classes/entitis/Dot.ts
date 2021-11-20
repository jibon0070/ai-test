import {Entity} from "../core/Entity";
import {Game} from "../core/Game";
import {Vector} from "../core/Vector";
import {Brain} from "../core/Brain";
import {group} from "@angular/animations";

export class Dot extends Entity {
  acceleration: Vector;
  velocity: Vector;
  size: Vector;
  position: Vector;
  brain: Brain;
  dead: boolean = false;
  fitness = 0;
  goal_reached: boolean = false;
  is_best: boolean = false;

  constructor(private game: Game) {
    super()
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.size = new Vector(10, 10);
    this.position = new Vector((game.canvas.width / 2), game.canvas.height - 20);
    this.brain = new Brain(10000, game);
  }

  draw(): void {
    if (this.is_best) {
      this.game.ctx.fillStyle = "green";
    } else {
      this.game.ctx.fillStyle = "black";
    }
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.position.x + this.size.x /2, this.position.y+this.size.y/2, this.size.x / 2, 0, Math.PI * 2, false);
    if (this.is_best)
      this.game.ctx.fill();
    else this.game.ctx.stroke();
    this.game.ctx.fillStyle="red"
    this.game.ctx.fillRect(this.position.x, this.position.y, 1, 1);
  }

  update(delta_time: number): void {
    if (!this.dead && !this.goal_reached) {
      if (this.game.population.min_step < this.brain.step)
        this.dead = true;
      if (this.brain.directions.length > this.brain.step) {
        this.acceleration = this.brain.directions[this.brain.step];
        this.brain.step++;
      } else {
        this.dead = true;
      }
      this.velocity.add(this.acceleration);
      // this.velocity.add(new Vector(0, 1));

      this.velocity.limit(5);
      this.position.add(this.velocity);
      //collation check
      //top
      if (this.position.y <= 0) {
        // this.acceleration.reverse();
        // this.velocity.reverse();
        this.dead = true;
      }
      //left
      else if (this.position.x <= 0) {
        // this.acceleration.reverse();
        // this.velocity.reverse();
        this.dead = true
      }
      //bottom
      else if (this.position.y - this.size.y >= this.game.canvas.height) {
        // this.acceleration.reverse();
        // this.velocity.reverse();
        this.dead = true
      }
      //right
      else if (this.position.x - this.size.x >= this.game.canvas.width) {
        // this.acceleration.reverse();
        // this.velocity.reverse();
        this.dead = true
      }
      //goal reached
      else if (Vector.distance(this.position, this.game.goal.position) < 5) {
        this.goal_reached = true;
      }
    }
  }

  calculate_fitness() {
    this.fitness += 1000/Vector.distance(this.position, this.game.goal.position)
    if (this.goal_reached) {
      this.fitness += 1000;
    }
    // if (this.goal_reached) {
    //   this.fitness += 1 / 16 + 1000 / (this.brain.step * this.brain.step);
    // } else {
    //   const distance_to_goal = Vector.distance(this.position, this.game.goal.position);
    //   this.fitness += 1 / (distance_to_goal * distance_to_goal);
    // }
  }

  give_baby(): Dot {
    const baby = new Dot(this.game);
    baby.brain = this.brain.clone();
    return baby;
  }
}
