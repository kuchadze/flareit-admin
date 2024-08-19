import styles from './LogOutModal.module.scss';

interface Props {
    email: string;
    setLogOut: (e: boolean) => void;
    logOut: boolean;
}

const LogOutModal = (props: Props) => {
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
                            <div className={styles.logOut}>
                                <img
                                    src="/Images/LogOut.svg"
                                    alt="LogOutIcon"
                                />
                                <span className={styles.color}>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default LogOutModal;
