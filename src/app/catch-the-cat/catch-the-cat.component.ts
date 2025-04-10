import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catch-the-cat',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './catch-the-cat.component.html',
  styleUrls: ['./catch-the-cat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatchTheCatComponent implements OnInit, OnDestroy {
  public blocked: boolean;
  constructor() {
    this.blocked = false;
  }

  ngOnInit() {}
  private subscription?: Subscription;
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
