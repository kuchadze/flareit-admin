import styles from '@/app/Components/ArtistInfo/ArtistInfo.module.scss';
import Image from 'next/image';

interface Props {
    image: string;
    artistName: string;
}

const ArtistInfo = (props: Props) => {
    return (
        <div className={styles.container}>
            <Image
                src={props.image}
                width={40}
                height={40}
                alt="Artist Photo"
                className={styles.image}
            />
            <span className={styles.artistName}>{props.artistName}</span>
        </div>
    );
};

export default ArtistInfo;
