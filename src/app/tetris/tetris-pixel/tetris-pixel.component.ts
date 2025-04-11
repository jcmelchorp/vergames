import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { COLORS } from '../tetris-helpers/defs';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-tetris-pixel',
  templateUrl: './tetris-pixel.component.html',
  styleUrls: ['./tetris-pixel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisPixelComponent implements OnInit {
  @Input() value = ' ';

  constructor() {}

  ngOnInit(): void {}

  color() {
    return COLORS[this.value] || 'red';
  }
}
