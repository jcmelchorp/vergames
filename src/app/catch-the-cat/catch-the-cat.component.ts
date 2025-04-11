import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-catch-the-cat',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './catch-the-cat.component.html',
  styleUrls: ['./catch-the-cat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatchTheCatComponent implements OnInit {
  public blocked: boolean;
  constructor() {
    this.blocked = false;
  }

  ngOnInit() {}
}
