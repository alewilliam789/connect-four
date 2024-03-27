import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent {

  @Input() buttonText : string = "";
  @Output() wasClickedEvent = new EventEmitter<HTMLButtonElement>();

  onButtonClick(button : HTMLButtonElement) {
    this.wasClickedEvent.emit(button);
  }
}
