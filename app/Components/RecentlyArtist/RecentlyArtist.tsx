import { useEffect, useState } from 'react';
import ArtistCard from '../ArtistCard/ArtistCard';
import apiInstance from '@/app/ApiInstance';

interface Artist {
    id: number;
    coverImgUrl: string;
    artistName: string;
    releaseDate: string;
}

const RecentlyArtist = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        apiInstance
            .get('/authors/recent')
            .then((result) => {
                setArtists(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {artists.slice(0, 8).map((item) => (
                <ArtistCard
                    key={item.id}
                    image={item.coverImgUrl}
                    artist={item.artistName}
                    year={item.releaseDate}
                    id={item.id}
                />
            ))}
        </>
    );
};

export default RecentlyArtist;
