import { Component } from '@angular/core';
import { MenuButtonContents } from '../../shared/types';
import { ComputerService } from 'src/app/core/services/computer.service';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent {

  start_buttons : MenuButtonContents[] = [
    {
      buttonText : "PLAY VS CPU",
      svgImage : "/assets/images/player-vs-cpu.svg",
      isCenter : false,
      backgroundColor : 'red',
      buttonRoute : 'play',
      hoverColor : null,
    },
    {
      buttonText : "PLAY VS PLAYER",
      svgImage : "/assets/images/player-vs-player.svg",
      isCenter : false,
      backgroundColor : 'yellow',
      buttonRoute : 'play',
      hoverColor : null,
    },
    {
      buttonText : "GAME RULES",
      svgImage : null,
      isCenter : false,
      backgroundColor : 'white',
      buttonRoute : 'rules',
      hoverColor : null,
    }
  ];

  constructor(private computer : ComputerService){}

  public onMenuButtonClick(index : number){

    if(index == 0){
      this.onCpuVsClick();
    }
  }

  private onCpuVsClick(){
    this.computer.isComputer = true;
  }
}
