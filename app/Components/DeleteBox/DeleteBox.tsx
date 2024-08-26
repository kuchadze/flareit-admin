import styles from './DeleteBox.module.scss';
import Modal from '../Modal/Modal';

interface Props {
    id: number;
    delete: boolean;
    setRemove: () => void;
    remove: boolean;
    onConfirm: () => void;
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
            {props.remove && (
                <Modal
                    isOpen={props.remove}
                    title="Are you sure?"
                    setIsModalOpen={props.setRemove}
                    hasFooter={true}
                    cancelText="Cancel"
                    confirmText="Delete"
                    onDone={props.onConfirm}
                    children={null}
                />
            )}
        </>
    );
};

export default DeleteBox;
