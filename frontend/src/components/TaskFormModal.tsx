import Modal from './Modal';
import { Task } from '../contexts/StatusContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback } from 'react';
import { closeModal } from '../pages/Home';

type FormValues = {
    name: string;
    description?: string | null | undefined;
    status_id: number;
};

const schema = yup.object({
    name: yup.string().required().min(4).max(255),
    description: yup.string().nullable().max(1000),
    status_id: yup.number().required(),
}).required();

function TaskFormModal({ taskFormModalID, statuses }: { taskFormModalID: string; statuses: Task[] | null }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const closeTaskFormModal = useCallback(() => closeModal(taskFormModalID), [taskFormModalID]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL
            const response = await fetch(`${baseUrl}/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                closeTaskFormModal()
                alert('Task added successfully.');
            } else {
                const errorData = await response.json();
                if (errorData.errors) {
                    Object.keys(errorData.errors).forEach((key) => {
                        setError(key as keyof FormValues, {
                            type: 'server',
                            message: errorData.errors[key][0], // Assuming the server sends the first error message only
                        });
                    });
                } else {
                    alert('Failed to add task.');
                }
            }
        } catch (error) {
            alert('Something went wrong! Could not add task');
        }
    };

    return (
        <Modal modalId={taskFormModalID}>
            <h3 className="text-lg font-bold">Add Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input type="text" placeholder="Name" className="w-full input input-bordered" defaultValue="" {...register('name')} />
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.name?.message}</span>
                    </div>
                </label>
                <label className="my-4 form-control">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea className="h-24 textarea textarea-bordered" placeholder="Description" defaultValue="" {...register('description')}></textarea>
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.description?.message}</span>
                    </div>
                </label>
                <label className="my-4 form-control" {...register('status_id')}>
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <select className="select select-bordered">
                        {statuses?.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.status_id?.message}</span>
                    </div>
                </label>
                <button className="btn btn-primary float-end" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add</span>
                </button>
            </form>
        </Modal>
    );
}

export default TaskFormModal;
