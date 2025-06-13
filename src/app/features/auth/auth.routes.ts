import { Routes } from '@angular/router';
import { alreadyAuthGuard } from '@/features/auth/services/auth-already.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'register',
    canActivate: [alreadyAuthGuard],
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    canActivate: [alreadyAuthGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];
