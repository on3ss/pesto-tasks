import { useCallback, useMemo, useState } from "react"
import Navbar from "../components/Navbar"
import TaskFormModal from "../components/TaskFormModal"
import TaskFilterModal from "../components/TaskFilterModal"
import TaskSortModal from "../components/TaskSortModal"
import TaskList from "../components/TaskList"
import { useDebounce } from "@uidotdev/usehooks"

function useModal(id: string) {
    return useMemo(() => id, [id]);
}

function showModal(modalID: string) {
    const modal = document.getElementById(modalID) as HTMLDialogElement;
    if (modal) {
        modal.showModal();
    }
}

function Home() {
    const taskFormModalID = useModal('task-form-modal');
    const taskFilterModalID = useModal('task-filter-modal');
    const taskSortModalID = useModal('task-sort-modal');

    const showTaskFormModal = useCallback(() => showModal(taskFormModalID), [taskFormModalID]);
    const showTaskFilterModal = useCallback(() => showModal(taskFilterModalID), [taskFilterModalID]);
    const showTaskSortModal = useCallback(() => showModal(taskSortModalID), [taskSortModalID]);

    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 300)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Navbar />
            <main className="relative mt-24">
                <div className="flex items-center justify-between gap-2 mx-2 mb-4">
                    <label className="flex items-center w-full gap-2 input input-bordered">
                        <input type="text" className="grow" placeholder="Search" value={search} onChange={handleSearchChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                    <div className="join">
                        <button className="btn join-item" onClick={showTaskFilterModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                            </svg>
                        </button>
                        <button className="btn join-item" onClick={showTaskSortModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                <section className="pb-4 mx-2 mb-4 rounded bg-primary-content">
                    <div className="flex justify-center">
                        <button className="btn btn-link focus:outline-none" onClick={showTaskFormModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Add New Task</span>
                        </button>
                    </div>
                    <TaskList search={debouncedSearch} />
                </section>
            </main>
            <TaskFormModal taskFormModalID={taskFormModalID} />
            <TaskFilterModal taskFilterModalID={taskFilterModalID} />
            <TaskSortModal taskSortModalID={taskSortModalID} />
        </>
    )
}

export default Home