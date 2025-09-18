import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./auth").then(c => c.Auth),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
