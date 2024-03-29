export interface Player {
  wins: number;
}

export interface Winner {
  player : number;
  didWin : boolean;
}

export interface MenuButtonContents {
    buttonText : string;
    svgImage : string | null;
    isCenter : boolean;
    backgroundColor : 'white' | 'yellow';
    buttonRoute : '' | 'play' | 'rules' | null;
    hoverColor : 'red' | null;
  }