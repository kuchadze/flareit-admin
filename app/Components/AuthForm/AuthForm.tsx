import styles from './AuthForm.module.scss';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AuthInput from '../AuthInput/AuthInput';
import { AuthInputs, Response } from '@/app/interfaces/interface';

const AuthForm = () => {
    const [fail, setFail] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<AuthInputs>();

    const router = useRouter();

    const onSubmit = (values: AuthInputs) => {
        axios
            .post<Response>(
                'https://enigma-wtuc.onrender.com/auth/login',
                values,
            )
            .then((response: AxiosResponse<Response>) => {
                const token = response.data.access_token;

                if (token) {
                    localStorage.setItem('token', token);
                    router.push('/');
                }
            })
            .catch((error: AxiosError) => {
                console.error('Error sending data:', error);

                if (error.message === 'Request failed with status code 401') {
                    setFail('Invalid email or password. Please try again.');
                }
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.emileContainer}>
                <p className={styles.passwordColor}>Enter email</p>
                <AuthInput
                    placeholder="Enter Email"
                    register={register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Invalid email address',
                        },
                    })}
                    submitted={isSubmitted}
                    error={errors.email?.message}
                />
            </div>
            <div className={styles.passwordContainer}>
                <p className={styles.passwordColor}>Enter password</p>
                <AuthInput
                    placeholder="Enter Password"
                    register={register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message:
                                'Password must be at least 8 characters long',
                        },
                    })}
                    submitted={isSubmitted}
                    type="password"
                    error={errors.password?.message}
                />
            </div>
            {fail && (
                <div className={styles.errorContainer}>
                    <span className={styles.fail}>{fail}</span>
                </div>
            )}
            <div className={styles.inputContainer}>
                <div className={styles.inputSubbmit}>
                    <input
                        className={styles.input}
                        type="submit"
                        value="Sign In"
                    />
                </div>
            </div>
        </form>
    );
};
export default AuthForm;
