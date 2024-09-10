import { useEffect, useState } from 'react';
import AlbumCard from '../AlbumCard/AlbumCard';
import { Album } from '@/app/interfaces/interface';
import apiInstance from '@/app/ApiInstance';

const RecentlyAlbum = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        apiInstance
            .get('/albums/recent')
            .then((res) => {
                setAlbums(res.data);
            })
            .catch((err) => {
                console.log(err);
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
