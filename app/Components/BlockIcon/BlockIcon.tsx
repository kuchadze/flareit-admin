import axios from 'axios';
import styles from './BlockIcon.module.scss';
import { useEffect, useState } from 'react';

interface Props {
    id?: number;
}

const BlockIcon = (props: Props) => {
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const toggleBlockStatus = async () => {
        if (props.id !== undefined) {
            try {
                if (isBlocked) {
                    await axios.patch(
                        `https://enigma-wtuc.onrender.com/users/${props.id}/unblock`,
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    ),
                        [token];
                } else {
                    await axios.patch(
                        `https://enigma-wtuc.onrender.com/users/${props.id}/block`,
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    ),
                        [token];
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
                .get(`https://enigma-wtuc.onrender.com/users/${props.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
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
