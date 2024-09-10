'use client';

import { Table } from 'antd';
import styles from './PlaylistsTable.module.scss';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteBox from '../DeleteBox/DeleteBox';
import { useParams } from 'next/navigation';
import EditIcon from '../EditIcon/EditIcon';

interface Playlist {
    id: number;
    title: string;
    imageSrc: string;
}

const PlaylistsTable = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [showModal, setShowModal] = useState<number | null>(null);

    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(
                    `https://enigma-wtuc.onrender.com/users/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setPlaylists(response.data.playlists);
            } catch (error) {
                console.error('Error fetching playlists:', error);
                alert('Error fetching playlists');
            }
        };

        if (id && token) {
            fetchPlaylists();
        }
    }, []);

    const handleDelete = async (playlistId: number) => {
        try {
            await axios.delete(
                `https://enigma-wtuc.onrender.com/playlists/${playlistId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setPlaylists((prevPlaylists) =>
                prevPlaylists.filter((playlist) => playlist.id !== playlistId),
            );
        } catch (error) {
            console.error('Error deleting playlist:', error);
            alert('Error deleting playlist');
        } finally {
            setShowModal(null);
        }
    };

    const columns: ColumnsType<Playlist> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
            render: (title: string, record: Playlist) => (
                <PlaylistInfo
                    image={record.imageSrc || '/images/playlistImage.png'}
                    title={record.title}
                />
            ),
        },
        {
            title: 'Songs',
            dataIndex: 'songs',
            key: 'songs',
            render: (text: string) => text || 'No songs available',
        },
        {
            title: '',
            dataIndex: 'buttons',
            key: 'buttons',
            align: 'right',
            width: '100px',
            render: (text: string, record: Playlist) => (
                <div className={styles.buttons}>
                    <EditIcon id={record.id} value={record.title} />
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
