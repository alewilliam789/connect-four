import { Component, OnInit } from '@angular/core';
import { Subject, zip, range, interval, startWith, switchMap, EMPTY } from 'rxjs';
import { GameSessionService } from 'src/app/core/services/game-session.service';

@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
  styleUrls: ['./game-timer.component.css'],
})
export class GameTimerComponent implements OnInit {

  public currentTime : number = 30;

  private reset$ = new Subject();

  constructor(public currentGame : GameSessionService) {}

  ngOnInit(): void {
    this.initializeTimer();

    this.currentGame.currentPlayer$.subscribe({
      next: () => {
        this.resetTimer();
      }
    })

    this.currentGame.reset$.subscribe({
      next: () => {
        this.resetTimer();
      }
    })
  }

  public initializeTimer(): void {
    const timer = this.reset$
      .pipe(
        startWith(void 30),
        switchMap(() => zip(range(0,31),interval(1000))),
      );

      const pausableTime$ = this.currentGame.paused$.pipe(switchMap((isPaused)=> isPaused ? EMPTY : timer));

    pausableTime$.subscribe(() => {
      this.currentTime = this.currentTime - 1;
      if(this.currentTime == 0) {
        this.currentTime = 30;
        this.currentGame.currentPlayer$.next(this.currentGame.currentPlayer$.value == 1 ? 2 : 1);
        this.resetTimer();
      }
    })
  }

  public resetTimer(): void {
    this.currentTime = 30;
    this.reset$.next(void 30);
  }
}
