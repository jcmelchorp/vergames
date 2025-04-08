import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            imageUrl: '/assets/images/tictactoe.png',
            route: 'tictactoe',
            title: 'Juego del Gato',
            cols: 1,
            rows: 1,
          },
          { imageUrl: '', route: '', title: '4 en línea', cols: 1, rows: 1 },
          { imageUrl: '', route: '', title: 'Fat ping-pong', cols: 1, rows: 1 },
          { imageUrl: '', route: '', title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        {
          imageUrl: '/assets/images/tictactoe.png',
          route: 'tictactoe',
          title: 'Juego del Gato',
          cols: 2,
          rows: 1,
        },
        { imageUrl: '', route: '', title: '4 en línea', cols: 1, rows: 1 },
        { imageUrl: '', route: '', title: 'Fat ping-pong', cols: 1, rows: 2 },
        { imageUrl: '', route: '', title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
}
