import { useCallback } from "react"
import Navbar from "../components/Navbar"
import TaskFormModal from "../components/TaskFormModal"
import TaskFilterModal from "../components/TaskFilterModal"
import TaskSortModal from "../components/TaskSortModal"
import TaskList from "../components/TaskList"
import StatusProvider, { useStatus } from "../contexts/StatusContext"
import Search from "../components/Search"
import TaskProvider from "../contexts/TaskContext"
import { showModal, useModal } from "../utils/modalUtil"

function Home() {
    return (
        <>
            <Navbar />
            <StatusProvider>
                <TaskProvider>
                    <HomeBody />
                </TaskProvider>
            </StatusProvider>
        </>
    )
}

function HomeBody() {
    const { statusesLoading } = useStatus()
    const taskFormModalID = useModal('task-form-modal');
    const taskFilterModalID = useModal('task-filter-modal');
    const taskSortModalID = useModal('task-sort-modal');

    const showTaskFormModal = useCallback(() => showModal(taskFormModalID), [taskFormModalID]);
    const showTaskFilterModal = useCallback(() => showModal(taskFilterModalID), [taskFilterModalID]);
    const showTaskSortModal = useCallback(() => showModal(taskSortModalID), [taskSortModalID]);



    if (statusesLoading) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    return (
        <>
            <main className="relative mt-24">
                <div className="flex items-center justify-between gap-2 mx-2 mb-4">
                    <Search />
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
                    <TaskList />
                </section>
            </main>
            <TaskFormModal taskFormModalID={taskFormModalID} />
            <TaskFilterModal taskFilterModalID={taskFilterModalID} />
            <TaskSortModal taskSortModalID={taskSortModalID} />
        </>
    )
}

export default Home