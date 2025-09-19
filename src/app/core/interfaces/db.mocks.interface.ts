export interface User {
    id: number;
    username: string;
    password?: string;
    roleId: number;
    role: Role | null;
    name: string;
    email: string;
    phone: string;
    notifications: 'email' | 'sms';
    balance: number;
    portfolio: PortfolioItem[];
}

export interface PortfolioItem {
    fundId: number;
    amount: number;
    subscriptionDate: string;
}

export interface Role {
    id: number;
    name: "admin" | "consultant";
    permissions: string[];
}

export interface Fund {
    id: number;
    name: string;
    minimum: number;
    category: "FPV" | "FIC";
}

export interface Transaction {
    id: string;
    userId: number;
    type: "opening" | "cancellation";
    fundId: number;
    amount: number;
    date: string;
}