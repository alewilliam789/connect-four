import { Component, OnChanges, OnInit } from '@angular/core';
import { GameSessionService } from 'src/app/core/services/game-session.service';
import { numSequence } from 'src/app/shared/utils';

@Component({
  selector: 'app-board-grid',
  templateUrl: './board-grid.component.html',
  styleUrls: ['./board-grid.component.css']
})
export class BoardGridComponent implements OnInit {

  public numberArray = numSequence;

  public currentPlayer : number = 1;

  public currentTimer : number = 30;

  constructor(private currentGame : GameSessionService){
  }

  ngOnInit(): void {
    this.currentGame.currentMove$.subscribe({
      next: player => this.currentPlayer = player,
    });

    this.currentGame.timer$.subscribe({
      next: second => this.currentTimer = 30 - second,
    });
  }


  private unhideMarker(marker_id : string) {
    const marker  = document.getElementById(`marker-${marker_id}`) as HTMLImageElement;
    marker.style.opacity = '1';
  }

  private hideMarker(marker_id : string) {
    const marker = document.getElementById(`marker-${marker_id}`) as HTMLImageElement;
    marker.style.opacity = '0';
  }

  public onMouseOverColumn(el : HTMLElement) {
    this.unhideMarker(el.id[el.id.length-1]);
  }

  public onMouseLeaveColumn(el : HTMLElement) {
    this.hideMarker(el.id[el.id.length-1]);
  }

  public addCounterToColumn(el : HTMLElement) {

    const currentSlot = 6-el.children.length;
    const minTime : number = 0.083;

    const piece = document.createElement("img");
    if(this.currentPlayer == 1) {
      if(window.innerWidth > 550) {
        piece.src = "/assets/images/counter-red-large.svg";
      }
      else {
        piece.src = "/assets/images/counter-red-small.svg";
      }
    }
    else {
      if(window.innerWidth > 550) {
        piece.src = "/assets/images/counter-yellow-large.svg";
      }
      else {
        piece.src = "/assets/images/counter-yellow-small.svg";
      }
    }
  
    piece.classList.add("c-board__piece");


    if(el.children.length < 6) {
      piece.style.animation = `dropPiece-${currentSlot} ${minTime *currentSlot}s linear normal`;
      piece.style.webkitAnimationFillMode = 'forwards';
      el.appendChild(piece);
    }

    this.currentGame.makeMove(Number(el.id[el.id.length-1]) -1);
  }

}
