import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../services/layout.service';

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
  private layoutService: LayoutService = inject(LayoutService);
  isHandset$ = this.layoutService.isHandset$;
  // cols = this.layoutService.isHandset$.pipe(
  //   map((isHandset) => {
  //     if (isHandset) {
  //       return 1;
  //     }
  //     return 3;
  //   })
  // );
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.isHandset$.pipe(
    map((isHandset) => {
      if (isHandset) {
        return [
          {
            imageUrl: 'quiz.png',
            route: 'quiz',
            title: 'Quiz',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'snake.png',
            route: 'snake',
            title: 'Snake',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'tetris.png',
            route: 'tetris',
            title: 'Tetris',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'abrecaminos.png',
            route: 'abrecaminos',
            title: 'Abrecaminos',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'piedra-papel-tijera.png',
            route: 'ppt',
            title: 'Piedra, papel o tijeras',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'cuatro-en-linea.png',
            route: 'fouronarow',
            title: '4 en línea',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'stack.png',
            route: 'stack',
            title: 'Apilador',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'tic-tac-toe.png',
            route: 'tictactoe',
            title: 'Juego del Gato',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'target.png',
            route: 'target',
            title: 'Tiro al blanco',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'ahorcado.png',
            route: 'ahorcado',
            title: 'Ahorcado (English)',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'buscaminas.png',
            route: 'mine',
            title: 'Buscaminas',
            cols: 1,
            rows: 1,
          },
          {
            imageUrl: 'catch-the-cat.png',
            route: 'catch-the-cat',
            title: 'Atrapando al gato',
            cols: 1,
            rows: 1,
          },
        ];
      }
      return [
        {
          imageUrl: 'quiz.png',
          route: 'quiz',
          title: 'Quiz',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'snake.png',
          route: 'snake',
          title: 'Snake',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'tetris.png',
          route: 'tetris',
          title: 'Tetris',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'abrecaminos.png',
          route: 'abrecaminos',
          title: 'Abrecaminos',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'piedra-papel-tijera.png',
          route: 'ppt',
          title: 'Piedra, papel o tijeras',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'cuatro-en-linea.png',
          route: 'fouronarow',
          title: '4 en línea',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'stack.png',
          route: 'stack',
          title: 'Apilador',
          cols: 1,
          rows: 2,
        },
        {
          imageUrl: 'tic-tac-toe.png',
          route: 'tictactoe',
          title: 'Juego del Gato',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'target.png',
          route: 'target',
          title: 'Tiro al blanco',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'ahorcado.png',
          route: 'ahorcado',
          title: 'Ahorcado (English)',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'buscaminas.png',
          route: 'mine',
          title: 'Buscaminas',
          cols: 1,
          rows: 1,
        },
        {
          imageUrl: 'catch-the-cat.png',
          route: 'catch-the-cat',
          title: 'Atrapando al gato',
          cols: 1,
          rows: 1,
        },
      ];
    })
  );
}
