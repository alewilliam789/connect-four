import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';
import { Winner } from '../../types';
import { ComputerService } from '../../../core/services/computer.service';

@Component({
  selector: 'app-win-menu',
  templateUrl: './win-menu.component.html',
  styleUrls: ['./win-menu.component.css']
})
export class WinMenuComponent implements OnInit {

  public winner : Winner = {player: 0, didWin: false};

  public didTied : boolean = false;

  constructor(private currentGame : GameSessionService, private computer : ComputerService){}

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
    else if(this.winner.player == 1 && this.computer.isComputer){
      return 'CPU';
    }
    else {
      return `PLAYER ${this.winner.player+1}`;
    }
  }
}
