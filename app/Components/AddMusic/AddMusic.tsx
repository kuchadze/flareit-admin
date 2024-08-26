import { FormValues } from '@/app/interfaces/interface';
import axios from 'axios';
import { forwardRef, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import styles from './AddMusic.module.scss';

interface AddArtistProps {
    onDone?: () => void;
}

const AddMusic = forwardRef<{ submitForm: () => void }, AddArtistProps>(
    ({ onDone }, ref) => {
        const {
            handleSubmit,
            register,
            formState: { errors },
        } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);

            if (values.coverImgUrl.length > 0) {
                formData.append('picture', values.coverImgUrl[0]);
            }
            if (values.audio.length > 0) {
                formData.append('audio', values.audio[0]);
            }
            try {
                const response = await axios.post(
                    'https://enigma-wtuc.onrender.com/musics',
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
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Name</p>
                        <Input
                            register={register('title', {
                                required: true,
                                minLength: 1,
                            })}
                            placeholder="Music Name"
                        />
                    </div>
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="audioInput"
                            type="file"
                            className={styles.fileInput}
                            {...register('audio', {
                                required: 'Audio file is required',
                            })}
                        />
                        <label
                            htmlFor="audioInput"
                            className={styles.customButton}
                        >
                            <img src="/images/AddMusic.svg" alt="Upload icon" />
                            <p>Upload music - Mp3</p>
                        </label>
                        {errors.audio && (
                            <p className={styles.error}>
                                {errors.audio.message}
                            </p>
                        )}
                    </div>
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="coverImgInput"
                            type="file"
                            className={styles.fileInput}
                            {...register('coverImgUrl', {
                                required: 'Cover image is required',
                            })}
                        />
                        <label
                            htmlFor="coverImgInput"
                            className={styles.customButton}
                        >
                            <img src="/images/Image.svg" alt="Upload icon" />
                            <p>Upload album cover</p>
                        </label>
                        {errors.coverImgUrl && (
                            <p className={styles.error}>
                                {errors.coverImgUrl.message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        );
    },
);

export default AddMusic;
