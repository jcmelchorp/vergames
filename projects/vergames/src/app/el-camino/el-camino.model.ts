export interface LevelTiles {
  id:string;
  level:number;
  cols:number;
  blocks:TileExtended[];
}

export interface TileFigure {
  index: number;
  type: TileType;
  rot: number;
}

export interface TileExtended extends TileFigure {
  image?: string;
  currentRotation?: number;
  correctRotation?: number;
  success?: boolean;
}

export enum TileType {
  N,
  B,
  C,
  E,
  S,
}

export function tileImageFromType(type: TileType): string {
  var image:string='';
  switch (type) {
    case TileType.B:
      image = '/el-camino/blank.png';
      break;
    case TileType.C:
      image = '/el-camino/curve.png';
      break;
    case TileType.E:
      image = '/el-camino/end.png';
      break;
    case TileType.S:
      image = '/el-camino/straight.png';
      break;
  }
  return image;
}

export type TileFileType = keyof typeof TileType;
