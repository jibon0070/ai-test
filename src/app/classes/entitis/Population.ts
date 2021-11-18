import {Dot} from "./Dot";
import {Game} from "../core/Game";

export class Population {
  dots: Dot[] = [];
  constructor(size:number, game: Game) {
    this.dots = new Array(size).fill(0).map(_=>(new Dot(game)));
  }
}
