import { Component, Input, OnInit } from '@angular/core';
import { GameSessionService } from '../../../../core/services/game-session.service';

@Component({
  selector: 'app-board-footer',
  templateUrl: './board-footer.component.html',
  styleUrls: ['./board-footer.component.css']
})
export class BoardFooterComponent {

  constructor(private currentGame : GameSessionService){}

  public setBackgroundColor(){
    if(this.currentGame.winner.didWin){
      if(this.currentGame.winner.player == 1){
        return 'c-board-footer--player-1';
      }
      else {
        return 'c-board-footer--player-2';
      }
    }
   
    return 'c-board-footer--base';
  }
}
