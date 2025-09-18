import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./auth").then(c => c.Auth),
        children: [
            {
                path: 'sign-in',
                loadComponent: () => import('./sign-in/sign-in').then(c => c.SignIn),
            },
            {
                path: 'password-change',
                loadComponent: () => import('./password-change/password-change').then(c => c.PasswordChange),
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: 'full'
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
