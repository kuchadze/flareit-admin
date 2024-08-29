'use client';
import { useEffect, useRef, useState } from 'react';
import AddButton from '../../AddButton/AddButton';
import styles from './OneAlbumsById.module.scss';
import Modal from '../../Modal/Modal';
import axios from 'axios';
import MusicCard from '../../MusicCard/MusicCard';
import AddMusic from '../../AddMusic/AddMusic';

interface Music {
    coverImgUrl: string;
    title: string;
    id: number;
}

interface Album {
    title: string;
    releaseDate: string;
    coverImgUrl: string;
    artistName: string;
    id: number;
    musics: Music[];
}

const OneAlbumsById = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addMusicRef = useRef<{ submitForm: () => void }>(null);
    const [musics, setMusics] = useState<Music[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    console.log(albums);

    const handleModalDone = () => {
        if (addMusicRef.current) {
            addMusicRef.current.submitForm();
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get(`https://enigma-wtuc.onrender.com/albums/25`).then((res) => {
            setAlbums(res.data.authors);
            setMusics(res.data.musics);
        });
    });
    console.log(albums, 'zd');

    return (
        <>
            <div className={styles.container}>
                {albums?.map((album) => (
                    <div key={album.id} className={styles.albumCard}>
                        <p className={styles.albumTitle}>{album.title}</p>
                        <img
                            src={album.coverImgUrl}
                            className={styles.imageCont}
                            alt={album.title}
                        />
                        <div className={styles.albumDetails}>
                            <div className={styles.nameCont}>
                                <div className={styles.name}>
                                    <p className={styles.albumArtist}>
                                        {album.artistName} -
                                    </p>
                                    <p className={styles.artistName}>
                                        {album.artistName}
                                    </p>
                                </div>
                                <span className={styles.year}>
                                    {album.releaseDate}
                                </span>
                            </div>

                            <AddButton
                                text={'Add Music'}
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                    </div>
                ))}
                <div className={styles.musicCardContainer}>
                    <p className={styles.tenSong}>10 songs</p>
                    <div className={styles.musicCard}>
                        {musics.map((item, index) => (
                            <MusicCard
                                key={item.id}
                                image={item.coverImgUrl}
                                title={item.title}
                                teamName={item.title}
                                id={item.id}
                                index={index}
                                delete={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    hasFooter={true}
                    title="Add Music"
                    onDone={handleModalDone}
                    cancelText={'Cancel'}
                    confirmText={'Done'}
                >
                    <AddMusic ref={addMusicRef} onDone={handleModalDone} />
                </Modal>
            )}
        </>
    );
};

export default OneAlbumsById;
