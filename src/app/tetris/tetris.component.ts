import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TetrisGlassComponent } from './tetris-glass/tetris-glass.component';
import { TetrisNextComponent } from './tetris-next/tetris-next.component';
import { TetrisStatusComponent } from './tetris-status/tetris-status.component';
import { TetrisService } from './tetris.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle, NgSwitch } from '@angular/common';

@Component({
  selector: 'app-tetris',
  imports: [
    NgStyle,
    MatButtonModule,
    TetrisGlassComponent,
    TetrisNextComponent,
    TetrisStatusComponent,
  ],
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisComponent implements AfterViewInit {
  private tetrisService: TetrisService = inject(TetrisService);
  // constructor(private tetrisService: TetrisService) {}
  disableButton: boolean = false;
  ngAfterViewInit() {
    this.startGame();
  }

  startGame(): void {
    this.tetrisService.init();
  }
}
