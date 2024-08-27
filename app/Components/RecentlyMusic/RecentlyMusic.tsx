import MusicCard from '../MusicCard/MusicCard';
import styles from './RecentlyMusic.module.scss';

const RecentlyMusic = () => {
    const data = [
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            teamName: 'Morgan Maxwell',
            id: 1,
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            teamName: 'Morgan Maxwell',
            id: 2,
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            teamName: 'Morgan Maxwell',
            id: 3,
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            teamName: 'Morgan Maxwell',
            id: 4,
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            teamName: 'Morgan Maxwell',
            id: 5,
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            teamName: 'Morgan Maxwell',
            id: 6,
        },
    ];

    return (
        <>
            {data.map((item, index) => (
                <MusicCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    teamName={item.teamName}
                    id={item.id}
                    delete={false}
                    index={index}
                />
            ))}
        </>
    );
};

export default RecentlyMusic;
