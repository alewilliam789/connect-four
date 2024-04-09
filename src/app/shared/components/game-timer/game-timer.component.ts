import { Component, OnInit } from '@angular/core';
import { Subject, zip, range, interval, startWith, switchMap, EMPTY } from 'rxjs';
import { GameSessionService } from '../../../core/services/game-session.service';
import { ComputerService } from 'src/app/core/services/computer.service';

@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
  styleUrls: ['./game-timer.component.css'],
})
export class GameTimerComponent implements OnInit {

  public currentTime : number = 30;

  public currentPlayer : number = 1;

  private reset$ = new Subject();

  constructor(private currentGame : GameSessionService, private computer : ComputerService) {}

  ngOnInit(): void {
    this.initializeTimer();

    this.currentGame.getCurrentPlayer().subscribe({
      next: (player) => {
        this.currentPlayer = player;
        this.resetTimer();
      }
    })

    this.currentGame.getResetState().subscribe({
      next: () => {
        this.resetTimer();
      }
    })
  }


  private initializeTimer(): void {
    const timer = this.reset$
      .pipe(
        startWith(void 30),
        switchMap(() => zip(range(0,31),interval(1000))),
      );

      const pausableTime$ = this.currentGame.getPausedState()
        .pipe(switchMap((isPaused)=> isPaused ? EMPTY : timer));

    pausableTime$.subscribe(() => {
      this.currentTime = this.currentTime - 1;
      if(this.currentTime == 0) {
        this.currentTime = 30;
        this.computer.isTurn = true;
        this.currentGame.setCurrentPlayer(this.currentPlayer);
        this.resetTimer();
      }
    })
  }

  private resetTimer(): void {
    this.currentTime = 30;
    this.reset$.next(void 30);
  }

  public getGameTimerText(){
    if(this.computer.isComputer && this.currentPlayer == 2){
      return "CPU"
    }
    else{
      return `PLAYER ${this.currentPlayer}`
    }
  }
}
