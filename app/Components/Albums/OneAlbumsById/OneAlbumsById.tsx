'use client';
import { useEffect, useRef, useState } from 'react';
import AddButton from '../../AddButton/AddButton';
import styles from './OneAlbumsById.module.scss';
import Modal from '../../Modal/Modal';
import axios from 'axios';
import MusicCard from '../../MusicCard/MusicCard';
import AddMusic from '../../AddMusic/AddMusic';
import { useParams } from 'next/navigation';

interface Music {
    coverImgUrl: string;
    title: string;
    artistName: string;
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
    const [album, setAlbum] = useState<Album | null>(null);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const handleModalDone = () => {
        if (addMusicRef.current) {
            addMusicRef.current.submitForm();
        }
        setIsModalOpen(false);
    };

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios
                .get(`https://enigma-wtuc.onrender.com/albums/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setAlbum(res.data);
                    setMusics(res.data.musics);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }, [id, musics]);

    if (!album) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.albumCard}>
                    <p className={styles.albumTitle}>Albums</p>
                    <img
                        src={album.coverImgUrl}
                        className={styles.imageCont}
                        alt={album.title}
                    />
                    <div className={styles.albumDetails}>
                        <div className={styles.nameCont}>
                            <div className={styles.name}>
                                <p className={styles.albumArtist}>
                                    {album.title} -
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
                <div className={styles.musicCardContainer}>
                    <p className={styles.tenSong}>{musics.length} songs</p>
                    <div className={styles.musicCard}>
                        {musics.map((item, index) => (
                            <MusicCard
                                key={item.id}
                                image={item.coverImgUrl}
                                title={item.title}
                                artistName={item.artistName}
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
