// import React from 'react';
// import Input from '../Input/Input';
// import styles from './AddArtist.module.scss';
// import { useForm } from 'react-hook-form';

// const AddArtist = () => {
//     const {
//         handleSubmit,
//         register,
//         formState: { errors },
//     } = useForm();

//     const onRegister = (values: any) => {
//         console.log('values', values);
//     };

//     // console.log(errors);

//     return (
//         <div className={styles.central}>
//             <form onSubmit={handleSubmit(onRegister)}>
//                 <div className={styles.container}>
//                     <div className={styles.inputGroup}>
//                         <p className={styles.color}>Name</p>
//                         <Input
//                             register={{
//                                 ...register('name', {
//                                     required: true,
//                                     minLength: 1,
//                                 }),
//                             }}
//                             placeholder="Artist Name"
//                             type={''}
//                         />
//                     </div>
//                     <div className={styles.inputGroup}>
//                         <p className={styles.color}>Last Name</p>
//                         <Input
//                             register={{
//                                 ...register('lastname', {
//                                     required: true,
//                                     minLength: 1,
//                                 }),
//                             }}
//                             placeholder="Artist Last Name"
//                             type={''}
//                         />
//                     </div>
//                 </div>
//                 <div className={styles.inputGroup}>
//                     <p className={styles.color}>Year</p>
//                     <Input
//                         register={{
//                             ...register('year', {
//                                 required: true,
//                                 minLength: 1,
//                             }),
//                         }}
//                         placeholder="Year"
//                         type={''}
//                     />
//                 </div>
//                 <div className={styles.inputGroup}>
//                     <p className={styles.color}>Biography</p>
//                     <Input
//                         register={{
//                             ...register('biography', {
//                                 required: true,
//                                 minLength: 1,
//                             }),
//                         }}
//                         placeholder="Add Biography"
//                         type={''}
//                     />
//                 </div>
//                 <div className={styles.fileInputWrapper}>
//                     <input
//                         id="fileInput"
//                         type="file"
//                         className={styles.fileInput}
//                         {...register('file', {
//                             required: true,
//                         })}
//                     />
//                     <label htmlFor="fileInput" className={styles.customButton}>
//                         <img src="/images/Image.svg" alt="Upload icon" />
//                         {/* {fileName || 'Upload artist photo'} */}
//                     </label>
//                 </div>
//                 <input type="submit" value={'register'} />
//             </form>
//         </div>
//     );
// };

// export default AddArtist;

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

            formData.forEach((value, key) => {
                if (value instanceof File) {
                    console.log(`${key}: ${value.name}`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            });

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
                console.error(
                    'Error:',
                    error.response ? error.response.data : error.message,
                );
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
                                register={{
                                    ...register('artistName', {
                                        required: true,
                                        minLength: 1,
                                    }),
                                }}
                                placeholder="Artist Name"
                                type="text"
                            />
                            {errors.artistName && (
                                <p className={styles.error}>Name is required</p>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <p className={styles.color}>Last Name</p>
                            <Input
                                register={{
                                    ...register('lastName', {
                                        required: true,
                                        minLength: 1,
                                    }),
                                }}
                                placeholder="Artist Last Name"
                                type="text"
                            />
                            {errors.lastName && (
                                <p className={styles.error}>
                                    Last Name is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Year</p>
                        <Input
                            register={{
                                ...register('releaseDate', {
                                    required: true,
                                    min: 1,
                                }),
                            }}
                            placeholder="Year"
                            type="number"
                        />
                        {errors.releaseDate && (
                            <p className={styles.error}>Year is required</p>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Biography</p>
                        <Input
                            register={{
                                ...register('biography', {
                                    required: true,
                                    minLength: 1,
                                }),
                            }}
                            placeholder="Add Biography"
                            type="text"
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
