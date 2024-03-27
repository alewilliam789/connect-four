import { Component, Renderer2 } from '@angular/core';
import { GameSessionService } from '../../core/services/game-session.service';
import { GameTimerComponent } from '../../shared/components/game-timer/game-timer.component';
import { numSequence } from '../../shared/utils'

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  
  public numberArray = numSequence;

  public currentPlayer : number = 1;

  constructor(private currentGame : GameSessionService, private renderer : Renderer2){}

  ngOnInit(): void {

    this.currentGame.getResetState().subscribe((reset)=>{
      if(reset && this.currentGame.winner.didWin){
        this.currentGame.resetBoard();  
        for(let i = 1; i <= 7; i++){
          document.getElementById(`sub-column-${i}`)?.replaceChildren();
        }
      }
      else {
        this.currentGame.resetGame();
        for(let i = 1; i <= 7; i++){
          document.getElementById(`sub-column-${i}`)?.replaceChildren();
        }
      }
    })

    this.currentGame.getCurrentPlayer().subscribe((player)=>{
      this.currentPlayer = player;
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

    const matrixRow = currentSlot-1;
    const matrixColumn = Number(el.id[el.id.length-1]) -1;

    const piece : HTMLImageElement = this.renderer.createElement("img");
    const highlight : HTMLImageElement = this.renderer.createElement("img");

    highlight.id = `highlight-${matrixRow}-${matrixColumn}`;

    if(this.currentPlayer == 1) {
      this.renderer.addClass(piece,'c-board__piece');
      this.renderer.addClass(piece,'c-board__piece--player-1');
      this.renderer.addClass(highlight, 'c-board__highlight');
      this.renderer.addClass(highlight, 'c-board__piece--winner');
    }
    else {
      this.renderer.addClass(piece,'c-board__piece');
      this.renderer.addClass(piece,'c-board__piece--player-2');
      this.renderer.addClass(highlight, 'c-board__highlight');
      this.renderer.addClass(highlight, 'c-board__piece--winner');
    }


    if(currentColumn.children.length < 6 && !this.currentGame.winner.didWin) {
      const picture : HTMLPictureElement = this.renderer.createElement('picture');
      this.renderer.addClass(picture, 'l-board__piece');

      picture.style.animation = `dropPiece-${currentSlot} ${minTime *currentSlot}s linear normal`;
      picture.style.webkitAnimationFillMode = 'forwards';


      this.renderer.appendChild(picture,highlight);
      this.renderer.appendChild(picture,piece);

      this.renderer.appendChild(currentColumn,picture);
      this.currentGame.makeMove(Number(el.id[el.id.length-1]) -1, this.currentPlayer, minTime*currentSlot*1000);
    }
  }
}
