import { Injectable, Signal, signal } from '@angular/core';
import {
  LevelTiles,
  TileExtended,
  TileFigure,
  tileImageFromType,
  TileType,
} from './el-camino.model';
import { from, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
const levels: LevelTiles[] = [
  {
    id: '001',
    level: 1,
    cols:2,
    blocks: [
      { index: 1, type: TileType.E, rot: 270 },
      { index: 2, type: TileType.C, rot: 180 },
      { index: 3, type: TileType.E, rot: 270 },
      { index: 4, type: TileType.C, rot: 270 },
    ],
  },
  {
    id: '002',
    level: 2,
    cols:3,
    blocks: [
      { index: 1, type: TileType.C, rot: 90 },
      { index: 2, type: TileType.S, rot: 90 },
      { index: 3, type: TileType.C, rot: 180 },
      { index: 4, type: TileType.C, rot: 0 },
      { index: 5, type: TileType.E, rot: 90 },
      { index: 6, type: TileType.S, rot: 0 },
      { index: 7, type: TileType.B, rot: 0 },
      { index: 8, type: TileType.B, rot: 0 },
      { index: 9, type: TileType.E, rot: 180 },
    ],
  },
  {
    id: '003',
    level: 3,
    cols:3,
    blocks: [
      { index: 1, type: TileType.C, rot: 90 },
      { index: 2, type: TileType.S, rot: 90 },
      { index: 3, type: TileType.C, rot: 180 },
      { index: 4, type: TileType.C, rot: 0 },
      { index: 5, type: TileType.E, rot: 90 },
      { index: 6, type: TileType.S, rot: 0 },
      { index: 7, type: TileType.B, rot: 0 },
      { index: 8, type: TileType.B, rot: 0 },
      { index: 9, type: TileType.E, rot: 180 },
    ],
  },
];

@Injectable()
export class ElCaminoService {
  levels$!: Observable<LevelTiles[]>;
  levels: Signal<LevelTiles[] | undefined>;
  constructor() {
    this.levels$ = this.getBlocks();
    this.levels = toSignal(this.levels$);
  }

  getBlocks(): Observable<LevelTiles[]> {
    return of(levels).pipe(
      map((levels) =>
        levels.map((level) => {
          let blocks = level.blocks.map((tile) => {
            let iniRot=Math.floor(Math.random()*4)*90;
            if (iniRot==tile.rot) iniRot=(tile.rot+180) % 360;
            return {
              index: tile.index,
              type: tile.type,
              image: tileImageFromType(tile.type),
              currentRotation: iniRot,
              correctRotation: tile.rot,
              success: tile.type == TileType.B ? true : iniRot - tile.rot == 0 ? true : false,
            } as TileExtended;
          });
          return {
            id: level.id,
            level: level.level,
            cols: level.cols,
            blocks: blocks,
          } as LevelTiles;
        }),
      ),
      tap((levels) => console.log(levels)),
    );
  }

  //   getTilesByLevel(level: number): Observable<TileExtended> {
  //     return of(levels[level - 1]).pipe(
  //       map((tiles) => {
  //         console.log(Object.values(tiles) as TileFigure[]);
  //         return (Object.values(tiles) as TileFigure[]).map((tile) => {
  //           var extendedTile: TileExtended = {
  //             index: tile.index,
  //             type: tile.type,
  //             image: tileImageFromType(tile.type),
  //             currentRotation: 0,
  //             correctRotation: tile.rot,
  //             success: 0 - tile.rot == 0 ? true : false,
  //           } as TileExtended;
  //           console.log(extendedTile)

  //           return extendedTile;
  //         });
  //       }),
  //       tap((tiles) => console.log(tiles))
  //     );
  //   }
}
