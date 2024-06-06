import { useCallback, useEffect, useState } from "react"
import { useStatus } from "../contexts/StatusContext"
import { useTask } from "../contexts/TaskContext"
import Modal from "./Modal"
import { closeModal } from "../utils/modalUtil"

function TaskFilterModal({ taskFilterModalID }: { taskFilterModalID: string }) {
    const { statuses } = useStatus()
    const [status, setStatus] = useState<number>()
    const [selectedStatus, setSelectedStatus] = useState<number | undefined>()
    const { updateQueryParams } = useTask()
    const closeTaskFormModal = useCallback(() => closeModal(taskFilterModalID), [taskFilterModalID]);

    useEffect(() => {
        if (status !== undefined) {
            updateQueryParams({
                'filter[status_id]': status
            })
        }
    }, [status])

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(parseInt(e.target.value))
    }

    const handleApply = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedStatus !== undefined) {
            setStatus(selectedStatus)
        }
        closeTaskFormModal()
    }

    return (
        <Modal modalId={taskFilterModalID}>
            <h3 className="text-lg font-bold">Filter Tasks</h3>
            <form onSubmit={handleApply}>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <select
                        className="select select-bordered"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="" disabled>Select status</option>
                        {statuses?.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="btn btn-primary float-end" type="submit">
                    <span>Apply</span>
                </button>
            </form>
        </Modal>
    )
}

export default TaskFilterModal
