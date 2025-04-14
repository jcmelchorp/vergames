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
import { AsyncPipe, NgStyle, NgSwitch } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [
    NgStyle,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TetrisGlassComponent,
    TetrisNextComponent,
    TetrisStatusComponent,
  ],
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisComponent /*implements AfterViewInit*/ {
  private tetrisService: TetrisService = inject(TetrisService);
  isStart$ = this.tetrisService.isStart$;

  // constructor(private tetrisService: TetrisService) {}
  disableButton: boolean = false;
  // ngAfterViewInit() {
  //   this.startGame();
  // }

  startGame(): void {
    this.tetrisService.init();
  }
}
