import { useState } from 'react';
import axios from 'axios';
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
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://enigma-wtuc.onrender.com/musics/${props.id}`);
            setIsDeleted(true);
        } catch (error) {
            alert(error)
        } finally {
            setShowModal(false);
        }
    };

    if (isDeleted) return null;

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
            <div onClick={() => setShowModal(true)}>
                <DeleteBox
                    id={props.id}
                    delete={props.delete}
                    setRemove={() => setShowModal(false)}
                    remove={showModal}
                    onConfirm={handleDelete}
                />
            </div>
        </div>
    );
};

export default MusicCard;

