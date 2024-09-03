'use client';

import styles from './Header.module.scss';
import { useState } from 'react';
import Logo from '../Logo/Logo';
import LogOutWeb from '../LogOutWeb/LogOutWeb';
import Search from '../Search/Search';
import LogOutModal from './LogOutModal/LogOutModal';

const Header = () => {
    const [logOut, setLogOut] = useState(false);

    return (
        <div className={styles.headerContainerBox}>
            <div className={styles.headerContainer}>
                <div className={styles.headerSearchContainer}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <div className={styles.searchContainer}>
                        <Search />
                    </div>
                </div>
                <div
                    className={styles.headerLogOut}
                    onClick={() => {
                        setLogOut(!logOut);
                    }}
                >
                    <LogOutWeb
                        width={32}
                        height={32}
                        title={''}
                        src={'/images/LogOut.svg'}
                    />
                </div>
                <LogOutModal email={''} logOut={logOut} setLogOut={setLogOut} />
            </div>
        </div>
    );
};

export default Header;
