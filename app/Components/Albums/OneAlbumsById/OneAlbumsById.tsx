'use client';
import { useEffect, useRef, useState } from 'react';
import AddButton from '../../AddButton/AddButton';
import styles from './OneAlbumsById.module.scss';
import Modal from '../../Modal/Modal';
import MusicCard from '../../MusicCard/MusicCard';
import AddMusic from '../../AddMusic/AddMusic';
import { useParams } from 'next/navigation';
import apiInstance from '@/app/ApiInstance';
import { useRecoilState } from 'recoil';
import { clickState } from '@/app/state';
import Link from 'next/link';

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
    const addMusicRef = useRef<{
        submitForm: () => void;
        isInputEmpty: () => boolean;
    }>(null);
    const [musics, setMusics] = useState<Music[]>([]);
    const [album, setAlbum] = useState<Album | null>(null);
    const [click] = useRecoilState(clickState);

    const handleModalDone = () => {
        if (addMusicRef.current && !addMusicRef.current.isInputEmpty()) {
            addMusicRef.current.submitForm();
            setIsModalOpen(false);
        }
    };

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            apiInstance
                .get(`/albums/${id}`)
                .then((res) => {
                    setAlbum(res.data);
                    setMusics(res.data.musics);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }, [id, click]);

    if (!album) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.albumCard}>
                    <div className={styles.artisCont}>
                        <Link href={'/albums'} className={styles.artist}>
                            Albums
                        </Link>
                        <img src="/images/metia.svg" />
                        {album && (
                            <p className={styles.songs}>{album.artistName}</p>
                        )}
                    </div>
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
