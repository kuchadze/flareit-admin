import Link from 'next/link';
import Image from 'next/image';
import styles from './SearchItemAlbum.module.scss';

interface Props {
    id: number;
    title: string | undefined;
    artistName: string;
    coverImgUrl: string;
    onClick: () => void;
}

const SearchItemAlbum = (props: Props) => {
    return (
        <Link
            key={props.id}
            className={styles.mapContainer}
            href={`/albums/${props.id}`}
            onClick={props.onClick}
        >
            <Image
                className={styles.square}
                src={props.coverImgUrl}
                width={24}
                height={24}
                alt="Icon"
            />
            <div className={styles.textContainer}>
                <span className={styles.searchAndMapText}>{props.title}</span>
                <span className={styles.searchAndMapText2}>
                    {props.artistName}
                </span>
            </div>
        </Link>
    );
};

export default SearchItemAlbum;
