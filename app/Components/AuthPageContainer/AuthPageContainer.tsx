'use client';

import styles from './AuthPageContainer.module.scss';
import AuthForm from '../AuthForm/AuthForm';

const AuthPageContainer = () => {
    return (
        <div className={styles.authPage}>
            <video className={styles.backgroundVideo} autoPlay muted loop>
                <source src="/images/authBlue.mp4" />
            </video>
            <div className={styles.container}>
                <div className={styles.authPageContaiener}>
                    <div className={styles.flareIt}>
                        <img
                            className={styles.flareItPhoto}
                            src="/images/authFlareIt.svg"
                            alt="Flare It"
                        />
                    </div>
                    <AuthForm />
                </div>
            </div>
        </div>
    );
};

export default AuthPageContainer;
