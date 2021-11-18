import {Vector} from "./Vector";

export class Brain {
  directions: Vector[];
  step = 0;
  constructor(size: number) {
    this.directions = [];
    for (let i = 0; i < size; i++) {
      const random_angle = Math.random() * (Math.PI * 2);
      console.log(Vector.from_angle(random_angle))
      this.directions.push(Vector.from_angle(random_angle));
    }
  }
}
