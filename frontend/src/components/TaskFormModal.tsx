function TaskFormModal({ taskFormModalID }: { taskFormModalID: string }) {
    return (
        <dialog id={taskFormModalID} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="text-lg font-bold">Add Task</h3>
                <form action="">
                    <label className="w-full my-4 form-control">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input type="text" placeholder="Name" className="w-full input input-bordered" />
                    </label>
                    <label className="my-4 form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea className="h-24 textarea textarea-bordered" placeholder="Description"></textarea>
                    </label>
                    <button className="btn btn-primary float-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Add</span>
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default TaskFormModal