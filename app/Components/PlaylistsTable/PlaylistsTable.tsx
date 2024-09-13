'use client';

import { Table } from 'antd';
import styles from './PlaylistsTable.module.scss';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import DeleteBox from '../DeleteBox/DeleteBox';
import { useParams } from 'next/navigation';
import EditIcon from '../EditIcon/EditIcon';
import apiInstance from '@/app/ApiInstance';

interface Playlist {
    id: number;
    title: string;
    imageSrc: string;
}

const PlaylistsTable = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [showModal, setShowModal] = useState<number | null>(null);

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await apiInstance.get(`/users/${id}`);
                setPlaylists(response.data.playlists);
            } catch (error) {
                console.error('Error fetching playlists:', error);
                alert('Error fetching playlists');
            }
        };

        if (id) {
            fetchPlaylists();
        }
    }, []);

    const handleDelete = async (playlistId: number) => {
        try {
            await apiInstance.delete(`/playlists/${playlistId}`);
            setPlaylists((prevPlaylists) =>
                prevPlaylists.filter((playlist) => playlist.id !== playlistId),
            );
            alert('Playlist Deleted successfully');
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
                    image={record.imageSrc || '/images/MusicLogo.svg'}
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
