import { Component, OnInit } from '@angular/core';
import { MenuButtonContents } from '../../types';
import { GameSessionService } from '../../../core/services/game-session.service';

@Component({
  selector: 'app-pause-menu',
  templateUrl: './pause-menu.component.html',
  styleUrls: ['./pause-menu.component.css']
})
export class PauseMenuComponent  implements OnInit {

  private isPaused : boolean = true;

  public pause_buttons : MenuButtonContents[] = [
    {
      buttonText : "CONTINUE GAME",
      svgImage : null,
      isCenter : true,
      backgroundColor : 'white',
      buttonRoute : null,
      hoverColor : null,
    },
    {
      buttonText : "RESTART",
      svgImage : null,
      isCenter : true,
      backgroundColor : 'white',
      buttonRoute : null,
      hoverColor : null,
    },
    {
      buttonText : "QUIT GAME",
      svgImage : null,
      isCenter : true,
      backgroundColor : 'white',
      buttonRoute : '',
      hoverColor : 'red',
    },
  ];

  constructor(private currentGame : GameSessionService){}

  ngOnInit(): void {
      this.currentGame.getPausedState().subscribe((pauseState)=>{
        this.isPaused = pauseState;
      })
  }

  public functionSelection(index : number){
    if(index == 0){
      this.onContinueClick();
    }
    else if(index == 1){
      this.onRestartClick();
    }
    else {
      this.onQuitClick();
    }
  }

  public onContinueClick(){
    this.currentGame.setPausedState(this.isPaused);
  }

  public onRestartClick(){
    this.currentGame.setResetState(true);
    this.currentGame.resetGame();
    this.currentGame.setPausedState(this.isPaused);
  }

  public onQuitClick(){
    this.currentGame.resetGame();
    this.currentGame.setResetState(true);
    this.currentGame.setPausedState(this.isPaused);
  }
}
