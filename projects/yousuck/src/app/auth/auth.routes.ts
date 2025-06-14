import { Routes } from '@angular/router';
import { Access } from './components/access';
import { Login } from './components/login';
import { Error } from './components/error';
import { Register } from './components/register';
import { publicGuard } from './guards/auth.guard';
import { Verification } from './components/verification';
import { PasswordRecovery } from './components/password-recovery';

export default [
  { path: 'access', component: Access },
  { path: 'error', component: Error },
  { path: 'verification', component: Verification },
  { path: 'password-recovery', component: PasswordRecovery },
  { path: 'login', component: Login, canActivate: [publicGuard] },
  { path: 'register', component: Register, canActivate: [publicGuard] },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
