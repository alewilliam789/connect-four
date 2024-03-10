import { Component } from '@angular/core';
import { numSequence } from 'src/app/shared/utils';

@Component({
  selector: 'app-board-grid',
  templateUrl: './board-grid.component.html',
  styleUrls: ['./board-grid.component.css']
})
export class BoardGridComponent {

  numberArray = numSequence;

}
