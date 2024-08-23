'use client';
import { useEffect, useRef, useState } from 'react';
import AddButton from '../../AddButton/AddButton';
import styles from './OneAlbumsById.module.scss';
import Modal from '../../Modal/Modal';
import AddAlbum from '../../AddAlbum/AddAlbum';
import axios from 'axios';
import MusicCard from '../../MusicCard/MusicCard';

interface Music {
    coverImgUrl: string;
    title: string;
    id: number;
}

const OneAlbumsById = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addArtistRef = useRef<{ submitForm: () => void }>(null);
    const [music, setMusic] = useState<Music[]>([]);
    const handleModalDone = () => {
        if (addArtistRef.current) {
            addArtistRef.current.submitForm();
        }
        setIsModalOpen(false);
    };

    const data = [
        {
            image: '/images/Image.png',
            albumName: 'Havana',
            year: '1998',
            artistName: 'Camila Cabello',
            id: 1,
        },
    ];

    useEffect(() => {
        axios
            .get('https://enigma-wtuc.onrender.com/musics')
            .then((result) => {
                setMusic(result.data);
            })
            .catch((error) => {
                console.error('Error fetching music data:', error);
            });
    }, []);

    return (
        <>
            <div className={styles.container}>
                {data.map((item) => (
                    <div key={item.id} className={styles.albumCard}>
                        <p className={styles.albums}>Albums</p>
                        <img
                            src={item.image}
                            alt={`Cover of album ${item.albumName}`}
                            className={styles.imageCont}
                        />
                        <div className={styles.albumDetails}>
                            <div className={styles.naemCont}>
                                <div className={styles.name}>
                                    <p className={styles.albumName}>
                                        {item.albumName}-
                                    </p>
                                    <p className={styles.artistName}>
                                        {item.artistName}
                                    </p>
                                </div>
                                <span className={styles.year}>{item.year}</span>
                            </div>

                            <AddButton
                                text={'Add Music'}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                            />
                        </div>
                    </div>
                ))}
                <div className={styles.musicCardContainer}>
                    <p className={styles.tenSong}>10 songs</p>
                    <div className={styles.musicCard}>
                        {music.map((item, index) => (
                            <MusicCard
                                image={item.coverImgUrl}
                                title={item.title}
                                teamName={item.title}
                                id={item.id}
                                index={index}
                                key={item.id}
                                delete={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    children={
                        <AddAlbum ref={addArtistRef} onDone={handleModalDone} />
                    }
                    hasFooter={true}
                    title="Add Music"
                    onDone={handleModalDone}
                    cancelText={'cancle'}
                    confirmText={'done'}
                />
            )}
        </>
    );
};

export default OneAlbumsById;
