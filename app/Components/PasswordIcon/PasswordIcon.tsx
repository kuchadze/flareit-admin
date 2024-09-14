import React, { useRef, useState, useCallback } from 'react';
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
    const [inputValuesFilled, setInputValuesFilled] = useState<boolean>(false);
    const [, setValidationError] = useState<string | null>(null);
    const addMusicRef = useRef<{ submitForm: () => void }>(null);

    const handleModalDone = useCallback(() => {
        if (addMusicRef.current) {
            addMusicRef.current.submitForm();
        }

        if (!inputValuesFilled) {
            alert('Please fill in all required fields.');
            return; // Prevent modal from closing
        }

        if (!passwordLengthValid || !isFormValid) {
            alert(
                'Please ensure all fields are valid and the password is at least 8 characters long',
            );
            return; // Prevent modal from closing
        }

        // Close modal only if all conditions are met
        setModals(false);
        setValidationError(null);
    }, [inputValuesFilled, isFormValid, passwordLengthValid]);

    const handleSubmitStatus = (status: boolean) => {
        setIsFormValid(status);
    };

    const handlePasswordLengthCheck = (isValid: boolean) => {
        setPasswordLengthValid(isValid);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const password = e.target.name === 'password' ? value : '';
        const confirmPassword =
            e.target.name === 'confirmPassword' ? value : '';

        const areInputsFilled =
            (password.trim() !== '' && confirmPassword.trim() !== '') ||
            (password.trim() !== '' && e.target.name === 'password') ||
            (confirmPassword.trim() !== '' &&
                e.target.name === 'confirmPassword');

        setInputValuesFilled(areInputsFilled);
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
                    onPasswordLengthCheck={handlePasswordLengthCheck} // Corrected usage
                    onInputChange={handleInputChange}
                />
            </Modal>
        </>
    );
};

export default PasswordIcon;
