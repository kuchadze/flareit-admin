/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '../Input/Input';
import styles from './AddMusic.module.scss';
import { useParams } from 'next/navigation';

interface AddMusicProps {
    onDone?: () => void;
}

export interface FormValues {
    musicTitle: string;
    musicPicture: FileList | null;
    url: FileList | null;
    artistName: string;
}

const AddMusic = forwardRef<{ submitForm: () => void }, AddMusicProps>(
    ({ onDone }, ref) => {
        const [audioFileName, setAudioFileName] = useState('');
        const [coverImgFileName, setCoverImgFileName] = useState('');

        const { handleSubmit, register, setValue } = useForm<FormValues>();
        const params = useParams();
        const id = params.id;

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            const formData = new FormData();
            formData.append('musicTitle', values.musicTitle);
            formData.append('artistName', values.artistName);

            if (values.musicPicture && values.musicPicture.length > 0) {
                formData.append('musicPicture', values.musicPicture[0]);
            }
            if (values.url && values.url.length > 0) {
                formData.append('audio', values.url[0]);
            }
            try {
                await axios.patch(
                    `https://enigma-wtuc.onrender.com/albums/${id}`,
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
                setValue('url', event.target.files);
            }
        };

        const handleCoverImgChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            if (event.target.files && event.target.files.length > 0) {
                setCoverImgFileName(event.target.files[0].name);
                setValue('musicPicture', event.target.files);
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
                                ...register('musicTitle', {
                                    required: true,
                                    minLength: 1,
                                }),
                            }}
                            placeholder="Music Name"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>artistName</p>
                        <Input
                            register={{
                                ...register('artistName', {
                                    required: true,
                                    minLength: 1,
                                }),
                            }}
                            placeholder="ArtistName"
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
                            <img src="/images/addMusic.svg" alt="Upload icon" />
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
                            <img src="/images/image.svg" alt="Upload icon" />
                            <p>{coverImgFileName || 'Upload album cover'}</p>
                        </label>
                    </div>
                </form>
            </div>
        );
    },
);

export default AddMusic;
