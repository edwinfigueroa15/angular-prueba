import { Routes } from '@angular/router';
import { NoAuthGuard } from '@app/core/guards/no-auth.guard';
import { AuthGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(r => r.routes),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.routes').then(r => r.routes),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
];
