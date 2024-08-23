'use client';

import { useState, useRef } from 'react';
import Modal from '../Components/Modal/Modal';
import RecentlyAlbum from '../Components/RecentlyAlbum/RecentlyAlbum';
import RecentlyArtist from '../Components/RecentlyArtist/RecentlyArtist';
import RecentlyMusic from '../Components/RecentlyMusic/RecentlyMusic';
import styles from './page.module.scss';
import AddArtist from '../Components/AddArtist/AddArtist';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added music</p>
                <div className={styles.hitsContainer}>
                    <RecentlyMusic />
                </div>
            </div>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added artist</p>
                <div className={styles.artistContainer}>
                    <RecentlyArtist />
                </div>
            </div>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added Album</p>
                <div className={styles.albumContainer}>
                    <RecentlyAlbum />
                </div>
            </div>
        </main>
    );
}
