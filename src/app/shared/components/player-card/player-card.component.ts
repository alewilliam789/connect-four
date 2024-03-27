import { Component, Input, OnInit } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {

  @Input() isPlayer1 : boolean = true;
  @Input() currentWins : number = 0;
}
