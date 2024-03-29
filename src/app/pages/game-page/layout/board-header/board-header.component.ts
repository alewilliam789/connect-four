import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../../../core/services/game-session.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.css']
})
export class BoardHeaderComponent implements OnInit {

  public paused : boolean = false;
  
  constructor(private currentGame : GameSessionService) {}

  ngOnInit(): void {
      this.currentGame.getPausedState().subscribe((pauseState)=>{
        this.paused = pauseState;
      })
  }

  menuButtonClicked(){
    this.currentGame.setPausedState(this.paused);
  }

  restartButtonClicked(){
    this.currentGame.setResetState(true);
  }

}
