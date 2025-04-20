import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Games } from './games/games.component';
import HomeGamesComponent from './games/home/home-games.component';
import FavoritesComponent from './games/favorites/favorites.component';
import { Profile } from './profile/profile';
import { preventUnsavedChanges } from './dialogs/prevent-unsaved-changes';
import { AvatarComponent } from './avatar/avatar';
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
        loadComponent: () => import('./games/home/home-games.component'),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./games/favorites/favorites.component'),
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
