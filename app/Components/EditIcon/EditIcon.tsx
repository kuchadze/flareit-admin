import { useRef } from 'react';
import Modal from '../Modal/Modal';
import EditPlaylist from '../EditPlaylist/EditPlaylist';
import styles from './EditIcon.module.scss';
import { clickState } from '@/app/state';
import { useRecoilState } from 'recoil';
interface Props {
    id: number;
    value: string;
}

const EditIcon = (props: Props) => {
    const [click, setClick] = useRecoilState(clickState);
    const EditRef = useRef<{ submitForm: () => void }>(null);

    const handleModalDone = () => {
        if (EditRef.current) {
            EditRef.current.submitForm();
        }
        setClick(false);
    };

    return (
        <>
            <div
                onClick={() => {
                    setClick(!click);
                }}
            >
                <img
                    className={styles.icon}
                    src="/icons/iconButton/editButton.svg"
                    alt="Edit"
                />
            </div>
            {click && (
                <Modal
                    isOpen={click}
                    setIsModalOpen={setClick}
                    hasFooter={true}
                    title="Edit Playlist"
                    onDone={handleModalDone}
                    cancelText="Cancel"
                    confirmText="Done"
                >
                    <EditPlaylist
                        ref={EditRef}
                        id={props.id}
                        value={props.value}
                    />
                </Modal>
            )}
        </>
    );
};

export default EditIcon;
