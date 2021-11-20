import {Entity} from "../core/Entity";
import {Vector} from "../core/Vector";
import {Game} from "../core/Game";

export class Obsticle extends Entity {
  acceleration!: Vector;
  position!: Vector;
  size!: Vector;
  velocity!: Vector;

  constructor(private game: Game, pos: { x: number, y: number }, size: { x: number, y: number }) {
    super();
    this.position = new Vector(pos.x, pos.y);
    this.size = new Vector(size.x, size.y)
  }

  draw(): void {
    this.game.ctx.fillStyle = "red";
    this.game.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  update(delta_time: number): void {
  }

}
