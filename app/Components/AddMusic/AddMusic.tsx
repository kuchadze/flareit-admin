/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '../Input/Input';
import styles from './AddMusic.module.scss';

interface AddMusicProps {
    onDone?: () => void;
}

export interface FormValues {
    title: string;
    coverImgUrl: FileList | null;
    audio: FileList | null;
}

const AddMusic = forwardRef<{ submitForm: () => void }, AddMusicProps>(
    ({ onDone }, ref) => {
        const [audioFileName, setAudioFileName] = useState('');
        const [coverImgFileName, setCoverImgFileName] = useState('');

        const { handleSubmit, register, setValue } = useForm<FormValues>();

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);

            if (values.coverImgUrl && values.coverImgUrl.length > 0) {
                formData.append('picture', values.coverImgUrl[0]);
            }
            if (values.audio && values.audio.length > 0) {
                formData.append('audio', values.audio[0]);
            }

            try {
                await axios.post(
                    'https://enigma-wtuc.onrender.com/musics',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                alert('Music added successfully');
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
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onRegister)}
                >
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Name</p>
                        <Input
                            register={{
                                ...register('title', {
                                    required: true,
                                    minLength: 1,
                                }),
                            }}
                            placeholder="Music Name"
                        />
                    </div>
                    <div className={styles.fileInputWrapper}>
                        <input
                            id="audioInput"
                            type="file"
                            className={styles.fileInput}
                            onChange={handleAudioChange}
                            accept="audio/*"
                            multiple={false}
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
                            onChange={handleCoverImgChange}
                            accept="image/*"
                            multiple={false}
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
