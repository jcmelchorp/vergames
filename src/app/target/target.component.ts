import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TargetComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
