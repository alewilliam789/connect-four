import { Component, OnInit } from '@angular/core';
import { GameSessionService } from 'src/app/core/services/game-session.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.css']
})
export class BoardHeaderComponent {
  
  constructor(private currentGame : GameSessionService) {}

  menuButtonClicked(){
    this.currentGame.paused$.next(!this.currentGame.paused$.value);
  }

  restartButtonClicked(){
    this.currentGame.reset$.next(true);
  }

}
