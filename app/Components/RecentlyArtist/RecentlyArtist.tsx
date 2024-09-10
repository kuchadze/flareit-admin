import { useEffect, useState } from 'react';
import ArtistCard from '../ArtistCard/ArtistCard';
import axios from 'axios';

interface Artist {
    id: number;
    coverImgUrl: string;
    artistName: string;
    releaseDate: string;
}

const RecentlyArtist = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    useEffect(() => {
        axios
            .get('https://enigma-wtuc.onrender.com/authors/recent', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
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
