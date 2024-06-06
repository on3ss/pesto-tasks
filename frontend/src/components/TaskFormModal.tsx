import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import apiUtil from '../utils/apiUtil';
import Modal from './Modal';
import { closeModal } from '../pages/Home';
import { FormValues } from '../types';
import { useStatus } from '../contexts/StatusContext';

const schema = yup.object({
    name: yup.string().required().min(4).max(255),
    description: yup.string().nullable().max(1000),
    status_id: yup.number().required(),
}).required();

function TaskFormModal({ taskFormModalID }: { taskFormModalID: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newTask: FormValues) => apiUtil.post('/task', newTask),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['tasks']);
                closeTaskFormModal();
                alert('Task added successfully.');
            },
            onError: (error: any) => {
                if (error.response?.data?.errors) {
                    const errorData = error.response.data.errors;
                    Object.keys(errorData).forEach((key) => {
                        setError(key as keyof FormValues, {
                            type: 'server',
                            message: errorData[key][0], // Assuming the server sends the first error message only
                        });
                    });
                } else {
                    alert('Failed to add task.');
                }
            },
        }
    );

    const { statuses } = useStatus()

    const closeTaskFormModal = useCallback(() => closeModal(taskFormModalID), [taskFormModalID]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        mutation.mutate(data);
    };

    return (
        <Modal modalId={taskFormModalID}>
            <h3 className="text-lg font-bold">Add Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input type="text" placeholder="Name" className="w-full input input-bordered" {...register('name')} />
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.name?.message}</span>
                    </div>
                </label>
                <label className="my-4 form-control">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea className="h-24 textarea textarea-bordered" placeholder="Description" {...register('description')}></textarea>
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.description?.message}</span>
                    </div>
                </label>
                <label className="my-4 form-control">
                    <div className="label">
                        <span className="label-text">Status</span>
                    </div>
                    <select className="select select-bordered" {...register('status_id')}>
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
