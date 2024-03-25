import { Component, Renderer2 } from '@angular/core';
import { GameSessionService } from 'src/app/core/services/game-session.service';
import { numSequence } from 'src/app/shared/utils';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  
  public numberArray = numSequence;

  public currentPlayer : number = 1;

  constructor(public currentGame : GameSessionService, private renderer : Renderer2){}

  ngOnInit(): void {

    this.currentGame.reset$.subscribe((reset)=>{
      if(reset){
        this.currentGame.resetBoard();  
        for(let i = 1; i <= 7; i++){
          document.getElementById(`sub-column-${i}`)?.replaceChildren();
        }
      }
    })
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

    let currentColumn = document.getElementById(`sub-column-${el.id[el.id.length-1]}`);

    if(currentColumn == null){
      return;
    }

    const currentSlot = 6-currentColumn.children.length;
    const minTime : number = 0.083;


    const piece = this.renderer.createElement("img");
    if(this.currentGame.currentPlayer$.value == 1) {
      this.renderer.addClass(piece,'c-board__piece');
      this.renderer.addClass(piece,'c-board__piece--player-1');
    }
    else {
      this.renderer.addClass(piece,'c-board__piece');
      this.renderer.addClass(piece,'c-board__piece--player-2');
    }


    if(currentColumn.children.length < 6) {
      piece.style.animation = `dropPiece-${currentSlot} ${minTime *currentSlot}s linear normal`;
      piece.style.webkitAnimationFillMode = 'forwards';

      this.renderer.appendChild(currentColumn,piece);
      this.currentGame.makeMove(Number(el.id[el.id.length-1]) -1, this.currentGame.currentPlayer$.value);
    }
  }
}
