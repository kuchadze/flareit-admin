'use client';
import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.scss';
import Navigation from '../Components/Navigation/Navigation';
import Header from '../Components/Header/Header';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../Components/LoadingSppiner/LoadingSppiner';

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/auth');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (isAuthenticated === null) {
        return <LoadingSpinner />;
    }

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

export default Layout;
