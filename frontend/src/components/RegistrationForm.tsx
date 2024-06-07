import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface RegistrationFormData {
    name: string,
    email: string;
    password: string;
    confirmPassword: string;
}

const registrationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(4).max(255),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema)
    });
    const { register: registerUser } = useAuth();

    const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
        setIsSubmitting(true);
        try {
            await registerUser(data.name, data.email, data.password, data.confirmPassword);
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach((key) => {
                    setError(key as keyof RegistrationFormData, {
                        type: 'server',
                        message: validationErrors[key][0],
                    });
                });
            } else {
                console.error('Authentication error:', error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={isSubmitting ? 'opacity-50 pointer-events-none' : ''}>
            <label className="w-full my-4 form-control">
                <div className="label">
                    <span className="label-text">Name</span>
                </div>
                <input type="text" placeholder="Name" className="w-full input input-bordered" {...register('name')} />
                <div className="text-error">{errors.name?.message}</div>
            </label>
            <label className="w-full my-4 form-control">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input type="email" placeholder="Email" className="w-full input input-bordered" {...register('email')} />
                <div className="text-error">{errors.email?.message}</div>
            </label>
            <label className="w-full my-4 form-control">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input type="password" placeholder="Password" className="w-full input input-bordered" {...register('password')} />
                <div className="text-error">{errors.password?.message}</div>
            </label>
            <label className="w-full my-4 form-control">
                <div className="label">
                    <span className="label-text">Confirm Password</span>
                </div>
                <input type="password" placeholder="Confirm Password" className="w-full input input-bordered" {...register('confirmPassword')} />
                <div className="text-error">{errors.confirmPassword?.message}</div>
            </label>

            <div className="flex justify-center my-4">
                <button type="submit" className="flex-1 btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </div>
        </form>
    );
}
