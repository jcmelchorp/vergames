import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { TetrisService } from '../tetris.service';
import { TetrisBoardComponent } from '../tetris-board/tetris-board.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tetris-next',
  imports: [AsyncPipe, TetrisBoardComponent],
  templateUrl: './tetris-next.component.html',
  styleUrls: ['./tetris-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisNextComponent implements OnInit /*, OnDestroy*/ {
  board!: string[][];
  board$!: Observable<string[][]>;
  // private subscription?: Subscription;

  private tetrisService: TetrisService = inject(TetrisService);
  // constructor(private tetrisService: TetrisService) {}

  ngOnInit(): void {
    this.board = this.tetrisService.renderNext();
    this.board$ = this.tetrisService.nextChanged;
  }

  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
