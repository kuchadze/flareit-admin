import styles from './AlbumCard.module.scss';
import Link from 'next/link';

interface Props {
    image: string;
    albumName: string;
    year: string;
    artistName: string;
    id: number;
    pagePathName: string;
}

const AlbumCard = (props: Props) => {
    return (
        <Link href={`/albums/${props.id}`} className={styles.link}>
            <div className={styles.container}>
                <div className={styles.coverContainer}>
                    <img
                        className={styles.image}
                        src={props.image}
                        alt="Album Cover"
                    />
                </div>
                <div>
                    <div className={styles.infoContainer}>
                        <h4 className={styles.albumName}>{props.albumName}</h4>
                        <span className={styles.albumText}>{props.year}</span>
                    </div>
                    <div>
                        <span className={styles.artistName}>
                            {props.artistName}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AlbumCard;
