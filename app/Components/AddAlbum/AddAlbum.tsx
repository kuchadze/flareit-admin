/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Input from '../Input/Input';
import styles from './AddAlbum.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface AddAlbumProps {
    onDone?: () => void;
    id?: number;
}

export interface FormValues {
    title: string;
    picture: File | null;
    url: FileList | null;
    artistName: string;
    albumId: number;
    releaseDate: string;
}

const AddAlbum = forwardRef<{ submitForm: () => void }, AddAlbumProps>(
    ({ onDone, id }, ref) => {
        const [fileName, setFileName] = useState<string>('');
        const { handleSubmit, register, setValue } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('artistName', values.artistName);
            formData.append('releaseDate', values.releaseDate);
            formData.append('authorId', String(id));

            if (values.picture) {
                formData.append('picture', values.picture);
            }

            try {
                await axios.post(
                    'https://enigma-wtuc.onrender.com/albums',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );

                if (onDone) {
                    onDone();
                }
            } catch (error) {
                alert('Error uploading data');
            }
        };

        useImperativeHandle(ref, () => ({
            submitForm: handleSubmit(onRegister),
        }));

        const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const file = event.target.files?.[0] || null;
            if (file) {
                setFileName(file.name);
                setValue('picture', file);
            } else {
                setFileName('');
                setValue('picture', null);
            }
        };

        return (
            <div className={styles.central}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onRegister)}
                >
                    <div className={styles.container}>
                        <div className={styles.inputGroup}>
                            <p className={styles.color}>Album Name</p>
                            <Input
                                register={register('title', {
                                    required: true,
                                })}
                                placeholder="Album Name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <p className={styles.color}>Artist Name</p>
                            <Input
                                register={register('artistName', {
                                    required: true,
                                })}
                                placeholder="Artist Name"
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Year</p>
                        <input
                            className={styles.input}
                            {...register('releaseDate', {
                                required: true,
                            })}
                            placeholder="Year"
                            type="number"
                        />
                    </div>
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="albumPicture"
                            type="file"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="albumPicture"
                            className={styles.customButton}
                        >
                            <img src="/images/Image.svg" alt="Upload icon" />
                            <p>{fileName || 'Upload album cover'}</p>
                        </label>
                    </div>
                </form>
            </div>
        );
    },
);

export default AddAlbum;
