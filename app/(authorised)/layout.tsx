'use client';
import { ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.scss';
import Navigation from '../Components/Navigation/Navigation';
import Header from '../Components/Header/Header';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../Components/LoadingSppiner/LoadingSppiner';
import apiInstance from '../ApiInstance';

interface Props {
    children: ReactNode;
}

const Layout = (props: Props) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            apiInstance
                .get('/users/me')
                .then((result) => {
                    setIsAdmin(result.data.isAdmin);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    router.replace('/auth');
                });
        } else {
            setIsAuthenticated(false);
            router.replace('/auth');
        }
    }, [router]);

    useEffect(() => {
        if (isAuthenticated === false || isAdmin === false) {
            router.replace('/auth');
        }
    }, [isAdmin, isAuthenticated, router]);

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
