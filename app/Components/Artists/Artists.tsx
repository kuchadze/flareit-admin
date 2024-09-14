'use client';
import { useRef, useState } from 'react';
import AddButton from '../AddButton/AddButton';
import styles from './Artists.module.scss';
import Modal from '../Modal/Modal';
import AddArtist from '../AddArtist/AddArtist';
import ArtistsTable from '../ArtistsTable/ArtistsTable';

const Artist = () => {
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
            <div className={styles.artostPage}>
                <div className={styles.addbutton}>
                    <AddButton
                        text={'Add Artist'}
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    />
                </div>
                <div className={styles.artistPadd}>
                    <span className={styles.artistsTitle}>all artists</span>
                    <ArtistsTable />
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    title="Add Artist"
                    hasFooter={true}
                    cancelText={'cancel'}
                    confirmText={'done'}
                    onDone={handleModalDone}
                >
                    <AddArtist ref={addArtistRef} onDone={handleModalDone} />
                </Modal>
            )}
        </>
    );
};

export default Artist;
