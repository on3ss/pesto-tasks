import { useState } from 'react';
import { useQuery } from 'react-query';
import TaskListItem from './TaskListItem';
import { TaskListApiResponse, Task } from '../types';
import { fetchTasks } from '../api/tasks';


const TaskList = ({ search }: { search: string }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, error, isLoading, isError } = useQuery<TaskListApiResponse, Error>(
        ['tasks', currentPage, search],
        () => fetchTasks(currentPage, search),
        { keepPreviousData: true }
    );

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (isLoading) {
        return <LoadingListItem />;
    }

    if (isError) {
        return <ErrorListItem error={error.message} />;
    }

    const tasks = data?.data ?? [];
    const lastPage = data?.meta?.last_page ?? 1;

    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(lastPage, startPage + 6);

    return (
        <>
            <ul>
                {tasks.map((task: Task) => (
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
