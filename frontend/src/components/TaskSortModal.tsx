import Modal from "./Modal"

function TaskSortModal({ taskSortModalID }: { taskSortModalID: string }) {
    return (
        <Modal modalId={taskSortModalID}>
            <h3 className="text-lg font-bold">Sort Tasks</h3>
            <form>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Field</span>
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
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Direction</span>
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
                    <span>Filter</span>
                </button>
            </form>
        </Modal>
    )
}

export default TaskSortModal