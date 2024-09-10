import { useEffect, useState } from 'react';
import MusicCard from '../MusicCard/MusicCard';
import axios from 'axios';
import { Music } from '@/app/interfaces/interface';

const RecentlyMusic = () => {
    const [music, setMusic] = useState<Music[]>([]);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    useEffect(() => {
        axios
            .get('https://enigma-wtuc.onrender.com/musics/recent', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setMusic(result.data);
            })
            .catch(() => {
                alert('you are not Admin');
            });
    }, []);

    return (
        <>
            {music.slice(0, 6).map((item, index) => (
                <MusicCard
                    key={item.id}
                    image={item.coverImgUrl}
                    title={item.title}
                    artistName={item.artistName}
                    id={item.id}
                    delete={false}
                    index={index}
                />
            ))}
        </>
    );
};

export default RecentlyMusic;
