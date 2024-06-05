import { FieldErrors, UseFormRegister } from "react-hook-form"

export type TaskFormValues = {
    name: string,
    description: string
}

export type FormFieldsProps = {
    register: UseFormRegister<TaskFormValues>,
    errors: FieldErrors<TaskFormValues>
}