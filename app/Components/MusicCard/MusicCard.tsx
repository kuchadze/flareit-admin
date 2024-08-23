import DeleteBox from '../DeleteBox/DeleteBox';
import styles from './MusicCard.module.scss';

interface Props {
    image: string;
    title: string;
    teamName: string;
    id: number;
    index: number;
    delete: boolean;
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
            <div>
                <DeleteBox id={0} delete={props.delete} />
            </div>
        </div>
    );
};

export default MusicCard;
