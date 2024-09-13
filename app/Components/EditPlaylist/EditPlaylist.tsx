import styles from './EditPlaylist.module.scss';
import { forwardRef, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import apiInstance from '@/app/ApiInstance';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';

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
        const [click, setClick] = useRecoilState(clickState);

        const onRegister: SubmitHandler<FormValues> = async (values) => {
            if (!values.title.trim()) {
                return;
            }

            try {
                await apiInstance.patch(`/playlists/${id}`, {
                    title: values.title,
                });
            } catch (error) {
                alert('Error updating playlist');
            }
            setClick(!click);
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
