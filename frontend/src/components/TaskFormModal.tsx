import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import Modal from "./Modal"

type FormValues = {
    name: string,
    description: string
}

const schema = yup.object({
    name: yup.string().required().min(4).max(30),
    description: yup.string().required().min(4).max(255)
}).required()

function TaskFormModal({ taskFormModalID }: { taskFormModalID: string }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(schema) })

    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <Modal modalId={taskFormModalID}>
            <h3 className="text-lg font-bold">Add Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="w-full my-4 form-control">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input type="text" placeholder="Name" className="w-full input input-bordered" defaultValue="" {...register("name")} />
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.name?.message}</span>
                    </div>
                </label>
                <label className="my-4 form-control">
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea className="h-24 textarea textarea-bordered" placeholder="Description" defaultValue="" {...register("description")}></textarea>
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.description?.message}</span>
                    </div>
                </label>
                <button className="btn btn-primary float-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add</span>
                </button>
            </form>
        </Modal>
    )
}

export default TaskFormModal