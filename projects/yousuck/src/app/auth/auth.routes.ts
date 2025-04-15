import { Routes } from '@angular/router';
import { Access } from './components/access';
import { Login } from './components/login';
import { Error } from './components/error';
import { Register } from './components/register';

export default [
  { path: 'access', component: Access },
  { path: 'error', component: Error },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
