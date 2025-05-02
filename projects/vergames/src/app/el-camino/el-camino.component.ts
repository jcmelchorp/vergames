import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ElCaminoService } from './el-camino.service';
import { LevelTiles, TileExtended, TileType } from './el-camino.model';
import { map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-el-camino',
  imports: [CommonModule, MatGridListModule, MatProgressSpinnerModule],
  template: `
    <!-- <ng-container mat-grid-list  #level01 class="mat-grid-list" cols="{{ level }}" rowHeight="1:1"></ng-container> -->
    <!-- <div *ngIf="levels() as levels;"  > -->
    <button (click)="nextLevel()">Next Level</button>

    <div
      *ngIf="level$ | async as level"
      style="display: flex; flex-direction: column; justify-content: center; align-items: center; "
    >
      <h2>Level: {{ level.level }}</h2>
<h1 *ngIf="isLevelDone$|async" style="color:darkgreen"></h1>
      <mat-grid-list
        class="mat-grid-list"
        style="width: 50%; height:auto;"
        cols="{{ level.cols }}"
      >
        <ng-container #container *ngFor="let tile of level.blocks; index as i">
          <mat-grid-tile
            class="mat-grid-tile"
            (click)="rotate(level, tile)"
            [@rotateState]="tile.currentRotation"
            [ngStyle]="{
              filter: 'invert(100%)',
              background: 'center / cover no-repeat url(' + tile.image + ')',
              border: tile.success ? '2px dashed #550055' : 'none',
            }"
          >
            <div><span></span></div>
          </mat-grid-tile>
        </ng-container>
      </mat-grid-list>
    </div>
    <!-- </div> -->
  `,
  styleUrl: './el-camino.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rotateState', [
      state('0', style({ transform: 'rotate(0deg)' })),
      state('90', style({ transform: 'rotate(90deg)' })),
      state('180', style({ transform: 'rotate(180deg)' })),
      state('270', style({ transform: 'rotate(270deg)' })),
      transition('* => *', animate('200ms ease-in-out')),
    ]),
  ],
  providers: [ElCaminoService],
})
export class ElCaminoComponent implements OnInit {
  levelCount: number = 1;
  currentLevel: Subject<number> = new Subject();
  currentLevel$ = this.currentLevel.asObservable();
  _elCaminoService = inject(ElCaminoService);
  levels? = this._elCaminoService.levels();
  level: Subject<LevelTiles> = new Subject();
  level$ = this.level.asObservable();
  disableButton: boolean = false;
  isLevelDone: Subject<boolean> = new Subject();
  isLevelDone$ = this.isLevelDone.asObservable();
  subscription!: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.level$ = this.currentLevel$.pipe(
      map((num: number) => this.levels![num - 1]),
      tap((level) => {this.level.next(level)}),
    );
   
  }

  nextLevel() {
    this.isLevelDone.next(false); 
    this.currentLevel.next(this.levelCount++);
  }

  rotate(level:LevelTiles, tile: TileExtended) {
    switch (tile.type) {
      case TileType.S:
        tile.currentRotation = (tile.currentRotation! + 90) % 180;
        break;
      case TileType.B:
        tile.currentRotation = 0;
        tile.success = true;
        break;
      default:
        tile.currentRotation = (tile.currentRotation! + 90) % 360;
        break;
    }

    // console.log(tile.currentRotation);
    if (tile.currentRotation === tile.correctRotation) {
      tile.success = true;
      // console.log(`Tile No. ${tile.index} success`);
    } else {
      tile.success = false;
    }

   let blocks = level.blocks.map((block) => {
      if (block.index === tile.index) {
        return tile;
      } else {
        return block;
      }
    });

   
    this.level.next({
      id: level.id,
      level: level.level,
      blocks: blocks,
    } as LevelTiles);
    
    this.isLevelDone$ = this.level.pipe(
      map((level) => {
        return !level.blocks
          .map((block) => {
            return block.success;
          })
          .includes(false);
      }),
      tap((stop) => {
        if (stop) {
          // console.log('Done')
          setTimeout(() => {
            this.currentLevel.next(this.levelCount++);
            this.isLevelDone.next(true)
                    }, 2000);
          
        } else {
          // console.log('Not yet')
          this.isLevelDone.next(false)
        }
        }
    ));
  }
}
