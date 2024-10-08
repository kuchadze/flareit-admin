/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '../Input/Input';
import styles from './AddMusic.module.scss';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';

interface AddMusicProps {
    onDone?: () => void;
}

export interface FormValues {
    title: string;
    picture: FileList | null;
    url: FileList | null;
    artistName: string;
    albumId: number;
}

const AddMusic = forwardRef<
    { submitForm: () => void; isInputEmpty: () => boolean },
    AddMusicProps
>(({ onDone }, ref) => {
    const [audioFileName, setAudioFileName] = useState('');
    const [coverImgFileName, setCoverImgFileName] = useState('');
    const [click, setClick] = useRecoilState(clickState);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const { handleSubmit, register, setValue, watch } = useForm<FormValues>();
    const params = useParams();
    const id = params.id;

    const onRegister: SubmitHandler<FormValues> = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('artistName', values.artistName);
        formData.append('albumId', String(id));

        if (values.picture && values.picture.length > 0) {
            formData.append('picture', values.picture[0]);
        }
        if (values.url && values.url.length > 0) {
            formData.append('audio', values.url[0]);
        }
        try {
            await axios.post(
                'https://enigma-wtuc.onrender.com/musics',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setClick(!click);
            alert('Music added successfully');
        } catch (error) {
            alert('Error submitting form');
            console.log(error);
        }

        if (onDone) {
            onDone();
        }
    };

    useImperativeHandle(ref, () => ({
        submitForm: handleSubmit(onRegister),
        isInputEmpty: () => {
            const title = watch('title');
            const artistName = watch('artistName');
            return !title || !artistName;
        },
    }));

    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            setValue('picture', event.target.files);
        }
    };

    return (
        <div className={styles.central}>
            <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
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
                <div className={styles.inputGroup}>
                    <p className={styles.color}>Artist Name</p>
                    <Input
                        register={{
                            ...register('artistName', {
                                required: true,
                                minLength: 1,
                            }),
                        }}
                        placeholder="Artist Name"
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
                    <label htmlFor="audioInput" className={styles.customButton}>
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
});

export default AddMusic;
