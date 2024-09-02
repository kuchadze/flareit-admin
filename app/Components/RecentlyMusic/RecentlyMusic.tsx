import { useEffect, useState } from 'react';
import MusicCard from '../MusicCard/MusicCard';
import axios from 'axios';
import { Music } from '@/app/interfaces/interface';

const RecentlyMusic = () => {
    const [music, setMusic] = useState<Music[]>([]);

    useEffect(() => {
        axios
            .get('https://enigma-wtuc.onrender.com/musics/recent')
            .then((result) => {
                setMusic(result.data);
            })
            .catch((error) => {
                alert(error);
            });
    });

    return (
        <>
            {music.map((item, index) => (
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
