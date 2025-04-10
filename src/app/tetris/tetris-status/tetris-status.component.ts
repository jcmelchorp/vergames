import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TetrisService } from '../tetris.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tetris-status',
  imports: [MatButtonModule],
  templateUrl: './tetris-status.component.html',
  styleUrls: ['./tetris-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisStatusComponent implements OnInit {
  tetrisService: TetrisService = inject(TetrisService);
  // constructor(private tetrisService: TetrisService) {}
  ngOnInit(): void {}

  getScore(): number {
    return this.tetrisService.score;
  }

  getTimeElapsed(): number {
    return Math.ceil(this.tetrisService.timeElapsed / 1000);
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

  isOver(): boolean {
    return this.tetrisService.isOver;
  }
}
