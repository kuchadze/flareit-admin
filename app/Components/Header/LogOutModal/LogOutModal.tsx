import { useRouter } from 'next/navigation';
import styles from './LogOutModal.module.scss';

interface Props {
    email: string;
    setLogOut: (e: boolean) => void;
    logOut: boolean;
}

const LogOutModal = (props: Props) => {
    const router = useRouter();

    const handleLogout = (event: React.MouseEvent) => {
        event.stopPropagation();
        localStorage.removeItem('token');
        router.push('/auth');
    };
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
                                <span className={styles.color}>
                                    {props.email}
                                </span>
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
