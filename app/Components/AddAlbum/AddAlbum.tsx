import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Input from '../Input/Input';
import styles from './AddAlbum.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { FormValues } from '@/app/interfaces/interface';

interface AddArtistProps {
    onDone?: () => void;
}

// eslint-disable-next-line react/display-name
const AddArtist = forwardRef<{ submitForm: () => void }, AddArtistProps>(
    ({ onDone }, ref) => {
        const [fileName, setFileName] = useState<string>('');
        const {
            handleSubmit,
            register,
            setValue, // To set the value of the file input in the form
        } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('artistName', values.artistName);
            formData.append('releaseDate', values.releaseDate.toString());

            if (values.coverImgUrl) {
                // Check if file is not null
                formData.append('picture', values.coverImgUrl);
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
            } catch (error) {
                alert('Error uploading data');
            }

            if (onDone) {
                onDone();
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
                setValue('coverImgUrl', file); // Set file in the form values
            } else {
                setFileName(''); // Clear file name if no file is selected
                setValue('coverImgUrl', null); // Clear file input
            }
        };

        return (
            <div className={styles.central}>
                <form className={styles.form}>
                    <div className={styles.container}>
                        <div className={styles.inputGroup}>
                            <p className={styles.color}>Name</p>
                            <Input
                                register={register('title', {
                                    required: true,
                                    minLength: 1,
                                })}
                                placeholder="Album Name"
                            />
                        </div>
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
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="fileInput"
                            type="file"
                            multiple={false}
                            className={styles.fileInput}
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className={styles.customButton}
                        >
                            <img src="/images/Image.svg" alt="Upload icon" />
                            <p>{fileName || 'Upload artist photo'}</p>
                        </label>
                    </div>
                </form>
            </div>
        );
    },
);

export default AddArtist;
