import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../core/services/game-session.service';
import { ComputerService } from 'src/app/core/services/computer.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  public didTie : boolean = false;

  public didWin : boolean = false;

  public isPaused : boolean = false;

  public isComputer : boolean = false;

  constructor(private currentGame : GameSessionService, private computer : ComputerService){}

  ngOnInit(): void {
    this.currentGame.getPausedState().subscribe((pauseState)=>{
      this.isPaused = pauseState
    })

    this.currentGame.getTiedState().subscribe((tieState)=>{
      this.didTie = tieState;
    })

    this.currentGame.getWinState().subscribe((winState)=>{
      this.didWin = winState.didWin;
    })

    this.isComputer = this.computer.isComputer;
  }

  public getPlayer1WinState(){
    return this.currentGame.player1.wins;
  }

  public getPlayer2WinState(){
    return this.currentGame.player2.wins;
  }
}
