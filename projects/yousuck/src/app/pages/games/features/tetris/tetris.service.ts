import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  collapsedRowsToScore,
  GLASS_DIMENSIONS,
  NEXT_DIMENSIONS,
  speedToInterval,
} from './tetris-helpers/defs';
import {
  collapseFilledRows,
  filledRowsCount,
  getCleanBoard,
  getRandomFigure,
  getWidth,
  isValid,
  renderFigure,
} from './tetris-helpers/helpers';
import { Figure } from './tetris-helpers/figure.model';
import { Timer } from './tetris-helpers/timer';

@Injectable({
  providedIn: 'root',
})
export class TetrisService implements OnDestroy {
  private glassBoard: string[][] = [];
  private nextBoard: string[][] = [];

  private nextFigure: Figure | null = null;
  private figure: Figure | null = null;

  // todo: add FigureState model
  private figureRow = 0;
  private figureCol = 0;
  private figureRotation = 0;

  glassChanged = new Subject<string[][]>();
  nextChanged = new Subject<string[][]>();

  private accelerate = false;
  private timer?: Timer;
  timer$: Subject<Timer> = new Subject<Timer>();

  score = 0;
  speed = 1;
  timeElapsed = 0;

  isOver = false;
  isOver$: Subject<boolean> = new Subject<boolean>();
  isStart$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.setNextFigure(getRandomFigure());
    this.setFigure(getRandomFigure());
  }

  ngOnDestroy() {
    if (this.timer) {
      this.timer.stop();
    }
  }

  private setNextFigure(figure: Figure): void {
    this.nextFigure = figure;
    this.nextChanged.next(this.renderNext());
  }

  private setFigure(figure: Figure | null): void {
    const col = figure
      ? Math.floor((getWidth(this.glassBoard) - getWidth(figure.shape)) / 2)
      : Math.floor(getWidth(this.glassBoard)) / 2;
    if (!isValid(this.glassBoard, figure, 0, col, 0)) {
      this.stopGame();
      this.isOver = true;
      this.isOver$.next(this.isOver);
      this.isStart$.next(false);
    } else {
      this.figure = figure;
      this.figureCol = col;
      this.figureRow = 0;
      this.figureRotation = 0;
      this.glassChanged.next(this.renderGlass());
    }
  }

  init(): void {
    // glass
    this.glassBoard = getCleanBoard(
      GLASS_DIMENSIONS.width,
      GLASS_DIMENSIONS.height
    );

    // next
    this.nextBoard = getCleanBoard(
      NEXT_DIMENSIONS.width,
      NEXT_DIMENSIONS.height
    );

    this.setNextFigure(getRandomFigure());
    this.setFigure(getRandomFigure());

    this.score = 0;
    this.speed = 1;
    this.isOver = false;
    this.isOver$.next(this.isOver);
    this.isStart$.next(true);
    if (this.timer) {
      this.timer.stop();
    }

    this.timer = new Timer(10);
    this.timer.start();
    this.timer.update.subscribe((timeElapsed) => {
      this.timeElapsed = timeElapsed;
      if (
        timeElapsed % (this.accelerate ? 10 : speedToInterval[this.speed]) ===
        0
      ) {
        this.step();
      }
      if (timeElapsed % 200000 === 0) {
        // each 200 sec speed is increased
        this.speed++;
      }
    });
  }

  step(): void {
    if (
      isValid(
        this.glassBoard,
        this.figure,
        this.figureRow + 1,
        this.figureCol,
        this.figureRotation
      )
    ) {
      this.figureRow++;
      this.glassChanged.next(this.renderGlass());
    } else {
      this.glassBoard = renderFigure(
        this.glassBoard,
        this.figure,
        this.figureRow,
        this.figureCol,
        this.figureRotation
      );

      const collapsedRowsCount = filledRowsCount(this.glassBoard);
      if (collapsedRowsCount) {
        this.glassBoard = collapseFilledRows(this.glassBoard);
        this.score = this.score + collapsedRowsToScore[collapsedRowsCount];
      }

      this.setFigure(this.nextFigure);
      this.setNextFigure(getRandomFigure());

      this.accelerate = false;
      this.glassChanged.next(this.renderGlass());
      this.nextChanged.next(this.renderNext());
    }
  }

  moveLeft(): boolean {
    const valid = isValid(
      this.glassBoard,
      this.figure,
      this.figureRow,
      this.figureCol - 1,
      this.figureRotation
    );

    if (valid) {
      this.figureCol--;
      this.glassChanged.next(this.renderGlass());
    }

    this.accelerate = false;
    return valid;
  }

  moveRight(): boolean {
    const valid = isValid(
      this.glassBoard,
      this.figure,
      this.figureRow,
      this.figureCol + 1,
      this.figureRotation
    );

    if (valid) {
      this.figureCol++;
      this.glassChanged.next(this.renderGlass());
    }

    this.accelerate = false;
    return valid;
  }

  rotate(): boolean {
    const nextRotation = (this.figureRotation + 1) % 4;
    const valid = this.figure
      ? isValid(
          this.glassBoard,
          this.figure,
          this.figureRow,
          this.figureCol,
          nextRotation
        )
      : true;

    if (valid) {
      this.figureRotation = nextRotation;
      this.glassChanged.next(this.renderGlass());
    }

    this.accelerate = false;
    return valid;
  }

  toggleAccelerate(): void {
    this.accelerate = !this.accelerate;
  }

  togglePause(): void {
    if (this.timer) {
      this.timer.pause();
    }
  }

  stopGame(): void {
    if (this.timer) {
      this.timer.stop();
      this.timer = undefined;
      this.isStart$.next(false);
    }
  }

  isPaused(): boolean {
    return this.timer ? this.timer.isPaused() : false;
  }

  renderNext(): string[][] {
    return this.nextFigure
      ? renderFigure(this.nextBoard, this.nextFigure)
      : this.nextBoard;
  }

  renderGlass(): string[][] {
    return this.figure
      ? renderFigure(
          this.glassBoard,
          this.figure,
          this.figureRow,
          this.figureCol,
          this.figureRotation
        )
      : this.glassBoard;
  }
}
