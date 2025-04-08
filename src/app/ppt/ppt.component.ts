import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ppt',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PptComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
