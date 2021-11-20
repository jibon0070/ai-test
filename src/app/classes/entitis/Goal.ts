import {Entity} from "../core/Entity";
import {Vector} from "../core/Vector";
import {Game} from "../core/Game";

export class Goal extends Entity{
  acceleration: Vector = new Vector();
  position: Vector;
  size: Vector = new Vector(20, 20);
  velocity: Vector = new Vector();

  constructor(private game: Game) {
    super();
    this.position = new Vector(game.canvas.width / 2, 10)
  }

  draw(): void {
    this.game.ctx.fillStyle = "green";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.position.x, this.position.y, this.size.x / 2, 0, 2 * Math.PI, false);
    this.game.ctx.fill();
  }

  update(delta_time: number): void {
  }

}
