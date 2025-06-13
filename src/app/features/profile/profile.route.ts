
import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
  path: 'profile',
  loadComponent: () => import('../profile/profile/profile.component').then(m => m.ProfileComponent)
}
];
