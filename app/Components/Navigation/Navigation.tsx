'use client';

import { useState } from 'react';
import styles from './Navigation.module.scss';
import { usePathname } from 'next/navigation';
import Logo from '../Logo/Logo';
import NavigationItem from './NavigationItem/NavigatonItem';

const Navigation = () => {
    const data = [
        { title: 'Home', href: '/', image: '/images/Home.svg', key: '/' },
        {
            title: 'Artists',
            href: '/artists',
            image: '/images/Artist.svg',
            key: '/artists',
        },
        {
            title: 'Albums',
            href: '/albums',
            image: '/images/Albums.svg',
            key: '/albums',
        },
        {
            title: 'User management',
            href: '/usermanagement',
            image: '/images/UserManagmant.svg',
            key: '/usermanagement',
        },
    ];

    const [isOpen] = useState(false);

    const pathname = usePathname();
    return (
        <div className={styles.mainNavigation}>
            <div
                className={`${styles.navigationContainer}  ${
                    isOpen ? styles.open : ''
                }`}
            >
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.navigation}>
                    {data.map((item) => (
                        <NavigationItem
                            key={item.key}
                            image={item.image}
                            title={item.title}
                            href={item.href}
                            active={
                                item.key === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(item.key)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
