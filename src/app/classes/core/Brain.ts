import {Vector} from "./Vector";
import {Game} from "./Game";

export class Brain {
  directions: Vector[];
  step = 0;

  constructor(private size: number, private game: Game) {
    this.directions = [];
    for (let i = 0; i < size; i++) {
      const random_angle = Math.random() * (Math.PI * 2);
      this.directions.push(Vector.from_angle(random_angle));
    }
  }

  clone(): Brain {
    const clone = new Brain(this.directions.length, this.game);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i];
    }
    return clone;
  }

  mutate() {
    for (let i = 0; i < this.directions.length; i++) {
      // console.log(this.game.population.mutation_start.innerHTML, this.game.population.mutation_end.innerHTML)
      if (i >= parseInt(this.game.population.mutation_start.value) && i <= parseInt(this.game.population.mutation_end.value)) {
        let mutation_rate = 50;
        // console.log(mutation_rate);
        const random = Math.random() * 100;
        if (random < mutation_rate) {
          const random_angle = Math.random() * 2 * Math.PI;
          this.directions[i] = Vector.from_angle(random_angle);
          // console.log(this.directions[i]);
        }
      }
      if (i > this.game.population.best_step) {
        const random_angle = Math.random() * 2 * Math.PI;
        this.directions[i] = Vector.from_angle(random_angle);
      }
    }
  }
}
