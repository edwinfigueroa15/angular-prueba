// -------------------------------- TABLE COMPONENT
export interface TableInterface {
    data: any[];
    structure: StructureTable[];
    options: OptionsTable;
}

export interface StructureTable {
    label: string;
    key: string;
    sort?: boolean;
    capitalize?: boolean;
    formatMoney?: boolean;
    formatDate?: boolean;
}

export interface OptionsTable {
    dataKey?: string;
    styleClass?: string;
    wrapCells?: boolean;
    search?: {
        currentSearch: string;
    }
    paginator?: { 
        show: boolean,
        rows?: number,
        perPage?: number[],
    };
    actions?: {
        show: boolean;
        actionsList?: ActionsTable[];
    };
}

export type ActionsTable = {
    key: string;
    icon: string;
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
    loading?: boolean;
    disabled?: boolean;
}