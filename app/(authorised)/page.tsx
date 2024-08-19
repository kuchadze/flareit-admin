import Search from '../Components/Search/Search';
import styles from './page.module.scss';

export default function Home() {
    return (
        <main className={styles.main}>
            <Search />
        </main>
    );
}
