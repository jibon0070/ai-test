import {Component, OnInit} from '@angular/core';
import {timestamp} from "rxjs/operators";
import {Game} from "./classes/core/Game";
import {Dot} from "./classes/entitis/Dot";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    const canvas = document.querySelector('canvas')!;
    let last_time = 0;
    const game = new Game(canvas);
    game.start();
    const loop = (timestamp: number) => {
      let delta_time = timestamp - last_time;
      last_time = timestamp;
      game.update(delta_time);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
