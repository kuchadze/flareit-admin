import styles from '@/app/Components/ArtistInfo/ArtistInfo.module.scss';
import Image from 'next/image';

interface Props {
    image: string;
    artistName: string;
}

const ArtistInfo = ({ image, artistName }: Props) => {
    return (
        <div className={styles.container}>
            <Image
                src={image}
                width={40}
                height={40}
                alt="Artist Photo"
                className={styles.image}
            />
            <div className={styles.info}>
                <span className={styles.artistName}>{artistName}</span>
            </div>
        </div>
    );
};

export default ArtistInfo;
