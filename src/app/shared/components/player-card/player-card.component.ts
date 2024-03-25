import { Component, Input } from '@angular/core';
import { GameSessionService } from 'src/app/core/services/game-session.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {

  @Input() isPlayer1 : boolean = true;
  public playerWins : number = 0;

  constructor(private currentGame :GameSessionService) { 
    if(this.isPlayer1){
      this.playerWins = currentGame.player1.wins;
    }
    else {
      this.playerWins = currentGame.player2.wins;
    }
  }

  

}
