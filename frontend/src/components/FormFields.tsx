import { FormFieldsProps } from "../types"

function FormFields({ register, errors }: FormFieldsProps) {
    return (
        <>
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
        </>
    )
}

export default FormFields