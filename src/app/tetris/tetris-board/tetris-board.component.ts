import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TetrisPixelComponent } from '../tetris-pixel/tetris-pixel.component';

@Component({
  selector: 'app-tetris-board',
  imports: [TetrisPixelComponent],
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisBoardComponent implements OnInit {
  @Input() board?: string[][];
  ngOnInit() {}
}
