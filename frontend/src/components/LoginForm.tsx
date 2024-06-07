import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface LoginFormData {
    email: string;
    password: string;
}

const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema)
    });
    const { login } = useAuth();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setIsSubmitting(true);
        try {
            await login(data.email, data.password);
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach((key) => {
                    setError(key as keyof LoginFormData, {
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
                    <span className="label-text">Email</span>
                </div>
                <input type="email" placeholder="Email" className="w-full input input-bordered" {...register('email')} />
                <div className="text-sm text-error">{errors.email?.message}</div>
            </label>
            <label className="w-full my-4 form-control">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input type="password" placeholder="Password" className="w-full input input-bordered" {...register('password')} />
                <div className="text-sm text-error">{errors.password?.message}</div>
            </label>

            <div className="flex justify-center my-4">
                <button type="submit" className="flex-1 btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    );
}