import {Vector} from "./Vector";

export class Brain {
  directions: Vector[];
  step = 0;

  constructor(private size: number) {
    this.directions = [];
    for (let i = 0; i < size; i++) {
      const random_angle = Math.random() * (Math.PI * 2);
      this.directions.push(Vector.from_angle(random_angle));
    }
  }

  clone(): Brain {
    const clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i];
    }
    return clone;
  }

  mutate() {
    for (let i = 0; i < this.directions.length; i++) {
      let mutation_rate = 5;
      // console.log(mutation_rate);
      const random = Math.random() * 100;
      if (random < mutation_rate) {
        const random_angle = Math.random() * 2 * Math.PI;
        this.directions[i] = Vector.from_angle(random_angle);
        // console.log(this.directions[i]);
      }
    }
  }
}
