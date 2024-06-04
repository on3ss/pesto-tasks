import { useMemo } from "react"
import Navbar from "../components/Navbar"
import TaskFormModal from "../components/TaskFormModal"
import TaskListItem from "../components/TaskListItem"

function Home() {
    const taskFormModalID = useMemo(() => 'create-form-modal', [])
    const showTaskFormModal = () => {
        const modal = document.getElementById(taskFormModalID) as HTMLDialogElement
        if (modal) {
            modal.showModal()
        }
    }

    return (
        <>
            <Navbar />
            <main className="relative mt-24">
                <section className="mx-2 mb-4 rounded bg-primary-content">
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
        </>
    )
}



function TaskList() {
    return (
        <ul>
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
        </ul>
    )
}

export default Home