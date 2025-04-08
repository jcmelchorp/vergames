import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FouronarowComponent } from './fouronarow/fouronarow.component';
import { PptComponent } from './ppt/ppt.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'tictactoe', component: TictactoeComponent },
      { path: 'fouronarow', component: FouronarowComponent },
      { path: 'ppt', component: PptComponent },
    ],
  },
];
