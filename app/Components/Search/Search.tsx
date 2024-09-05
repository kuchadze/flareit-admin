'use client';

import React, { useState, useEffect } from 'react';
import styles from './Search.module.scss';
import axios from 'axios';
import SearchItemAuthor from './SearchItemAuthor/SearchItemAuthor';
import SearchItemMusic from './SearchItemMusic/SearchItemMusic';
import SearchItemAlbum from './SearchItemAlbum/SearchItemAlbum';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface ItemData {
    id: number;
    title?: string;
    coverImgUrl: string;
    artistName: string;
    lastName?: string;
    biography?: string;
    releaseDate?: string;
    audioUrl?: string;
    createdAt?: string;
    deletedAt?: string | null;
    playCount?: number;
    updatedAt?: string;
}

interface Item {
    data: ItemData;
    type: 'author' | 'music' | 'album';
}

const Search = () => {
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const pathname = usePathname();

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }
        try {
            const response = await axios.get(
                'https://enigma-wtuc.onrender.com/search',
                {
                    params: { searchField: searchTerm },
                },
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error during search', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    useEffect(() => {
        setSearchTerm('');
        setSearchResults([]);
    }, [pathname]);

    const handleItemClick = () => {
        setSearchTerm('');
    };

    const renderItemsByType = () => {
        return (
            <div className={styles.dataContainer}>
                {searchResults.map((item) => {
                    const { data, type } = item;
                    switch (type) {
                        case 'author':
                            return (
                                <SearchItemAuthor
                                    key={data.id}
                                    id={data.id}
                                    artistName={data.artistName}
                                    coverImgUrl={data.coverImgUrl}
                                    onClick={handleItemClick}
                                />
                            );
                        case 'music':
                            return (
                                <SearchItemMusic
                                    id={data.id}
                                    key={data.id}
                                    title={data.title}
                                    artistName={data.artistName}
                                    coverImgUrl={data.coverImgUrl}
                                    audioUrl={data.audioUrl}
                                />
                            );
                        case 'album':
                            return (
                                <SearchItemAlbum
                                    id={data.id}
                                    key={data.id}
                                    title={data.title}
                                    artistName={data.artistName}
                                    coverImgUrl={data.coverImgUrl}
                                    onClick={handleItemClick}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        );
    };

    return (
        <div className={styles.searchAndMap}>
            <div className={styles.searchInputContainer}>
                <div className={styles.inputContainer}>
                    <Image
                        src={
                            searchTerm
                                ? '/images/searchWhite.svg'
                                : '/images/searchGrey.svg'
                        }
                        alt="Search Icon"
                        width={24}
                        height={24}
                    />
                    <input
                        type="text"
                        className={styles.input}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="Search"
                    />
                </div>
                {searchTerm && (
                    <div className={styles.searchMapCont}>
                        {renderItemsByType()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
