import { Component, Input, OnInit } from '@angular/core';
import { GameSessionService } from '../../../../core/services/game-session.service';
import { Winner } from 'src/app/shared/types';

@Component({
  selector: 'app-board-footer',
  templateUrl: './board-footer.component.html',
  styleUrls: ['./board-footer.component.css']
})
export class BoardFooterComponent  implements OnInit {

  private winner : Winner = {player: 1, didWin: false};

  constructor(private currentGame : GameSessionService){}

  ngOnInit(): void {
      this.currentGame.getWinState().subscribe((winState)=>{
        this.winner = winState;
      })
  }

  public setBackgroundColor(){
    if(this.winner.didWin){
      if(this.winner.player == 0){
        return 'c-board-footer--player-1';
      }
      else {
        return 'c-board-footer--player-2';
      }
    }
   
    return 'c-board-footer--base';
  }
}
