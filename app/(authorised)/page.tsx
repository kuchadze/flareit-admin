'use client';

// import { useState } from 'react';
// import Modal from '../Components/Modal/Modal';
// import RecentlyAlbum from '../Components/RecentlyAlbum/RecentlyAlbum';
// import RecentlyArtist from '../Components/RecentlyArtist/RecentlyArtist';
// import RecentlyMusic from '../Components/RecentlyMusic/RecentlyMusic';
// import styles from './page.module.scss';
// import AddArtist from '../Components/AddArtist/AddArtist';

// export default function Home() {
//     const [click, setClick] = useState(false);
//     return (
//         <main className={styles.main}>
//             <div className={styles.sectionHeader}>
//                 <p className={styles.musicContainer}>Recently add music</p>
//                 <div
//                     className={styles.hitsContainer}
//                     onClick={() => setClick(!click)}
//                 >
//                     <RecentlyMusic />
//                 </div>
//             </div>
//             <div className={styles.sectionHeader}>
//                 <p className={styles.musicContainer}>Recently add artist</p>
//                 <div className={styles.artistContainer}>
//                     <RecentlyArtist />
//                 </div>
//             </div>
//             <div className={styles.sectionHeader}>
//                 <p className={styles.musicContainer}>Recently add Album</p>
//                 <div className={styles.albumContainer}>
//                     <RecentlyAlbum />
//                 </div>
//             </div>
//             {click && (
//                 <Modal
//                     isOpen={click}
//                     setIsModalOpen={() => setClick(!click)}
//                     children={<AddArtist />}
//                     hasFooter={true}
//                     onDone={() => {}}
//                     cancelText={'cancle'}
//                     confirmText={'done'}
//                 />
//             )}
//         </main>
//     );
// }

import { useState, useRef } from 'react';
import Modal from '../Components/Modal/Modal';
import RecentlyAlbum from '../Components/RecentlyAlbum/RecentlyAlbum';
import RecentlyArtist from '../Components/RecentlyArtist/RecentlyArtist';
import RecentlyMusic from '../Components/RecentlyMusic/RecentlyMusic';
import styles from './page.module.scss';
import AddArtist from '../Components/AddArtist/AddArtist';
import React from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addArtistRef = useRef<{ submitForm: () => void }>(null);

    const handleModalDone = () => {
        if (addArtistRef.current) {
            addArtistRef.current.submitForm();
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added music</p>
                <div
                    className={styles.hitsContainer}
                    onClick={() => setIsModalOpen(true)}
                >
                    <RecentlyMusic />
                </div>
            </div>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added artist</p>
                <div className={styles.artistContainer}>
                    <RecentlyArtist />
                </div>
            </div>
            <div className={styles.sectionHeader}>
                <p className={styles.musicContainer}>Recently added Album</p>
                <div className={styles.albumContainer}>
                    <RecentlyAlbum />
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    children={
                        <AddArtist
                            ref={addArtistRef}
                            onDone={handleModalDone}
                        />
                    }
                    hasFooter={true}
                    cancelText={'Cancel'}
                    confirmText={'Done'}
                    onDone={handleModalDone}
                />
            )}
        </main>
    );
}
