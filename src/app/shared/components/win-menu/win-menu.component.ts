import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';

@Component({
  selector: 'app-win-menu',
  templateUrl: './win-menu.component.html',
  styleUrls: ['./win-menu.component.css']
})
export class WinMenuComponent implements OnInit {

  public winner : number = 1;

  constructor(private currentGame : GameSessionService){}

  ngOnInit(): void {
      this.winner = this.currentGame.winner.player;
  }


  public onPlayAgain(){
    this.currentGame.setResetState(true);
  }
}
