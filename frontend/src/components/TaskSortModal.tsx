import { useCallback, useState } from "react";
import Modal from "./Modal"
import { useTask } from "../contexts/TaskContext";
import { closeModal } from "../utils/modalUtil";

function TaskSortModal({ taskSortModalID }: { taskSortModalID: string }) {
    const { updateQueryParams } = useTask()
    const [field, setField] = useState<string>("")
    const [direction, setDirection] = useState<string>("")
    const closeTaskFormModal = useCallback(() => closeModal(taskSortModalID), [taskSortModalID]);

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setField(e.target.value)
    }

    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value)
    }

    const handleApply = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (field) {
            updateQueryParams({
                'sort': `${direction}${field}`
            })
            closeTaskFormModal()
        }
    }

    return (
        <Modal modalId={taskSortModalID}>
            <h3 className="text-lg font-bold">Sort Tasks</h3>
            <form onSubmit={handleApply}>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Field</span>
                    </div>
                    <select
                        className="select select-bordered"
                        value={field}
                        onChange={handleFieldChange}
                    >
                        <option value="" disabled>Select field</option>
                        <option value="name">Name</option>
                        <option value="status">Status</option>
                    </select>
                </label>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Direction</span>
                    </div>
                    <select
                        className="select select-bordered"
                        value={direction}
                        onChange={handleDirectionChange}
                    >
                        <option value="">Ascending</option>
                        <option value="-">Descending</option>
                    </select>
                </label>
                <button className="btn btn-primary float-end" type="submit">
                    <span>Apply</span>
                </button>
            </form>
        </Modal>
    )
}

export default TaskSortModal
