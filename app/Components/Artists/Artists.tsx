import { useRef, useState } from 'react';
import AddButton from '../AddButton/AddButton';
import styles from './Artists.module.scss';
import Modal from '../Modal/Modal';
import AddArtist from '../AddArtist/AddArtist';

const Artist = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addArtistRef = useRef<{ submitForm: () => void }>(null);

    const handleModalDone = () => {
        if (addArtistRef.current) {
            addArtistRef.current.submitForm();
        }
        setIsModalOpen(false)
    };

    return (
        <>
            <div className={styles.artostPage}>
                <div className={styles.addbutton}>
                    <AddButton
                        text={'Add Artist'}
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    />
                </div>
                <div></div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    title='Add Artist'
                    children={<AddArtist ref={addArtistRef} onDone={handleModalDone}/>}
                    hasFooter={true}
                    cancelText={'cancle'}
                    confirmText={'done'}
                    onDone={handleModalDone}
                />
            )}
        </>
    );
};

export default Artist;
