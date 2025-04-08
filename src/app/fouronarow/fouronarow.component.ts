import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fouronarow',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './fouronarow.component.html',
  styleUrls: ['./fouronarow.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FouronarowComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
