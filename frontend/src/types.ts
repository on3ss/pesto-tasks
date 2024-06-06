export type ModalProps = { modalId: string, children: React.ReactNode }

export type FormValues = {
    name: string;
    description?: string | null | undefined;
    status_id: number;
};

export type Task = {
    id: number;
    name: string;
    description: string | null;
    status: {
        id: number;
        name: string;
        theme_color: string;
    };
}

export type TaskListApiResponse = {
    data: Task[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

// Define types for the data
export type Status = {
    id: number;
    name: string;
    theme_color: 'warning' | 'info' | 'success';
}

export type StatusApiResponse = {
    data: Status[];
}

// Creating a context
export type StatusContextType = {
    statuses: Status[] | null;
    statusesLoading: boolean;
}