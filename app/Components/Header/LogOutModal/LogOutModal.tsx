import { useRouter } from 'next/navigation';
import styles from './LogOutModal.module.scss';
import { useEffect, useState } from 'react';
import { email } from '@/app/interfaces/interface';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Props {
    email: string;
    setLogOut: (e: boolean) => void;
    logOut: boolean;
}

const LogOutModal = (props: Props) => {
    const router = useRouter();
    const [emailList, setEmailList] = useState<email | null>(null);
    const token = Cookies.get('token'); // Get token using js-cookie

    const handleLogout = async (event: React.MouseEvent) => {
        event.stopPropagation();
        Cookies.remove('token'); // Remove token using js-cookie
        await router.push('/auth'); // Redirect after removing token
    };

    useEffect(() => {
        if (token) {
            axios
                .get('https://enigma-wtuc.onrender.com/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setEmailList(res.data);
                })
                .catch((err) => {
                    console.error('Error fetching user data:', err);
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
