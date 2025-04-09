import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-catch-the-cat',
  standalone: true,
  imports: [],
  templateUrl: './catch-the-cat.component.html',
  styleUrls: ['./catch-the-cat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatchTheCatComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
