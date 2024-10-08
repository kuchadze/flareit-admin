import styles from './PlaylistInfo.module.scss';
import Image from 'next/image';

interface Props {
    image: string;
    title: string;
}

const PlaylistInfo = (props: Props) => {
    return (
        <div className={styles.container}>
            <Image
                src={props.image}
                width={40}
                height={40}
                alt="Playlist Photo"
            />
            <span className={styles.playlistName}>{props.title}</span>
        </div>
    );
};

export default PlaylistInfo;
