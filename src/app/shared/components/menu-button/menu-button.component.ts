import { Component, Input } from '@angular/core';
import { MenuButtonContents } from '../../types/menu-button';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent {
  @Input() contents : MenuButtonContents = { 
    buttonText : '',
    svgImage : null,
    isCenter : false,
    backgroundColor : '--primary-white'
  };
}
