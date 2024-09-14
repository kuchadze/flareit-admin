import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './ChangePassword.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { FormValues } from '@/app/interfaces/interface';

interface ChangePasswordProps {
    onSubmitStatus: (status: boolean) => void;
    onPasswordLengthCheck: (isValid: boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: number;
}

// eslint-disable-next-line react/display-name
const ChangePassword = forwardRef<
    {
        submitForm: () => void;
    },
    ChangePasswordProps
>(({ onSubmitStatus, onPasswordLengthCheck, onInputChange, id }, ref) => {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onBlur',
    });
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const [formError, setFormError] = useState<string | null>(null);

    const onRegister: SubmitHandler<FormValues> = async (values) => {
        if (id && values.password && values.confirmPassword) {
            try {
                await axios.patch(
                    `https://enigma-wtuc.onrender.com/users/${id}`,
                    values,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                alert('Password changed successfully');
                onSubmitStatus(true);
            } catch (error) {
                setFormError('Error updating password');
                onSubmitStatus(false);
            }
        } else {
            onSubmitStatus(false);
        }
    };

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            const result = handleSubmit(onRegister)();
            const password = getValues('password');
            const confirmPassword = getValues('confirmPassword');
            const isPasswordLengthValid = password.length >= 8;

            // Check if all required inputs have values
            const areInputsFilled =
                password.trim() !== '' && confirmPassword.trim() !== '';

            onPasswordLengthCheck(isPasswordLengthValid);
            if (!result || !areInputsFilled) {
                onSubmitStatus(false); // Updated to reflect form validation
            } else {
                onSubmitStatus(true); // Ensure status is updated when inputs are valid
            }
            return result;
        },
    }));

    return (
        <div className={styles.central}>
            <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
                <div className={styles.container}>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>New Password</p>
                        <input
                            className={styles.input}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters long',
                                },
                            })}
                            type="password"
                            placeholder="New Password"
                            onChange={onInputChange} // Added onChange handler
                        />
                        {errors.password && (
                            <p className={styles.error}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Confirm New Password</p>
                        <input
                            className={styles.input}
                            {...register('confirmPassword', {
                                required: 'Password confirmation is required',
                                validate: {
                                    matchesPassword: (value) =>
                                        value === getValues('password') ||
                                        'Passwords do not match',
                                },
                            })}
                            type="password"
                            placeholder="Confirm New Password"
                            onChange={onInputChange} // Added onChange handler
                        />
                        {errors.confirmPassword && (
                            <p className={styles.error}>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    {formError && <p className={styles.error}>{formError}</p>}
                </div>
            </form>
        </div>
    );
});

export default ChangePassword;
