import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { GameSessionService } from './game-session.service';

interface MoveResponse {
  move: number
}


@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  public isComputer : boolean = false;

  public isTurn : boolean = false;



  constructor() {}

  public makeMove(previousMove : number) : number{
    let randomOffset = Math.round(Math.random()*2)-1;
    while(previousMove+randomOffset < 0 || previousMove+randomOffset > 6){
      randomOffset = Math.round(Math.random()*2)-1;
    }

    return previousMove+randomOffset;
  }
}
