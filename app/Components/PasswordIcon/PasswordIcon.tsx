import React, { useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import ChangePassword from '../ChangePassword/ChangePassword';
import styles from './PasswordIcon.module.scss';

interface Props {
    id: number;
}

const PasswordIcon = (props: Props) => {
    const [modals, setModals] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [passwordLengthValid, setPasswordLengthValid] =
        useState<boolean>(true);
    const [, setValidationError] = useState<string | null>(null);
    const addMusicRef = useRef<{ submitForm: () => void }>(null);

    const handleModalDone = () => {
        if (addMusicRef.current) {
            addMusicRef.current.submitForm();
        }

        if (!passwordLengthValid || !isFormValid) {
            alert(
                'Please ensure all fields are valid and the password is at least 8 characters long',
            );
        } else {
            setModals(false);
            setValidationError(null);
        }
    };

    const handleSubmitStatus = (status: boolean) => {
        setIsFormValid(status);
    };

    const handlePasswordLengthCheck = (isValid: boolean) => {
        setPasswordLengthValid(isValid);
    };

    return (
        <>
            <div onClick={() => setModals(!modals)}>
                <img
                    className={styles.image}
                    src="/icons/iconButton/editButton.svg"
                    alt="Edit Password"
                />
            </div>
            <Modal
                isOpen={modals}
                setIsModalOpen={setModals}
                hasFooter={true}
                title="Change Password"
                onDone={handleModalDone}
                cancelText="Cancel"
                confirmText="Done"
            >
                <ChangePassword
                    ref={addMusicRef}
                    id={props.id}
                    onSubmitStatus={handleSubmitStatus}
                    onPasswordLengthCheck={handlePasswordLengthCheck}
                />
            </Modal>
        </>
    );
};

export default PasswordIcon;
