import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TictactoeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
