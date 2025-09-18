import { Transaction } from "@app/core/interfaces/db.mocks.interface";

export const TRANSACTIONS: Transaction[] = [
    {
        id: "tx-001",
        userId: 1,
        type: "opening",
        fundId: 3,
        amount: 50000,
        date: "2025-09-01T10:00:00"
    }
];
