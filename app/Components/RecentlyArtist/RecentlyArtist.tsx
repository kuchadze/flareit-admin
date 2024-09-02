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

    useEffect(() => {
        axios
            .get('https://enigma-wtuc.onrender.com/authors/recent')
            .then((result) => {
                setArtists(result.data);
            })
            .catch((error) => {
                alert(error);
            });
    });

    return (
        <>
            {artists.map((item) => (
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
