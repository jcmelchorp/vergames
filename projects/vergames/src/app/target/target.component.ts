import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TargetComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
