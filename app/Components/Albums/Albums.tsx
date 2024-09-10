'use client';

import { useEffect, useState } from 'react';
import AlbumCard from '../AlbumCard/AlbumCard';
import styles from './Albums.module.scss';
import { Album } from '@/app/interfaces/interface';
import apiInstance from '@/app/ApiInstance';

const Albums = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        apiInstance
            .get('/albums')
            .then((res) => {
                setAlbums(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className={styles.container}>
            <p className={styles.albums}>Albums</p>
            <div className={styles.albumCard}>
                {albums.map((item) => (
                    <AlbumCard
                        key={item.id}
                        image={item.coverImgUrl}
                        albumName={item.title}
                        year={item.releaseDate}
                        artistName={item.artistName}
                        id={item.id}
                        pagePathName={`albums/${item.id}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Albums;
