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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const pathname = usePathname();
    return (
        <div className={styles.mainNavigation}>
            <div className={styles.lineContainer}>
                <div className={styles.line} onClick={toggleMenu}>
                    <Image
                        width={40}
                        height={40}
                        src="/Image/Line.svg"
                        alt="Menu"
                    />
                </div>
            </div>
            <div
                className={`${styles.navigationContainer}  ${
                    isOpen ? styles.open : ''
                }`}
            >
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.navigation}>
                    <div className={styles.navigationLine}>
                        <Image
                            width={40}
                            height={40}
                            onClick={toggleMenu}
                            src="/Image/Line.svg"
                            alt="Menu"
                        />
                    </div>
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
                    {/* <div className={styles.logOutTablet}>
                        <LogOutTablet
                            onClick={logOut}
                            image={'Image/LogOutIcon.svg'}
                            title={'Log Out'}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
