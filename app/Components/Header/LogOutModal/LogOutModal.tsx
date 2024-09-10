import { useRouter } from 'next/navigation';
import styles from './LogOutModal.module.scss';
import { useEffect, useState } from 'react';
import { email } from '@/app/interfaces/interface';
import Cookies from 'js-cookie';
import apiInstance from '@/app/ApiInstance';

interface Props {
    email: string;
    setLogOut: (e: boolean) => void;
    logOut: boolean;
}

const LogOutModal = (props: Props) => {
    const router = useRouter();
    const [emailList, setEmailList] = useState<email | null>(null);
    const token = Cookies.get('token');

    const handleLogout = async (event: React.MouseEvent) => {
        event.stopPropagation();
        Cookies.remove('token');
        await router.push('/auth');
    };

    useEffect(() => {
        if (token) {
            apiInstance
                .get('/users/me', {
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
