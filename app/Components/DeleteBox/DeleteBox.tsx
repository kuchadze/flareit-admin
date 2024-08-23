import styles from './DeleteBox.module.scss';

interface Props {
    id: number;
    delete: boolean;
}

const DeleteBox = (props: Props) => {
    return (
        <>
            <img
                className={props.delete ? styles.none : ''}
                key={props.id}
                src="/images/Delete.svg"
                alt="Delete"
            />
        </>
    );
};

export default DeleteBox;
