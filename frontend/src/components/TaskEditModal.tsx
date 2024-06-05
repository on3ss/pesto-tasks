import { SubmitHandler, useForm } from "react-hook-form"
import Modal from "./Modal"
import { TaskFormValues } from "../types"
import { yupResolver } from "@hookform/resolvers/yup"
import FormFields from "./FormFields"
import * as yup from "yup"

const schema = yup.object({
    name: yup.string().required().min(4).max(30),
    description: yup.string().required().min(4).max(255)
}).required()

function TaskEditModal({ taskFormModalID }: { taskFormModalID: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormValues>({ resolver: yupResolver(schema) })

    const onSubmit: SubmitHandler<TaskFormValues> = (data) => console.log(data)

    return (
        <Modal modalId={taskFormModalID}>
            <h3 className="text-lg font-bold">Add Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields register={register} errors={errors} />
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

export default TaskEditModal