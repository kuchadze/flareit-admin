'use client';

import React, { useState } from 'react';
import styles from './Search.module.scss';
import SearchList from './SearchList/SearchList';

interface Item {
    id: number;
    word: string;
    search_count: number;
    last_searched: string;
    icon: string;
    type: 'album' | 'artist';
}

const Search = () => {
    const data: Item[] = [
        {
            id: 1,
            word: 'programming3',
            search_count: 10,
            last_searched: '2023-07-06',
            icon: '/Images/square.svg',
            type: 'album',
        },
        {
            id: 2,
            word: 'programming4',
            search_count: 10,
            last_searched: '2023-07-06',
            icon: '/Images/square.svg',
            type: 'album',
        },
        {
            id: 3,
            word: 'programming5',
            search_count: 10,
            last_searched: '2023-07-06',
            icon: '/Images/square2.svg',
            type: 'artist',
        },
        {
            id: 4,
            word: 'programming6',
            search_count: 10,
            last_searched: '2023-07-06',
            icon: '/Images/square2.svg',
            type: 'artist',
        },
    ];

    const [search, setSearch] = useState('');

    const renderItemsByType = () => {
        const sortData = data.sort((a, b) => {
            if (a.type === 'album' && b.type !== 'album') {
                return -1;
            } else {
                return 1;
            }
        });
        return (
            <div className={styles.dataContainer}>
                {sortData.map((item) => (
                    <SearchList key={item.id} item={item} />
                ))}
            </div>
        );
    };

    return (
        <div className={styles.searchAndMap}>
            <div className={styles.searchInputContainer}>
                <div className={styles.inputContainer}>
                    <img
                        src={
                            search
                                ? '/Images/searchWhite.svg'
                                : '/Images/searchGrey.svg'
                        }
                        alt="Search Icon"
                    />
                    <input
                        type="text"
                        className={styles.input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        placeholder="Search"
                    />
                </div>
                {search && (
                    <div className={styles.searchMapCont}>
                        {renderItemsByType()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
