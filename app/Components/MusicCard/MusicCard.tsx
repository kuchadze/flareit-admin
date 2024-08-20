import styles from './MusicCard.module.scss';

interface Props {
    image: string;
    title: string;
    teamName: string;
    id: number;
    index: number;
}

const MusicCard = (props: Props) => {
    return (
        <div className={styles.musicCard}>
            <div className={styles.musicCardHeader}>
                <div className={styles.musicCardhover}>
                    <img
                        className={styles.musicCardPhoto}
                        src={props.image}
                        alt="photo"
                    />
                </div>
                <div className={styles.musicCardTitle}>
                    <span className={styles.musicCardName}>{props.title}</span>
                    <span className={styles.musicCardTeam}>
                        {props.teamName}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MusicCard;
