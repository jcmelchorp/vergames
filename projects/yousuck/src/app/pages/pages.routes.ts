import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Games } from './games/games.component';
import HomeGamesComponent from './games/components/game-list.component';
import FavoritesComponent from './games/components/favorites.component';
import { Profile } from './profile/profile';
import { preventUnsavedChanges } from './dialogs/prevent-unsaved-changes';
import { AvatarComponent } from './avatar/avatar';
import { MazeComponent } from './games/features/maze/maze.component';
import { GameBoardComponent } from './games/features/snake/game-board/game-board.component';
import { FouronarowComponent } from './games/features/fouronarow/fouronarow.component';
import { TetrisComponent } from './games/features/tetris/tetris.component';
import { PptComponent } from './games/features/ppt/ppt.component';
import { TictactoeComponent } from './games/features/tictactoe/tictactoe.component';
import { CatchTheCatComponent } from './games/features/catch-the-cat/catch-the-cat.component';
import { AhorcadoComponent } from './games/features/ahorcado/ahorcado.component';
import { BuscaminasComponent } from './games/features/buscaminas/buscaminas.component';
import { TargetComponent } from './games/features/target/target.component';
export default [
  { path: 'profile', component: Profile },
  { path: 'documentation', component: Documentation },
  { path: 'crud', component: Crud },
  { path: 'empty', component: Empty },
  { path: 'avatar', component: AvatarComponent },
  {
    path: 'games',
    // canDeactivate: [preventUnsavedChanges],
    component: Games,
    children: [
      {
        path: '',
        loadComponent: () => import('./games/components/game-list.component'),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./games/components/favorites.component'),
      },
      {
        path: 'maze',
        component: MazeComponent,
        // loadComponent: () => import('./games/features/maze/maze.component'),
      },
      {
        path: 'snake',
        component: GameBoardComponent,
      },
      {
        path: 'tetris',
        component: TetrisComponent,
      },
      {
        path: '4-in-a-row',
        component: FouronarowComponent,
      },
      {
        path: 'ppt',
        component: PptComponent,
      },
      {
        path: 'tic-tac-toe',
        component: TictactoeComponent,
      },
      {
        path: 'catch-the-cat',
        component: CatchTheCatComponent,
      },
      {
        path: 'shark-bait',
        component: AhorcadoComponent,
      },
      {
        path: 'minesweeper',
        component: BuscaminasComponent,
      },
      {
        path: 'target',
        component: TargetComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
