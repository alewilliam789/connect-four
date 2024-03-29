import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuButtonContents } from '../../types';

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
    backgroundColor : 'white',
    buttonRoute : '',
    hoverColor : null,
  };

  @Output() clickEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();

  public onMenuButtonClick(){
    this.clickEmitter.emit();
  }


}
