import { Injectable } from '@angular/core';
import { GameSessionService } from './game-session.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  public isComputer : boolean = false;

  public isTurn : boolean = false;

  constructor() {}


  public makeMove() : number {
    // 1. Scan the board for possible moves
  
    return Math.round(Math.random()*6);
  }






}
