import { useTask } from "../contexts/TaskContext";
import TaskListItem from "./TaskListItem";
import { Task } from "../types";


const TaskList = () => {
    const { tasks, tasksLoading, isError, currentPage, startPage, endPage, goToPage } = useTask();

    if (tasksLoading) {
        return <LoadingListItem />;
    }

    if (isError) {
        return <ErrorListItem error="Something went wrong! Could not fetch your tasks" />;
    }

    if (!tasks || tasks.length === 0) {
        return <EmptyListMessage />;
    }

    // Render pagination buttons only if there is more than one page
    const showPagination = endPage !== startPage;

    return (
        <>
            <ul>
                {tasks?.map((task: Task) => (
                    <TaskListItem key={task.id} task={task} />
                ))}
            </ul>
            {showPagination && (
                <div className="flex justify-center my-4 join">
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
            )}
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

function EmptyListMessage() {
    return (
        <div className="flex justify-center gap-2 border-t-[1px] border-base-100 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>No tasks available</span>
        </div>
    );
}

export default TaskList;
