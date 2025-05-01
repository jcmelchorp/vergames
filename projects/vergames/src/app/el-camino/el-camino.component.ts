import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  contentChild,
  ElementRef,
  inject,
  Input,
  numberAttribute,
  OnInit,
  TemplateRef,
  viewChild,
  ViewChild,
  ViewChildren,
  viewChildren,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import {
  MatGridList,
  MatGridListModule,
  MatGridTile,
} from '@angular/material/grid-list';
import { NgElement, WithProperties } from '@angular/elements';
import { NTileComponent } from './n-tile.component';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

declare global {
  interface HTMLElementTagNameMap {
    'n-tile': NgElement & WithProperties<{ image: string }>;
  }
}

const rotateTransformation = [
  style({ transform: 'rotate(0)' }),
  animate('1s', style({ transform: 'rotate(90deg)' })),
];
@Component({
  selector: 'app-el-camino',
  imports: [NgStyle, NgFor, MatGridListModule],
  template: `
    <!-- <ng-container mat-grid-list  #level01 class="mat-grid-list" cols="{{ level }}" rowHeight="1:1"></ng-container> -->
    <div style="display: flex; justify-content: center; ">
      <mat-grid-list style="width: 50%; height:auto;" cols="3">
        <ng-container #container *ngFor="let tile of tiles">
          <mat-grid-tile
            class="matGridTile"
            (click)="rotate(tile)"
            [@rotateState]="tile.currentRotation.toString()"
            [ngStyle]="{
              filter: 'invert(100%)',
              background: 'center / cover no-repeat url(' + tile.image + ')',
              border:tile.success?'1px solid darkgreen':'none'
            }"
          >
            <div><span></span></div>
          </mat-grid-tile>
        </ng-container>
      </mat-grid-list>
    </div>

    <button (click)="createElements()">Create Elements</button>
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
})
export class ElCaminoComponent implements OnInit {
  @Input({ alias: 'levelNum', transform: numberAttribute, required: true })
  level: number = 3;
  vch = contentChild('container', { read: ViewContainerRef });
  gridList = viewChild('gridList', { read: MatGridList });
  #componentRef?: ComponentRef<MatGridTile>;
  constructor() {}
  ngOnInit(): void {}
  tiles: {
    index: number;
    type: string;
    image: string;
    currentRotation: number;
    correctRotation: number;
    success: boolean;
  }[] = [
    {
      type: 'c',
      image: '/el-camino/curve.png',
      index: 1,
      currentRotation: 0,
      correctRotation: 90,
      success: false,
    },
    {
      type: 's',
      image: '/el-camino/straight.png',
      index: 2,
      currentRotation: 0,
      correctRotation: 90,
      success: false,
    },
    {
      type: 'c',
      image: '/el-camino/curve.png',
      index: 3,
      currentRotation: 0,
      correctRotation: 180,
      success: false,
    },
    {
      type: 'c',
      image: '/el-camino/curve.png',
      index: 4,
      currentRotation: 270,
      correctRotation: 0,
      success: false,
    },
    {
      type: 'e',
      image: '/el-camino/end.png',
      index: 5,
      currentRotation: 0,
      correctRotation: 90,
      success: false,
    },
    {
      type: 's',
      image: '/el-camino/straight.png',
      index: 6,
      currentRotation: 90,
      correctRotation: 0,
      success: false,
    },
    {
      type: 'b',
      image: '/el-camino/blank.png',
      index: 7,
      currentRotation: 180,
      correctRotation: 0,
      success: false,
    },
    {
      type: 'b',
      image: '/el-camino/blank.png',
      index: 8,
      currentRotation: 90,
      correctRotation: 0,
      success: false,
    },
    {
      type: 'e',
      image: '/el-camino/end.png',
      index: 9,
      currentRotation: 0,
      correctRotation: 180,
      success: false,
    },
  ];

  createElements() {
    this.vch()?.clear;
    // for (let i = 1; i <= this.level * this.level; i++) {
    let image = '/el-camino/curve.png';
    this.#componentRef = this.vch()?.createComponent(MatGridTile);
    this.#componentRef?.instance._setStyle('background', `url(${image})`);
    // }
  }
  rotate(tile: any) {
    console.log(this.tiles[tile.index - 1].currentRotation);
    if (
      this.tiles[tile.index - 1].currentRotation ==
      this.tiles[tile.index - 1].correctRotation
    ) {
      this.tiles[tile.index - 1].success = true;
      console.log(`index ${this.tiles[tile.index - 1].index} success`);
    } else {
      this.tiles[tile.index - 1].success = false;
    }

    this.tiles[tile.index - 1].currentRotation =
      (tile.currentRotation + 90) % 360;
    // console.log(this.tiles.map(t=>{return {t.indext.currentRotation}}))
    // tile.currentRotation = (tile.currentRotation + 90) % 360;
  }
  // get rotationState(): string {
  //     return this.currentRotation.toString();
  // }
}
