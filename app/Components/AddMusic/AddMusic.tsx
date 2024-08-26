import { FormValues } from '@/app/interfaces/interface';
import axios from 'axios';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import styles from './AddMusic.module.scss';

interface AddArtistProps {
    onDone?: () => void;
}

const AddMusic = forwardRef<{ submitForm: () => void }, AddArtistProps>(
    ({ onDone }, ref) => {
        const [audioFileName, setAudioFileName] = useState('');
        const [coverImgFileName, setCoverImgFileName] = useState('');

        const {
            handleSubmit,
            register,
            setValue,
            formState: { errors },
        } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('artistName', values.artistName);
            formData.append('lastName', values.lastName);
            formData.append('releaseDate', values.releaseDate.toString());
            formData.append('biography', values.biography);

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
            } catch (error) {
                alert('Error submitting form');
            }

            if (onDone) {
                onDone();
            }
        };

        useImperativeHandle(ref, () => ({
            submitForm: handleSubmit(onRegister),
        }));

        const handleAudioChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            if (event.target.files && event.target.files.length > 0) {
                setAudioFileName(event.target.files[0].name);
                setValue('audio', event.target.files);
            }
        };

        const handleCoverImgChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            if (event.target.files && event.target.files.length > 0) {
                setCoverImgFileName(event.target.files[0].name);
                setValue('coverImgUrl', event.target.files);
            }
        };

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
                            onChange={handleAudioChange}
                        />
                        <label
                            htmlFor="audioInput"
                            className={styles.customButton}
                        >
                            <img src="/images/AddMusic.svg" alt="Upload icon" />
                            <p>{audioFileName || 'Upload music - Mp3'}</p>
                        </label>
                    </div>
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="coverImgInput"
                            type="file"
                            className={styles.fileInput}
                            {...register('coverImgUrl', {
                                required: 'Cover image is required',
                            })}
                            onChange={handleCoverImgChange}
                        />
                        <label
                            htmlFor="coverImgInput"
                            className={styles.customButton}
                        >
                            <img src="/images/Image.svg" alt="Upload icon" />
                            <p>{coverImgFileName || 'Upload album cover'}</p>
                        </label>
                    </div>
                </form>
            </div>
        );
    },
);

export default AddMusic;
