import styles from './AddAlbumIcon.module.scss';
import { useRef, useState } from 'react';
import AddAlbum from '../AddAlbum/AddAlbum';
import Modal from '../Modal/Modal';

interface Props {
    src: string;
    id?: number;
}

const AddAlbumIcon = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addArtistRef = useRef<{
        submitForm: () => void;
        isInputEmpty: () => boolean;
    }>(null);

    const handleModalDone = () => {
        if (addArtistRef.current && !addArtistRef.current.isInputEmpty()) {
            addArtistRef.current.submitForm();
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className={styles.iconWrapper}
            >
                <img className={styles.icon} src={props.src} alt="Icon" />
            </div>
            <Modal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title="Add Album"
                hasFooter={true}
                cancelText="Cancel"
                confirmText="Done"
                onDone={handleModalDone}
            >
                <AddAlbum
                    ref={addArtistRef}
                    onDone={handleModalDone}
                    id={props.id}
                />
            </Modal>
        </>
    );
};

export default AddAlbumIcon;
