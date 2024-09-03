import styles from './AddButton.module.scss';

interface Props {
    text: string;
    onClick: () => void;
}

const AddButton = (props: Props) => {
    return (
        <div className={styles.addButton} onClick={props.onClick}>
            <img src="/images/AddMusicIcon.svg" />
            <p className={styles.color}>{props.text}</p>
        </div>
    );
};

export default AddButton;
