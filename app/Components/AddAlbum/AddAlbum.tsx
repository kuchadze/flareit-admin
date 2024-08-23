import { forwardRef, useImperativeHandle } from 'react';
import styles from './AddAlbum.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues } from '@/app/interfaces/interface';
import axios from 'axios';
import Input from '../Input/Input';

interface AddArtistProps {
    onDone?: () => void;
}

const AddAlbum = forwardRef<{ submitForm: () => void }, AddArtistProps>(
    ({ onDone }, ref) => {
        const {
            handleSubmit,
            register,
            formState: { errors },
        } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('artistName', values.artistName);
            formData.append('releaseDate', values.releaseDate.toString());

            if (values.coverImgUrl.length > 0) {
                formData.append('picture', values.coverImgUrl[0]);
            }
            try {
                const response = await axios.post(
                    'https://enigma-wtuc.onrender.com/albums',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                console.log('Response:', response.data);
            } catch (error) {
                alert('error');
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
                            <p>Upload album cover</p>
                        </label>
                    </div>
                </form>
            </div>
        );
    },
);

export default AddAlbum;
