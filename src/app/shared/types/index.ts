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
    backgroundColor : 'white' | 'yellow' | 'red';
    buttonRoute : '' | 'play' | 'rules' | null;
    hoverColor : 'red' | null;
    textColor ?: 'white';
  }

export interface PieceCount  {
  'EW' : number[][];
  'NS' : number[][];
  'NWSE' : number[][];
  'SWNE' : number[][];
}