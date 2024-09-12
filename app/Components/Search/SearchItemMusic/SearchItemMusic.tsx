import Image from 'next/image';
import styles from './SearchItemMusic.module.scss';

interface Props {
    id: number;
    title: string | undefined;
    artistName: string;
    coverImgUrl: string;
    audioUrl: string | undefined;
}

const SearchItemMusic = (props: Props) => {
    return (
        <div className={styles.mapContainer}>
            <Image
                className={styles.square}
                src={props.coverImgUrl}
                width={24}
                height={24}
                alt="Icon"
            />
            <div className={styles.textContainer}>
                <span className={styles.searchAndMapText}>{props.title}</span>
                <div className={styles.searchAndMapText2}>
                    <span>{props.artistName}</span>
                    <span className={styles.type}>~Song</span>
                </div>
            </div>
        </div>
    );
};

export default SearchItemMusic;
