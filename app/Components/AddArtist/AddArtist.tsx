import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Input from '../Input/Input';
import styles from './AddArtist.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { FormValues } from '@/app/interfaces/interface';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';

interface AddArtistProps {
    onDone?: () => void;
}

// eslint-disable-next-line react/display-name
const AddArtist = forwardRef<
    { submitForm: () => void; isInputEmpty: () => boolean },
    AddArtistProps
>(({ onDone }, ref) => {
    const [fileName, setFileName] = useState<string>('');
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormValues>();

    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const [clikc, setClick] = useRecoilState(clickState);

    const onRegister: SubmitHandler<FormValues> = async (values) => {
        const formData = new FormData();
        formData.append('artistName', values.artistName);
        formData.append('lastName', values.lastName);
        formData.append('releaseDate', values.releaseDate.toString());
        formData.append('biography', values.biography);

        if (values.coverImgUrl) {
            formData.append('picture', values.coverImgUrl);
        }

        try {
            await axios.post(
                'https://enigma-wtuc.onrender.com/authors',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setClick(!clikc);
            alert('Artist added successfully');
        } catch (error) {
            alert('Error uploading data');
        }

        if (onDone) {
            onDone();
        }
    };

    useImperativeHandle(ref, () => ({
        submitForm: handleSubmit(onRegister),
        isInputEmpty: () => {
            const artistName = watch('artistName');
            const releaseDate = watch('releaseDate');
            const biography = watch('biography');
            return !artistName || !releaseDate || !biography;
        },
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setFileName(file.name);
            setValue('coverImgUrl', file);
        } else {
            setFileName('');
            setValue('coverImgUrl', null);
        }
    };

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
                        <p className={styles.error}>Biography is required</p>
                    )}
                </div>
                <div className={styles.fileInputWrapper}>
                    <input
                        id="fileInput"
                        type="file"
                        multiple={false}
                        className={styles.fileInput}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput" className={styles.customButton}>
                        <img src="/images/Image.svg" alt="Upload icon" />
                        <p>{fileName || 'Upload artist photo'}</p>
                    </label>
                </div>
            </form>
        </div>
    );
});

export default AddArtist;
