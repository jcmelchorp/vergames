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
import { map, Subject, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-el-camino',
  imports: [CommonModule, MatGridListModule, MatProgressSpinnerModule],
  template: `
    <!-- <ng-container mat-grid-list  #level01 class="mat-grid-list" cols="{{ level }}" rowHeight="1:1"></ng-container> -->
    <!-- <div *ngIf="levels() as levels;"  > -->
      <button (click)="nextLevel()">Next Level</button>

      <div *ngIf="level$ | async as level" style="display: flex; flex-direction: column; justify-content: center; align-items: center; ">
        <h2>Level: {{ level.level }}</h2>

        <mat-grid-list
          class="mat-grid-list"
          style="width: 50%; height:auto;"
          cols="{{level.cols}}"
        >
          <ng-container
            #container
            *ngFor="let tile of level.blocks; index as i"
          >
            <mat-grid-tile
              class="mat-grid-tile"
              (click)="rotate(level.level, tile)"
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
   </div>  <!-- </div> -->
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
  levelCount:number=1;
  currentLevel :Subject<number>= new Subject();
  currentLevel$ = this.currentLevel.asObservable();
  _elCaminoService = inject(ElCaminoService);
  levels = this._elCaminoService.levels();
  level: Subject<LevelTiles> = new Subject();
  level$ = this.level.asObservable();
disableButton:boolean=false;

  constructor() {
   
  }

  ngOnInit(): void {

   this.level$= this.currentLevel$.pipe(
      map((num:number)=> this.levels![num-1]  ),
      tap(level=>this.level.next(level))
    );
    
  }

  nextLevel() {
    this.currentLevel.next(this.levelCount++); 
  }

  rotate(levelNum: number, tile: TileExtended) {
    switch (tile.type) {
      case TileType.S:
        tile.currentRotation = (tile.currentRotation! + 90) % 180;
        break;
      case TileType.B:
        tile.currentRotation = 0;
        break;
      default:
        tile.currentRotation = (tile.currentRotation! + 90) % 360;
        break;
    }

    console.log(tile.currentRotation);
    if (tile.currentRotation === tile.correctRotation) {
      tile.success = true;
      console.log(`Tile No. ${tile.index} success`);
    } else {
      tile.success = false;
    }
    // var level = this.levels!.find((level) => level.level == levelNum);

    // this.level.next({
    //   id: level!.id,
    //   level: level!.level,
    //   blocks: level!.blocks,
    // });
  }
}
