import { Injectable, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Player, Winner } from '../../shared/types';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {

  private document = inject(DOCUMENT);

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

  public winner : Winner = {player: 1, didWin : false};

  private reset$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public getResetState(){
    return this.reset$.asObservable()
  }

  public setResetState(nextReset : boolean){
    this.reset$.next(nextReset);
  }



  private currentPlayer$: BehaviorSubject<number> = new BehaviorSubject(1);

  public getCurrentPlayer(){
    return this.currentPlayer$.asObservable();
  }

  public setCurrentPlayer(currentPlayer : number){
    if(currentPlayer == 1){
      this.currentPlayer$.next(2);
    }
    else {
      this.currentPlayer$.next(1);
    }
  }

  private paused$ : BehaviorSubject<boolean> = new BehaviorSubject(false);

  public getPausedState(){
    return this.paused$.asObservable();
  }

  public setPausedState(currentPause : boolean){
    this.paused$.next(!currentPause);
  }

  public makeMove(columnNumber : number, currentPlayer: number, minTime : number) {
    let currentSlot : number;
    
    for (let i = 5; i >= 0; i--) {
      currentSlot = this.gameBoard[i][columnNumber];

      if(currentSlot == 0){
        this.gameBoard[i][columnNumber] = currentPlayer;
        this.checkWin(i,columnNumber,currentPlayer, minTime);
        break;
      }
    }

    this.setCurrentPlayer(currentPlayer);
  }

  private checkWin(rowNumber: number, columnNumber : number, currentPlayer : number, minTime : number){
    let pieceCount : number = 1;
    let originalRow = rowNumber;
    let originalColumn = columnNumber;

    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if(!(i == 0 && j == 0)){
          this.checkNeighbor(originalRow+i, originalColumn+j, currentPlayer, pieceCount, i,j, minTime);
          
          if(this.winner.didWin){
            setTimeout(()=> {
              this.setHighlight(rowNumber, columnNumber);
            }, minTime+150);
            break;
          }
          else {
            pieceCount = 1;
            originalRow = rowNumber;
            originalColumn = columnNumber;
          }
        }
      }
    }
  }

  private checkNeighbor(rowNumber : number, columnNumber : number, currentPlayer : number, pieceCount : number, horizontal: number, vertical: number, minTime : number){

    if((rowNumber < 0 || columnNumber < 0) || (rowNumber > 5 || columnNumber > 6)){
      return;
    }

    if(this.gameBoard[rowNumber][columnNumber] == currentPlayer){
      pieceCount++;
    }
    else {
      return;
    }

    if(pieceCount == 4){
      setTimeout(()=> {
        this.setHighlight(rowNumber, columnNumber);
      },minTime);
      this.executeWin(currentPlayer);
      return;
    }
    else {
      this.checkNeighbor(rowNumber+horizontal,columnNumber+vertical,currentPlayer,pieceCount,horizontal,vertical, minTime);
      if(this.winner.didWin){
        setTimeout(()=> {
          this.setHighlight(rowNumber, columnNumber);
        },minTime+50);
      }
    }
  }

  private setHighlight(rowNumber : number, columnNumber : number){
    
    const highlight = this.document.getElementById(`highlight-${rowNumber}-${columnNumber}`);
      
      if(highlight != null){
        highlight.style.visibility = "visible";
      }
  }


  private executeWin(currentPlayer : number) {
    this.winner.player = currentPlayer;
    this.winner.didWin = true;

    if(currentPlayer == 1){
      this.player1.wins++;
    }
    else {
      this.player2.wins++;
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

    this.winner.didWin = false;

    this.currentPlayer$.next(1);
  }

  public resetGame(){
    this.player1.wins = 0;
    this.player2.wins = 0;

    this.resetBoard();
  }
}
