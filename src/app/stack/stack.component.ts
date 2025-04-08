import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StackComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
