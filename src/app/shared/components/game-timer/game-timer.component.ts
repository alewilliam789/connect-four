import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameSessionService } from 'src/app/core/services/game-session.service';

@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
  styleUrls: ['./game-timer.component.css']
})
export class GameTimerComponent {
  
  constructor(public currentGame : GameSessionService) {
  }


}
