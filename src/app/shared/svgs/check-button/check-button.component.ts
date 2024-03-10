import { Component } from '@angular/core';

@Component({
  selector: 'app-check-button',
  templateUrl: './check-button.component.svg',
  styleUrls: ['./check-button.component.css']
})
export class CheckButtonComponent {

  fillColor = '#000000';

  onMouseEnter() {
    this.fillColor = 'var(--primary-purple1)';
  }

  onMouseLeave() {
    this.fillColor ='#000000';
  }

}
