import { Routes } from '@angular/router';
import { authGuard } from '@/features/auth/services/auth.guard';

export const PROJECTS_ROUTES: Routes = [
    {
        path: 'projects',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./project-list/project-list.component').then(m => m.ProjectListComponent)
            },
            {
                path: 'new',
                loadComponent: () => import('./project-form/project-form.component').then(m => m.ProjectFormComponent)
            },
            {
                path: ':id/edit',
                loadComponent: () => import('./project-form/project-form.component').then(m => m.ProjectFormComponent)
            }

        ]
    }
];
