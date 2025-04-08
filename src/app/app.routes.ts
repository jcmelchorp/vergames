import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'tictactoe', component: TictactoeComponent },
    ],
  },
];
