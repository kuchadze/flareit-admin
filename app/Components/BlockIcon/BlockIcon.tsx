import axios from 'axios';
import styles from './BlockIcon.module.scss';
import { useEffect, useState } from 'react';

interface Props {
    id?: number;
}

const BlockIcon = (props: Props) => {
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

    const toggleBlockStatus = async () => {
        if (props.id !== undefined) {
            try {
                if (isBlocked) {
                    await axios.patch(
                        `https://enigma-wtuc.onrender.com/users/${props.id}/unblock`,
                    );
                } else {
                    await axios.patch(
                        `https://enigma-wtuc.onrender.com/users/${props.id}/block`,
                    );
                }
                setIsBlocked((prev) => !prev);
            } catch (error) {
                alert('Error updating block status');
            }
        }
    };

    useEffect(() => {
        if (props.id !== undefined) {
            axios
                .get(`https://enigma-wtuc.onrender.com/users/${props.id}`)
                .then((res) => {
                    setIsBlocked(res.data.blocked);
                })
                .catch((error) => {
                    alert(error);
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
