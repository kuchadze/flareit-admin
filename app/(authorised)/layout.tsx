import { ReactNode } from 'react';
import styles from './layout.module.scss';
import Navigation from '../Components/Navigation/Navigation';
import Header from '../Components/Header/Header';

interface Props {
    children: ReactNode;
}

const layout = (props: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.navAndHeader}>
                    <Navigation />
                </div>
                <div className={styles.header}>
                    <Header />
                    <div className={styles.children}>{props.children}</div>
                </div>
            </div>
        </div>
    );
};

export default layout;
