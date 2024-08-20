import MusicCard from '../MusicCard/MusicCard';
import styles from './RecentlyMusic.module.scss';

const RecentlyMusic = () => {
    const data = [
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            temeName: 'Morgan Maxwell',
            id: 1,
            src: '/Player/Disclosure.mp3',
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            temeName: 'Morgan Maxwell',
            id: 2,
            src: '/Player/FastCar.mp3',
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            temeName: 'Morgan Maxwell',
            id: 3,
            src: '/Player/Regard.mp3',
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            temeName: 'Morgan Maxwell',
            id: 4,
            src: '/Player/Mwaki.mp3',
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            temeName: 'Morgan Maxwell',
            id: 4,
            src: '/Player/Mwaki.mp3',
        },
        {
            image: '/images/MusicCard.png',
            title: 'Yellow',
            temeName: 'Morgan Maxwell',
            id: 4,
            src: '/Player/Mwaki.mp3',
        },
    ];
    return (
        <>
            {data.map((item, index) => (
                <MusicCard
                    image={item.image}
                    title={item.title}
                    teamName={item.temeName}
                    id={item.id}
                    index={index}
                />
            ))}
        </>
    );
};

export default RecentlyMusic;
