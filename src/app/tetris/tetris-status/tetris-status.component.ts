import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TetrisService } from '../tetris.service';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { interval, map, Observable, Subject } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tetris-status',
  imports: [AsyncPipe, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './tetris-status.component.html',
  styleUrls: ['./tetris-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisStatusComponent implements OnInit {
  tetrisService: TetrisService = inject(TetrisService);
  isOver$ = this.tetrisService.isOver$;
  isStart$ = this.tetrisService.isStart$;
  paused: boolean = false;
  seconds: Observable<number> = interval(1000);
  timeElapsed$: Subject<number> = new Subject<number>();
  // constructor(private tetrisService: TetrisService) {}
  ngOnInit(): void {
    this.seconds
      .pipe(map(() => Math.ceil(this.tetrisService.timeElapsed / 1000)))
      .subscribe((time) => {
        this.timeElapsed$.next(time);
      });
  }

  getScore(): number {
    return this.tetrisService.score;
  }

  getTimeElapsed(): void {
    this.timeElapsed$.next(Math.ceil(this.tetrisService.timeElapsed / 1000));
  }

  getSpeed(): number {
    return this.tetrisService.speed;
  }

  togglePause(): void {
    this.tetrisService.togglePause();
  }

  reset(): void {
    this.tetrisService.init();
  }

  isPaused(): boolean {
    return this.tetrisService.isPaused();
  }

  // isOver(): boolean {
  //   return this.tetrisService.isOver$;
  // }
}
