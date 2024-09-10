'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';
import SearchItemAuthor from './SearchItemAuthor/SearchItemAuthor';
import SearchItemMusic from './SearchItemMusic/SearchItemMusic';
import SearchItemAlbum from './SearchItemAlbum/SearchItemAlbum';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Item } from '../../interfaces/searchInterfaces';
import { useDebounce } from '../../helpers/useDebounce';
import { processAndSortSearchResults } from '../../helpers/processSearchResults';
import { SearchTypeEnum } from '../../enums/searchTypes.enum';
import apiInstance from '@/app/ApiInstance';

const Search = () => {
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setSearchTerm('');
                setSearchResults([]);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            if (!debouncedSearchTerm.trim()) {
                setSearchResults([]);
                return;
            }

            try {
                setSearchResults([]);

                const { data } = await apiInstance.get('/search', {
                    params: { searchField: debouncedSearchTerm },
                });

                const sortedResults = processAndSortSearchResults(data);
                setSearchResults(sortedResults);
            } catch (error) {
                console.error('Error during search', error);
            }
        };

        handleSearch();
    }, [debouncedSearchTerm, pathname]);

    const handleItemClick = () => setSearchTerm('');

    const renderItemsByType = () => (
        <div className={styles.dataContainer}>
            {searchResults.map(({ data, type }) => {
                const commonProps = {
                    id: data.id,
                    artistName: data.artistName,
                    coverImgUrl: data.coverImgUrl,
                    onClick: handleItemClick,
                };

                switch (type) {
                    case SearchTypeEnum.Author:
                        return (
                            <SearchItemAuthor key={data.id} {...commonProps} />
                        );
                    case SearchTypeEnum.Music:
                        return (
                            <SearchItemMusic
                                key={data.id}
                                {...commonProps}
                                title={data.title}
                                audioUrl={data.audioUrl}
                            />
                        );
                    case SearchTypeEnum.Album:
                        return (
                            <SearchItemAlbum
                                key={data.id}
                                {...commonProps}
                                title={data.title}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );

    return (
        <div className={styles.searchAndMap} ref={searchRef}>
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
