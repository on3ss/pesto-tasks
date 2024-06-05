import React, { useState, useEffect } from 'react';
import TaskListItem from './TaskListItem';

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

interface ApiResponse {
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

const TaskList: React.FC = () => {
    const [data, setData] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const baseUrl = import.meta.env.VITE_API_URL
            try {
                const response = await fetch(`${baseUrl}/task?page=${currentPage}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Something went wrong! Could not fetch task');
                }

                const jsonData: ApiResponse = await response.json();
                const tasks = jsonData.data;

                if (tasks.length > 0) {
                    setData(tasks);
                }

                setLastPage(jsonData.meta.last_page);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    if (loading) {
        return <LoadingListItem />;
    }

    if (error) {
        return <ErrorListItem error={error} />;
    }

    // Calculate the range of page numbers to display
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(lastPage, startPage + 6);

    return (
        <>
            <ul>
                {data.map((task) => (
                    <TaskListItem key={task.id} task={task} />
                ))}
            </ul>
            <div className="flex justify-center join">
                {[...Array(endPage - startPage + 1)].map((_, index) => {
                    const page = startPage + index;
                    return (
                        <button
                            key={page}
                            className={`join-item btn ${page === currentPage ? 'btn-primary' : ''}`}
                            onClick={() => goToPage(page)}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </>
    );
};

function ErrorListItem({ error }: { error: string | null }) {
    return (
        <div className="flex justify-center gap-2 border-t-[1px] border-base-100 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{error}</span>
        </div>
    );
}

function LoadingListItem() {
    return (
        <div className="flex justify-center gap-2 border-t-[1px] border-base-100 py-4">
            <span className="loading loading-dots loading-md"></span>
        </div>
    );
}

export default TaskList;
