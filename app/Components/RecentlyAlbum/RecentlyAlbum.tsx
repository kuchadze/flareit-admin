import { useEffect, useState } from 'react';
import AlbumCard from '../AlbumCard/AlbumCard';
import axios from 'axios';
import { Album } from '@/app/interfaces/interface';

const RecentlyAlbum = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    useEffect(() => {
        axios
            .get('https://enigma-wtuc.onrender.com/albums/recent', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAlbums(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    return (
        <>
            {albums.slice(0, 8).map((item) => (
                <AlbumCard
                    key={item.id}
                    image={item.coverImgUrl}
                    albumName={item.title}
                    year={item.releaseDate}
                    artistName={item.artistName}
                    id={item.id}
                    pagePathName={''}
                />
            ))}
        </>
    );
};

export default RecentlyAlbum;
