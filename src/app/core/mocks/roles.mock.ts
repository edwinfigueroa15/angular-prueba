import { Role } from "@app/core/interfaces/db.mocks.interface";

export const ROLES: Role[] = [
    {
        id: 1,
        name: "admin",
        permissions: [
            '/pages/home',
            '/pages/fund-management',
            '/pages/fund-management/subscription',
            '/pages/fund-management/cancellation',
            '/pages/transaction-history'
        ]
    },
    {
        id: 2,
        name: "consultant",
        permissions: [
            '/pages/home',
            '/pages/transaction-history'
        ]
    }
];
