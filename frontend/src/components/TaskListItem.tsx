import { useCallback } from "react";
import { Task } from "../types"
import { closeModal, showModal, useModal } from "../utils/modalUtil";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "react-query";
import apiUtil from "../utils/apiUtil";

function TaskListItem({ task }: { task: Task }) {
    const modalID = useModal('delete-confirm-modal');
    const showConfirmModal = useCallback(() => showModal(modalID), [modalID]);
    return (
        <>
            <li className="card-body border-t-[1px] last:border-b-[1px] border-base-100">
                <div className="flex items-start justify-between gap-2">
                    <h2 className="card-title">{task.name}</h2>
                    <span className={`text-xs badge badge-${task.status.theme_color ?? 'info'} badge-outline text-nowrap`}>{task.status.name}</span>
                </div>
                <p>{task.description ?? 'No Description'}</p>
                <div className="justify-start card-actions">
                    <button className="btn btn-sm btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span>Edit</span>
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={showConfirmModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </li>
            <ConfirmDeleteModal modalID={modalID} taskID={task.id} />
        </>
    )
}

function ConfirmDeleteModal({ modalID, taskID }: { modalID: string, taskID: number }) {
    const closeDeleteModal = useCallback(() => closeModal(modalID), [modalID]);

    const queryClient = useQueryClient()
    const mutation = useMutation((id: number) => apiUtil.delete(`/api/task/${id}`), {
        onSuccess: () => {
            closeDeleteModal()
            queryClient.invalidateQueries(['tasks'])
        },
        onError: () => {
            alert('Something went wrong! Could not delete task')
        }
    })

    return (
        <Modal modalId={modalID}>
            <h5 className="text-lg font-bold">Delete Task</h5>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-2 my-4">
                <button className="btn btn-secondary" onClick={closeDeleteModal}>No</button>
                <button className="btn btn-primary" onClick={() => mutation.mutate(taskID)}>Delete</button>
            </div>
        </Modal>
    )
}

export default TaskListItem