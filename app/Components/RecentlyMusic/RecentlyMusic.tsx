import { useEffect, useState } from 'react';
import MusicCard from '../MusicCard/MusicCard';
import { Music } from '@/app/interfaces/interface';
import apiInstance from '@/app/ApiInstance';

const RecentlyMusic = () => {
    const [music, setMusic] = useState<Music[]>([]);

    useEffect(() => {
        apiInstance
            .get('/musics/recent')
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
