import styles from './BlockIcon.module.scss';
import { useEffect, useState } from 'react';
import apiInstance from '@/app/ApiInstance';

interface Props {
    id?: number;
}

const BlockIcon = (props: Props) => {
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

    const toggleBlockStatus = async () => {
        if (props.id !== undefined) {
            try {
                if (isBlocked) {
                    await apiInstance.patch(`/users/${props.id}/unblock`, {}),
                        [];
                    alert('unlocked');
                } else {
                    await apiInstance.patch(`/users/${props.id}/block`, {}), [];
                    alert('was blocked');
                }
                setIsBlocked((prev) => !prev);
            } catch (error) {
                alert('Error updating block status');
            }
        }
    };

    useEffect(() => {
        if (props.id !== undefined) {
            apiInstance
                .get(`/users/${props.id}`)
                .then((res) => {
                    setIsBlocked(res.data.blocked);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.id]);

    return (
        <div className={styles.iconWrapper} onClick={toggleBlockStatus}>
            <img
                className={styles.icon}
                src={
                    isBlocked === false
                        ? '/icons/iconButton/unblockUser.svg'
                        : '/icons/iconButton/blockUser.svg'
                }
                alt={isBlocked === true ? 'Unblock Icon' : 'Block Icon'}
            />
        </div>
    );
};

export default BlockIcon;
