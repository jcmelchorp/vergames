import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameBoardComponent } from './snake/game-board/game-board.component';
import { QuizComponent } from './quiz/quiz.component';
export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'tictactoe',
        loadComponent: () =>
          import('./tictactoe/tictactoe.component').then(
            (m) => m.TictactoeComponent
          ),
      },
      {
        path: 'fouronarow',
        loadComponent: () =>
          import('./fouronarow/fouronarow.component').then(
            (m) => m.FouronarowComponent
          ),
      },
      {
        path: 'ppt',
        loadComponent: () =>
          import('./ppt/ppt.component').then((m) => m.PptComponent),
      },
      {
        path: 'target',
        loadComponent: () =>
          import('./target/target.component').then((m) => m.TargetComponent),
      },
      {
        path: 'stack',
        loadComponent: () =>
          import('./stack/stack.component').then((m) => m.StackComponent),
      },
      {
        path: 'ahorcado',
        loadComponent: () =>
          import('./ahorcado/ahorcado.component').then(
            (m) => m.AhorcadoComponent
          ),
      },
      {
        path: 'mine',
        loadComponent: () =>
          import('./buscaminas/buscaminas.component').then(
            (m) => m.BuscaminasComponent
          ),
      },
      {
        path: 'abrecaminos',
        loadComponent: () =>
          import('./abrecaminos/abrecaminos.component').then(
            (m) => m.AbrecaminosComponent
          ),
      },
      {
        path: 'catch-the-cat',
        loadComponent: () =>
          import('./catch-the-cat/catch-the-cat.component').then(
            (m) => m.CatchTheCatComponent
          ),
      },
      {
        path: 'tetris',
        loadComponent: () =>
          import('./tetris/tetris.component').then((m) => m.TetrisComponent),
      },
      {
        path: 'snake',
        component: GameBoardComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
    ],
  },
];
