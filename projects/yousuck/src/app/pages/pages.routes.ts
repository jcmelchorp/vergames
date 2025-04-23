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
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
