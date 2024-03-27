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
    backgroundColor : '--primary-white' | '--primary-red' | '--primary-yellow';
    buttonRoute : '' | 'play' | 'rules';
  }