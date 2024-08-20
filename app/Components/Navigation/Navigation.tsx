'use client';

import { useState } from 'react';
import styles from './Navigation.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import Logo from '../Logo/Logo';
import NavigationItem from './NavigationItem/NavigatonItem';
import { title } from 'process';

const Navigation = () => {
    const data = [
        { title: 'Home', href: '/', image: '/Images/Home.svg', key: '/' },
        {
            title: 'Artists',
            href: '/artists',
            image: '/Images/Artist.svg',
            key: '/artists',
        },
        {
            title: 'Albums',
            href: '/albums',
            image: '/Images/Albums.svg',
            key: '/albums',
        },
        {
            title: 'User management',
            href: '/usermanagement',
            image: '/images/userManagmant.svg',
            key: '/usermanagement',
        },
    ];

    const [isOpen, setIsOpen] = useState(false);

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
