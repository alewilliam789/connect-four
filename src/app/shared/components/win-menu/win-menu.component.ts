import { Component, OnInit, Input } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';
import { Winner } from '../../types';

@Component({
  selector: 'app-win-menu',
  templateUrl: './win-menu.component.html',
  styleUrls: ['./win-menu.component.css']
})
export class WinMenuComponent implements OnInit {

  public winner : Winner = {player: 1, didWin: false};

  public didTied : boolean = false;

  @Input() isComputer : boolean = false;

  constructor(private currentGame : GameSessionService){}

  ngOnInit(): void {
    this.currentGame.getWinState().subscribe((winState)=> {
      this.winner = winState;
    })

    this.currentGame.getTiedState().subscribe((tieState)=>{
      this.didTied = tieState;
    })
  }


  public onPlayAgain(){
    this.currentGame.setResetState(true);
    this.currentGame.resetBoard();

    if(this.didTied){
      this.currentGame.setTiedState(false);
    }
    else {
      this.currentGame.setWinState({player: 1, didWin: false});
    }
  }

  public getMenuText(){
    if(this.didTied){
      return 'YOU HAVE';
    }
    else {
      if(this.isComputer && this.winner.player == 2){
        return `CPU`;
      }

      return `PLAYER ${this.winner.player}`;
    }
  }
}
