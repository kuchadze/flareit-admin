import React, { forwardRef, useImperativeHandle } from 'react';
import Input from '../Input/Input';
import styles from './AddArtist.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface AddArtistProps {
    onDone?: () => void;
}

interface FormValues {
    artistName: string;
    lastName: string;
    releaseDate: number;
    biography: string;
    coverImgUrl: FileList;
}

const AddArtist = forwardRef<{ submitForm: () => void }, AddArtistProps>(
    ({ onDone }, ref) => {
        const {
            handleSubmit,
            register,
            formState: { errors },
        } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('artistName', values.artistName);
            formData.append('lastName', values.lastName);
            formData.append('releaseDate', values.releaseDate.toString());
            formData.append('biography', values.biography);

            if (values.coverImgUrl.length > 0) {
                formData.append('picture', values.coverImgUrl[0]);
            }
            try {
                const response = await axios.post(
                    'https://enigma-wtuc.onrender.com/authors',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                console.log('Response:', response.data);
            } catch (error) {
                console.log(error);
            }

            if (onDone) {
                onDone();
            }
        };

        useImperativeHandle(ref, () => ({
            submitForm: handleSubmit(onRegister),
        }));

        return (
            <div className={styles.central}>
                <form className={styles.form}>
                    <div className={styles.container}>
                        <div className={styles.inputGroup}>
                            <p className={styles.color}>Name</p>
                            <Input
                                register={register('artistName', {
                                    required: true,
                                    minLength: 1,
                                })}
                                placeholder="Artist Name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <p className={styles.color}>Last Name</p>
                            <Input
                                register={register('lastName', {
                                    required: true,
                                    minLength: 1,
                                })}
                                placeholder="Artist Last Name"
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Year</p>
                        <input
                            className={styles.input}
                            {...register('releaseDate', {
                                required: true,
                                minLength: 1,
                            })}
                            placeholder="Year"
                            type="number"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Biography</p>
                        <Input
                            register={register('biography', {
                                required: true,
                                minLength: 1,
                            })}
                            placeholder="Add Biography"
                        />
                        {errors.biography && (
                            <p className={styles.error}>
                                Biography is required
                            </p>
                        )}
                    </div>
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="fileInput"
                            type="file"
                            className={styles.fileInput}
                            {...register('coverImgUrl', {
                                required: true,
                            })}
                        />
                        <label
                            htmlFor="fileInput"
                            className={styles.customButton}
                        >
                            <img src="/images/Image.svg" alt="Upload icon" />
                            <p>Upload artist photo</p>
                        </label>
                    </div>
                </form>
            </div>
        );
    },
);

export default AddArtist;
