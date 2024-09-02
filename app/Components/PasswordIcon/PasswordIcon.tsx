import React, { useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import ChangePassword from '../ChangePassword/ChangePassword';
import styles from './PasswordIcon.module.scss';

interface Props {
    id: number;
}

const PasswordIcon: React.FC<Props> = ({ id }) => {
    const [modals, setModals] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(true); // Track form submission status
    const [passwordLengthValid, setPasswordLengthValid] =
        useState<boolean>(true); // Track password length validity
    const addMusicRef = useRef<{ submitForm: () => void }>(null);

    const handleModalDone = () => {
        if (addMusicRef.current) {
            addMusicRef.current.submitForm();
        }

        // Check if the password length is valid
        if (passwordLengthValid && isFormValid) {
            setModals(false);
        } else {
            // Optionally, show a specific message to the user
            alert(
                'Please ensure all fields are valid and the password is at least 8 characters long.',
            );
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
                    id={id}
                    onSubmitStatus={handleSubmitStatus}
                    onPasswordLengthCheck={handlePasswordLengthCheck} // Add this prop
                />
            </Modal>
        </>
    );
};

export default PasswordIcon;
