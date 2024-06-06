import { useCallback, useEffect, useState } from "react";
import { useStatus } from "../contexts/StatusContext";
import { useTask } from "../contexts/TaskContext";
import Modal from "./Modal";
import { closeModal } from "../utils/modalUtil";

function TaskFilterModal({ taskFilterModalID }: { taskFilterModalID: string }) {
    const { statuses } = useStatus();
    const { queryParams, updateQueryParams } = useTask();
    const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
        queryParams['filter[status_id]']
    );

    const closeTaskFormModal = useCallback(() => {
        closeModal(taskFilterModalID);
    }, [taskFilterModalID]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : undefined;
        setSelectedStatus(value);
    };

    const handleApply = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateQueryParams({
            'filter[status_id]': selectedStatus
        });
        closeTaskFormModal();
    };

    // Reset selectedStatus when the modal is closed or opened
    useEffect(() => {
        setSelectedStatus(queryParams['filter[status_id]']);
    }, [queryParams]);

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
                        value={selectedStatus ?? ""}
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
    );
}

export default TaskFilterModal;
