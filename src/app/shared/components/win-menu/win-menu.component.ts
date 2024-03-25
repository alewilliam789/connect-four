import { Component } from '@angular/core';
import { GameSessionService } from 'src/app/core/services/game-session.service';

@Component({
  selector: 'app-win-menu',
  templateUrl: './win-menu.component.html',
  styleUrls: ['./win-menu.component.css']
})
export class WinMenuComponent {

  constructor(public currentGame : GameSessionService ){}
}
