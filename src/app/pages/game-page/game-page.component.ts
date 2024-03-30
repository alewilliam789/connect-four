import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../core/services/game-session.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public didTie : boolean = false;

  public didWin : boolean = false;

  public isPaused : boolean = false;

  constructor(private currentGame : GameSessionService){}

  ngOnInit(): void {
    this.currentGame.getPausedState().subscribe((pauseState)=>{
      this.isPaused = pauseState
    })

    this.currentGame.getTiedState().subscribe((tieState)=>{
      this.didTie = tieState;
    })

    this.currentGame.getWinState().subscribe((winState)=>{
      this.didWin = winState.didWin;
    })
  }

  public getPlayer1WinState(){
    return this.currentGame.player1.wins;
  }

  public getPlayer2WinState(){
    return this.currentGame.player2.wins;
  }
}
