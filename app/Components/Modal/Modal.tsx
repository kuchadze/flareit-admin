import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import Image from 'next/image';
import Button from '../Button/Button';

interface Props {
    isOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    title?: string;
    onDone?: () => void;
    children?: ReactNode;
    hasFooter: boolean;
    cancelText: string;
    confirmText: string;
}

const Modal = (props: Props) => {
    const onClose = () => {
        props.setIsModalOpen(false);
    };

    const onConfirm = () => {
        if (props.onDone) {
            props.onDone();
        }
        onClose();
    };

    return (
        <div
            className={
                props.isOpen ? styles.modalOverlay : styles.modalOverlayClosed
            }
        >
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h4 className={styles.sectionTitle}>{props.title}</h4>
                    <div
                        className={styles.closeButtonWrapper}
                        onClick={onClose}
                    >
                        <Image
                            src={'/images/closeButton.svg'}
                            width={24}
                            height={24}
                            alt="Close Button"
                        />
                    </div>
                </div>
                <div className={styles.content}>{props.children}</div>
                {props.hasFooter && (
                    <div className={styles.buttonsContainer}>
                        <Button
                            primary={false}
                            text={props.cancelText}
                            onClick={onClose}
                        />
                        {props.onDone && (
                            <Button
                                primary={true}
                                text={props.confirmText}
                                onClick={onConfirm}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
