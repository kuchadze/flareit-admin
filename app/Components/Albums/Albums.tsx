import AlbumCard from '../AlbumCard/AlbumCard';
import styles from './Albums.module.scss';

const Albums = () => {
    const data = [
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 1,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 2,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 3,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 4,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 1,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 2,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 3,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 4,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 1,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 2,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 3,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 4,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 1,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 2,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 3,
        },
        {
            image: '/images/albumCover.svg',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 4,
        },
    ];
    return (
        <div className={styles.container}>

                <p className={styles.albums}>Albums</p>
            <div className={styles.albumCard}>
                {data.map((item) => (
                    <AlbumCard
                        image={item.image}
                        albumName={item.albumName}
                        year={item.year}
                        artistName={item.artistName}
                        id={item.id}
                        pagePathName={''}
                    />
                ))}
            </div>
        </div>
    );
};

export default Albums;
