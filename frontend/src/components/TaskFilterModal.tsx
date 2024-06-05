import Modal from "./Modal"

function TaskFilterModal({ taskFilterModalID }: { taskFilterModalID: string }) {

    return (
        <Modal modalId={taskFilterModalID}>
            <h3 className="text-lg font-bold">Filter Tasks</h3>
            <form>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <select className="select select-bordered">
                        <option disabled>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>
                </label>
                <button className="btn btn-primary float-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Filter</span>
                </button>
            </form>
        </Modal>
    )
}

export default TaskFilterModal