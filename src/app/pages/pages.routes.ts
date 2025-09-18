import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./pages").then(c => c.Pages),
        children: [
            {
                path: 'home',
                loadComponent: () => import("./home/home").then(c => c.Home),
            },
            {
                path: 'fund-management/subscription',
                loadComponent: () => import("./subscription/subscription").then(c => c.Subscription),
            },
            {
                path: 'fund-management/cancellation',
                loadComponent: () => import("./cancellation/cancellation").then(c => c.Cancellation),
            },
            {
                path: 'transaction-history',
                loadComponent: () => import("./transaction-history/transaction-history").then(c => c.TransactionHistory),
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
