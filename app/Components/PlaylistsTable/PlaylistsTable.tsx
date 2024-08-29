'use client';

import { Table } from 'antd';
import styles from './PlaylistsTable.module.scss';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import IconButton from '../IconButton/IconButton';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteBox from '../DeleteBox/DeleteBox';

interface Playlist {
    id: number;
    name: string;
    songs: number;
    imageSrc: string;
}

const PlaylistsTable = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [showModal, setShowModal] = useState<number | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const result = await axios.get(
                    'https://enigma-wtuc.onrender.com/playlists',
                );
                setPlaylists(result.data);
            } catch (error) {
                alert('Error fetching playlists');
            }
        };

        fetchPlaylists();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(
                `https://enigma-wtuc.onrender.com/playlists/${id}`,
            );
            setPlaylists((prevPlaylists) =>
                prevPlaylists.filter((playlist) => playlist.id !== id),
            );
        } catch (error) {
            alert('Error deleting playlist');
        } finally {
            setShowModal(null);
        }
    };

    const columns: ColumnsType<Playlist> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (name: string, record: Playlist) => (
                <PlaylistInfo
                    image={record.imageSrc || '/images/playlistImage.png'}
                    playlistName={name}
                />
            ),
        },
        {
            title: 'Songs',
            dataIndex: 'songs',
            key: 'songs',
        },
        {
            title: '',
            dataIndex: 'buttons',
            key: 'buttons',
            align: 'right',
            width: '100px',
            render: (text: string, record: Playlist) => (
                <div className={styles.buttons}>
                    <IconButton src={'/icons/iconButton/editButton.svg'} />
                    <DeleteBox
                        id={record.id}
                        delete={true}
                        setRemove={() =>
                            setShowModal(
                                showModal === record.id ? null : record.id,
                            )
                        }
                        remove={showModal === record.id}
                        onConfirm={() => handleDelete(record.id)}
                        height="32px"
                        width="32px"
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={playlists}
                pagination={false}
                rowKey="id"
            />
        </div>
    );
};

export default PlaylistsTable;
