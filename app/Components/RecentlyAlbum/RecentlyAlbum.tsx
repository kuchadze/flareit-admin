import AlbumCard from '../AlbumCard/AlbumCard';

const RecentlyAlbum = () => {
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
    ];
    return (
        <>
            {data.map((item) => (
                <AlbumCard
                    key={item.id}
                    image={item.image}
                    albumName={item.albumName}
                    year={item.year}
                    artistName={item.artistName}
                    id={item.id}
                    pagePathName={''}
                />
            ))}
        </>
    );
};

export default RecentlyAlbum;
