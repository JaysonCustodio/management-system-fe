import { Routes } from '@angular/router';
import { AUTH_ROUTES } from '@/features/auth/auth.routes';
import { PROJECTS_ROUTES } from '@/features/projects/projects.route';
import { TASKS_ROUTES } from '@/features/tasks/tasks.routes';
import { PROFILE_ROUTES } from '@/features/profile/profile.route';


export const routes: Routes = [
  ...AUTH_ROUTES,
  ...PROJECTS_ROUTES,
  ...TASKS_ROUTES,
  ...PROFILE_ROUTES,
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

