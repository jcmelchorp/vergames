import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Games } from './games/games.component';
import HomeGamesComponent from './games/home/home-games.component';
import FavoritesComponent from './games/favorites/favorites.component';
import { Profile } from './profile/profile';
import { preventUnsavedChanges } from './dialogs/prevent-unsaved-changes';

export default [
  { path: 'profile', component: Profile },
  { path: 'documentation', component: Documentation },
  { path: 'crud', component: Crud },
  { path: 'empty', component: Empty },
  {
    path: 'games',
    canDeactivate: [preventUnsavedChanges],
    component: Games,
    children: [
      { path: '', component: HomeGamesComponent },
      { path: 'favorites', component: FavoritesComponent },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
