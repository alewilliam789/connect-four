import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface Player {
  wins: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {

  private gameBoard : number[][]= [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];

  public player1 : Player = {
    wins : 0,
  }

  public player2 : Player = {
    wins: 0,
  }

  public didWin: boolean = false;

  public reset$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public currentPlayer$: BehaviorSubject<number> = new BehaviorSubject(1);

  public paused$ : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.paused$.next(false);
  }

  public makeMove(columnNumber : number, currentPlayer: number) {
    let currentSlot : number;
    
    for (let i = 5; i >= 0; i--) {
      currentSlot = this.gameBoard[i][columnNumber];

      if(currentSlot == 0){
        this.gameBoard[i][columnNumber] = currentPlayer;
        break;
      }
    }

    if(this.currentPlayer$.value == 1){
      this.currentPlayer$.next(2);
    }
    else {
      this.currentPlayer$.next(1);
    }
  }

  public resetBoard(){
    this.gameBoard = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];

    this.player1.wins = 0;
    this.player2.wins = 0;

    this.currentPlayer$.next(1);
  }
}
