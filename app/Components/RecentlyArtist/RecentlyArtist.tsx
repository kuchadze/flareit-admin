import ArtistCard from '../ArtistCard/ArtistCard';
import styles from './RecentlyArtist.module.scss';

const RecentlyArtist = () => {
    const data = [
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 0,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 1,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 2,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 3,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 4,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 5,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 6,
        },
        {
            image: '/images/artistCard.svg',
            artist: 'coldplay',
            year: '1997',
            id: 7,
        },
    ];
    return (
        <>
            {data.map((item) => (
                <ArtistCard
                    key={item.id}
                    image={item.image}
                    artist={item.artist}
                    year={item.year}
                    id={item.id}
                />
            ))}
        </>
    );
};

export default RecentlyArtist;
