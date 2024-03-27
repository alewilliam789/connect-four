import { Component } from '@angular/core';
import { MenuButtonContents } from '../../shared/types';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent {

  start_buttons : MenuButtonContents[] = [
    {
      buttonText : "PLAY VS PLAYER",
      svgImage : "/assets/images/player-vs-player.svg",
      isCenter : false,
      backgroundColor : '--primary-yellow',
      buttonRoute : 'play'
    },
    {
      buttonText : "GAME RULES",
      svgImage : null,
      isCenter : false,
      backgroundColor : '--primary-white',
      buttonRoute : 'rules'
    }
  ];
}
