import { Routes } from '@angular/router';
import { PermissionsGuard } from '@app/core/guards/permissions.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./pages").then(c => c.Pages),
        children: [
            {
                path: 'home',
                loadComponent: () => import("./home/home").then(c => c.Home),
                canActivate: [PermissionsGuard],
            },
            {
                path: 'fund-management/subscription',
                loadComponent: () => import("./subscription/subscription").then(c => c.Subscription),
                canActivate: [PermissionsGuard],
            },
            {
                path: 'fund-management/cancellation',
                loadComponent: () => import("./cancellation/cancellation").then(c => c.Cancellation),
                canActivate: [PermissionsGuard],
            },
            {
                path: 'transaction-history',
                loadComponent: () => import("./transaction-history/transaction-history").then(c => c.TransactionHistory),
                canActivate: [PermissionsGuard],
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
