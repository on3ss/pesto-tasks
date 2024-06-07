import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, Task } from "../types";
import apiUtil from '../utils/apiUtil';
import { useMutation, useQueryClient } from 'react-query';
import { useStatus } from '../contexts/StatusContext';

const schema = yup.object({
    name: yup.string().required().min(4).max(255),
    description: yup.string().nullable().max(1000),
    status_id: yup.number().required(),
}).required();

function TaskListItem({ task }: { task: Task }) {
    const [isEditing, setIsEditing] = useState(false);
    const { statuses } = useStatus()
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...task,
            status_id: task.status.id
        }
    });

    const queryClient = useQueryClient()

    const updateMutation = useMutation(
        (updatedTask: FormValues) => apiUtil.patch(`/api/task/${task.id}`, updatedTask),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['tasks'])
                setIsEditing(false)
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
            }
        }
    )

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        updateMutation.mutate(data)
    };

    const deleteMutation = useMutation(
        () => apiUtil.delete(`/api/task/${task.id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            },
            onError: () => alert('Something went wrong! Could not delete task')
        }
    )

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteMutation.mutate()
        }
    };

    return (
        <li className="card-body border-t-[1px] last:border-b-[1px] border-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
                {isEditing ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <div className="flex items-start justify-between gap-2">
                            <h2 className="card-title">{task.name}</h2>
                            <span className={`text-xs badge badge-${task.status.theme_color ?? 'info'} badge-outline text-nowrap`}>{task.status.name}</span>
                        </div>
                        <p>{task.description ?? 'No Description'}</p>
                    </>
                )}
                <div className="justify-start my-4 card-actions">
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn btn-sm btn-primary">
                                Save
                            </button>
                            <button className="btn btn-sm btn-error" role='button' onClick={(e) => {
                                e.preventDefault()
                                setIsEditing(false)
                            }}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-sm btn-primary" role='button' onClick={(e) => {
                            e.preventDefault()
                            setIsEditing(true)
                        }}>
                            Edit
                        </button>
                    )}
                    <button type="button" className="btn btn-sm btn-secondary" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </form>
        </li >
    );
}

export default TaskListItem;
