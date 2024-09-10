import styles from './EditPlaylist.module.scss';
import { forwardRef, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

interface AddMusicProps {
    onDone?: () => void;
    id: number;
    value: string;
}

export interface FormValues {
    title: string;
}

// eslint-disable-next-line react/display-name
const EditPlaylist = forwardRef<{ submitForm: () => void }, AddMusicProps>(
    ({ onDone, id, value }, ref) => {
        const { handleSubmit, register } = useForm<FormValues>();
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            if (!values.title.trim()) {
                alert('Title cannot be empty');
                return;
            }

            try {
                await axios.patch(
                    `https://enigma-wtuc.onrender.com/playlists/${id}`,
                    { title: values.title },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            } catch (error) {
                alert('Error updating playlist');
            }

            if (onDone && values.title.trim()) {
                onDone();
            }
        };

        useImperativeHandle(ref, () => ({
            submitForm: handleSubmit(onRegister),
        }));

        return (
            <div className={styles.central}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onRegister)}
                >
                    <div className={styles.inputGroup}>
                        <p className={styles.color}>Name</p>
                        <input
                            defaultValue={value}
                            className={styles.input}
                            {...register('title', {
                                required: true,
                                minLength: 1,
                            })}
                            placeholder="Edit Playlist"
                        />
                    </div>
                </form>
            </div>
        );
    },
);

export default EditPlaylist;
