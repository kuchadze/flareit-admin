import ArtistCard from '../Components/ArtistCard/ArtistCard';
import styles from './page.module.scss';

export default function Home() {
    return (
        <main className={styles.main}>
            <ArtistCard
                image={'/images/artistCard.svg'}
                artist={'coldplay'}
                year={'1900'}
                id={1}
            />
        </main>
    );
}
