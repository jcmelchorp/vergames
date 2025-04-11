import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TetrisBoardComponent } from '../tetris-board/tetris-board.component';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';
import { TetrisService } from '../tetris.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tetris-glass',
  imports: [AsyncPipe, TetrisBoardComponent],
  templateUrl: './tetris-glass.component.html',
  styleUrls: ['./tetris-glass.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisGlassComponent implements OnInit /*, OnDestroy*/ {
  board: string[][] = [];
  board$: Subject<string[][]> = new Subject<string[][]>();
  private subscription?: Subscription;

  // private tetrisService: TetrisService = inject(TetrisService);
  constructor(private tetrisService: TetrisService) {}

  ngOnInit(): void {
    this.board$.next(this.tetrisService.renderGlass());
    this.subscription = this.tetrisService.glassChanged.subscribe((board) => {
      this.board$.next(board);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.tetrisService.rotate();
        break;
      case 'ArrowDown':
        this.tetrisService.step();
        break;
      case 'ArrowLeft':
        this.tetrisService.moveLeft();
        break;
      case 'ArrowRight':
        this.tetrisService.moveRight();
        break;
      case 'p':
        this.tetrisService.togglePause();
        break;
      case ' ':
        this.tetrisService.toggleAccelerate();
        break;
      case '=':
        this.tetrisService.speed++;
        break;
      case '-':
        this.tetrisService.speed--;
        break;
    }
  }
}
