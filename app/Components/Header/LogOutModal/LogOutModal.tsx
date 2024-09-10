import { useRouter } from 'next/navigation';
import styles from './LogOutModal.module.scss';
import { useEffect, useState } from 'react';
import { email } from '@/app/interfaces/interface';
import axios from 'axios';

interface Props {
    email: string;
    setLogOut: (e: boolean) => void;
    logOut: boolean;
}

const LogOutModal = (props: Props) => {
    const router = useRouter();
    const [emailList, setEmailList] = useState<email>();
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const handleLogout = (event: React.MouseEvent) => {
        event.stopPropagation();
        localStorage.removeItem('token');
        router.push('/auth');
    };
    useEffect(() => {
        if (token) {
            axios
                .get(`https://enigma-wtuc.onrender.com/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setEmailList(res.data);
                });
        }
    }, [token]);
    return (
        <>
            {props.logOut ? (
                <div
                    className={styles.logOutBackground}
                    onClick={() => {
                        props.setLogOut(!props.logOut);
                    }}
                >
                    <div className={styles.modalCont}>
                        <div className={styles.logOutModal}>
                            <div>
                                {emailList && (
                                    <span className={styles.color}>
                                        {emailList.email}
                                    </span>
                                )}
                            </div>
                            <div
                                className={styles.logOut}
                                onClick={handleLogout}
                            >
                                <img
                                    src="/images/LogOut.svg"
                                    alt="LogOutIcon"
                                />
                                <span className={styles.color}>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default LogOutModal;
