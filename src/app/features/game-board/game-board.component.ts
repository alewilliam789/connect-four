import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { GameSessionService } from '../../core/services/game-session.service';
import { numSequence } from '../../shared/utils'
import { Winner } from 'src/app/shared/types';
import { ComputerService } from 'src/app/core/services/computer.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent  implements OnInit {
  
  public numberArray = numSequence;

  public currentPlayer : number = 1;

  private winner : Winner = {player: 1, didWin: false};


  constructor(private currentGame : GameSessionService, private renderer : Renderer2, private computer : ComputerService){}

  ngOnInit(): void {

    this.currentGame.getWinState().subscribe((winState)=>{
      this.winner = winState;
    })

    this.currentGame.getResetState().subscribe((reset)=>{
      for(let i = 1; i <= 7; i++){
        document.getElementById(`sub-column-${i}`)?.replaceChildren();
      }
    })

    this.currentGame.getCurrentPlayer().subscribe((player)=>{

      if(this.currentPlayer != player){
        this.currentPlayer = player;

        if(player == 2 && this.computer.isComputer){
            this.computerMove();
            this.computer.isTurn = false;
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

  private addCounterToColumn(matrixColumn : number, currentPlayer : number){

    let currentColumn = document.getElementById(`sub-column-${matrixColumn+1}`);


    if(currentColumn == null){
      return;
    }

    const currentSlot = 6-currentColumn.children.length;
    const minTime : number = 0.083;

    const matrixRow = currentSlot-1;

    const piece : HTMLImageElement = this.renderer.createElement("img");
    const highlight : HTMLImageElement = this.renderer.createElement("img");

    highlight.id = `highlight-${matrixRow}-${matrixColumn}`;

 
    this.renderer.addClass(piece,'c-board__piece');
    this.renderer.addClass(piece,`c-board__piece--player-${currentPlayer}`);
    this.renderer.addClass(highlight, 'c-board__highlight');
    this.renderer.addClass(highlight, 'c-board__piece--winner');
  


    if(currentColumn.children.length < 6 && !this.winner.didWin) {
      const picture : HTMLPictureElement = this.renderer.createElement('picture');
      this.renderer.addClass(picture, 'l-board__piece');

      picture.style.animation = `dropPiece-${currentSlot} ${minTime *currentSlot}s linear normal`;
      picture.style.webkitAnimationFillMode = 'forwards';


      this.renderer.appendChild(picture,highlight);
      this.renderer.appendChild(picture,piece);

      this.renderer.appendChild(currentColumn,picture);
      this.currentGame.makeMove(matrixRow, matrixColumn, currentPlayer, minTime*currentSlot*1000);
    }
  }



  public playerMove(el : HTMLElement) {
    if(this.computer.isComputer){
      if(!this.computer.isTurn && this.currentPlayer == 1){
        this.addCounterToColumn(Number(el.id[el.id.length-1])-1,1);
        this.computer.isTurn = true;
        this.currentGame.setCurrentPlayer(1);
      }
    }
    else {
      this.addCounterToColumn(Number(el.id[el.id.length-1])-1,this.currentPlayer);
      this.currentGame.setCurrentPlayer(this.currentPlayer);
    }
  }

  private computerMove() {
    const foundColumn = this.computer.makeMove();

    if(this.computer.isTurn){
      setTimeout(()=>{
        this.addCounterToColumn(foundColumn, 2);
        this.currentGame.setCurrentPlayer(2);
      },2000)
      this.computer.isTurn = false;
    }
  }
}
