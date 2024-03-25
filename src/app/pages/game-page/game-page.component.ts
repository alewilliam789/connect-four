import { Component } from '@angular/core';
import { GameSessionService } from 'src/app/core/services/game-session.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {

  constructor(public currentGame : GameSessionService){}
}
