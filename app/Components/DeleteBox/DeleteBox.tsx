import React from 'react';
import styles from './DeleteBox.module.scss';
import Modal from '../Modal/Modal';

interface Props {
    id: number;
    delete: boolean;
    setRemove: () => void;
    remove: boolean;
    onConfirm: () => void;
    width?: string;
    height?: string;
}

const DeleteBox = (props: Props) => {
    return (
        <>
            <img
                className={props.delete ? styles.deleteIcon : styles.none}
                key={props.id}
                src="/images/Delete.svg"
                alt="Delete"
                style={{
                    width: props.width,
                    height: props.height,
                    cursor: 'pointer',
                }}
                onClick={props.setRemove}
            />
            <Modal
                isOpen={props.remove}
                title="Are you sure?"
                setIsModalOpen={() => props.setRemove()}
                hasFooter={true}
                cancelText="Cancel"
                confirmText="Delete"
                onDone={props.onConfirm}
            ></Modal>
        </>
    );
};

export default DeleteBox;
