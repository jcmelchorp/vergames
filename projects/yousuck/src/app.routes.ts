import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { publicGuard } from './app/auth/guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: Landing, canActivate: [publicGuard] },
  {
    path: 'u',
    component: AppLayout,
    children: [
      { path: '', component: Dashboard, pathMatch: 'prefix' },
      {
        path: 'uikit',
        loadChildren: () => import('./app/pages/uikit/uikit.routes'),
      },
      { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    ],
  },
  { path: 'notfound', component: Notfound },
  {
    path: 'a',
    loadChildren: () => import('./app/auth/auth.routes'),
  },
  { path: '**', redirectTo: '/notfound' },
];
