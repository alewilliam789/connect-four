import { Component, Input, OnInit } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {

  @Input() player : number = 1;
  @Input() isComputer : boolean = false;
  @Input() currentWins : number = 0;

  public getPlayerText(){
    if(!this.isComputer){
      return `PLAYER ${this.player}`;
    }
    else{
      return "CPU"
    }
  }
}
