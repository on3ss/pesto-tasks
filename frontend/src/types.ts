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

export type Status = {
    id: number;
    name: string;
    theme_color: 'warning' | 'info' | 'success';
}

export type StatusApiResponse = {
    data: Status[];
}

export type StatusContextType = {
    statuses: Status[] | null;
    statusesLoading: boolean;
}

export type TaskContextType = {
    tasks: Task[] | null;
    tasksLoading: boolean;
    queryParams: QueryParams;
    updateQueryParams: (newQueryParams: QueryParams) => void;
    isError: boolean,
    currentPage: number
    startPage: number
    lastPage: number
    endPage: number,
    goToPage: (page: number) => void
}

export type QueryParams = { [key: string]: any };