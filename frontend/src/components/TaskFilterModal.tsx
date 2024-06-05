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
                    <span>Apply</span>
                </button>
            </form>
        </Modal>
    )
}

export default TaskFilterModal