import {Entity} from "../core/Entity";
import {Game} from "../core/Game";
import {Vector} from "../core/Vector";
import {Brain} from "../core/Brain";

export class Dot extends Entity {
  acceleration: Vector;
  velocity: Vector;
  size: Vector;
  position: Vector;
  private brain: Brain;
  private dead: boolean = false;

  constructor(private game: Game) {
    super()
    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.size = new Vector(10, 10);
    this.position = new Vector(game.canvas.width / 2, game.canvas.height / 2);
    this.brain = new Brain(400);
  }

  draw(): void {
    this.game.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
  }

  update(delta_time: number): void {
    if (!this.dead) {
      if (this.brain.directions.length > this.brain.step) {
        this.acceleration = this.brain.directions[this.brain.step];
        this.brain.step++;
      }


      this.velocity.add(this.acceleration);
      this.velocity.limit(50);
      this.position.add(this.velocity, delta_time);
      //collation check
      //top
      if (this.position.y < 0) {
        this.position.y = 0;
        this.dead = true;
      }
      //left
      else if (this.position.x < 0) {
        this.position.x = 0;
        this.dead = true;
      }
      //bottom
      else if (this.position.y - this.size.y > this.game.canvas.height) {
        this.position.y = this.game.canvas.height - this.size.y;
        this.dead = true;
      }
      //right
      else if (this.position.x - this.size.x > this.game.canvas.width) {
        this.position.x = this.game.canvas.width - this.size.x;
        this.dead = true;
      }
    }
  }


}
