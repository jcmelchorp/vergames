import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [],
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TictactoeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
