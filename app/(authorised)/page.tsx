'use client';
import RecentlyAlbum from '../Components/RecentlyAlbum/RecentlyAlbum';
import RecentlyArtist from '../Components/RecentlyArtist/RecentlyArtist';
import RecentlyMusic from '../Components/RecentlyMusic/RecentlyMusic';
import styles from './page.module.scss';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added music</p>
                <div className={styles.hitsContainer}>
                    <RecentlyMusic />
                </div>
            </div>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added artists</p>
                <div className={styles.artistContainer}>
                    <RecentlyArtist />
                </div>
            </div>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added Albums</p>
                <div className={styles.albumContainer}>
                    <RecentlyAlbum />
                </div>
            </div>
        </main>
    );
}
