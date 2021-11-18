import {Game} from "./Game";
import {Vector} from "./Vector";

export abstract class Entity {

  abstract size: Vector;
  abstract velocity: Vector;
  abstract position: Vector;
  abstract acceleration: Vector;

  abstract draw(): void;

  abstract update(delta_time: number): void;
}

