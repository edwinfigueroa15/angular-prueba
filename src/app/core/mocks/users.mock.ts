import { User } from "@app/core/interfaces/db.mocks.interface";

export const USERS: User[] = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        roleId: 1,
        name: "Carlos Pérez",
        email: "carlos@btg.com",
        phone: "3001112233",
        balance: 500000,
        portfolio: [
            {
                fundId: 3,
                amount: 50000,
                subscriptionDate: "2025-09-01T10:00:00"
            }
        ]
    },
    {
        id: 2,
        username: "consultor",
        password: "consultor123",
        roleId: 2,
        name: "Ana Torres",
        email: "ana@btg.com",
        phone: "3104445566",
        balance: 500000,
        portfolio: []
    }
];
