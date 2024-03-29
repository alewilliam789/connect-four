import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../core/services/game-session.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {

  constructor(private currentGame : GameSessionService){}

  public getWinState(){
    return this.currentGame.winner.didWin;
  }

  public getPlayer1WinState(){
    return this.currentGame.player1.wins;
  }

  public getPlayer2WinState(){
    return this.currentGame.player2.wins;
  }

  public getPauseState(){
    return this.currentGame.getPausedState();
  }
}
