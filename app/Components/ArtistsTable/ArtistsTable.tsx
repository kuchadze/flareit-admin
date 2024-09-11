'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import ArtistInfo from '../ArtistInfo/ArtistInfo';
import styles from '@/app/Components/ArtistsTable/ArtistsTable.module.scss';
import { format } from 'date-fns';
import DeleteBox from '../DeleteBox/DeleteBox';
import AddAlbumIcon from '../AddAlbumIcon/AddAlbumIcon';
import apiInstance from '@/app/ApiInstance';

interface Artist {
    coverImgUrl: string;
    artistName: string;
    id: number;
    year: string;
    songs: number;
    createdAt: string;
}

const ArtistsTable = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [showModal, setShowModal] = useState<number | null>(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const result = await apiInstance.get('/authors');
                setArtists(result.data);
            } catch (error) {
                alert('Error fetching artists');
            }
        };

        fetchArtists();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await apiInstance.delete(`/authors/${id}`);
            setArtists((prevArtists) =>
                prevArtists.filter((artist) => artist.id !== id),
            );
        } catch (error) {
            alert('Error deleting artist');
        } finally {
            setShowModal(null);
        }
    };

    const formatDate = (dateString: string) =>
        format(new Date(dateString), 'dd.MM.yyyy');
    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (_: string, record: Artist) => (
                <ArtistInfo
                    image={record.coverImgUrl}
                    artistName={record.artistName}
                />
            ),
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        },
        {
            title: 'Songs',
            dataIndex: 'musicsCount',
            key: 'songs',
        },
        {
            title: 'Added Date',
            dataIndex: 'createdAt',
            key: 'addedDate',
            render: (text: string) => formatDate(text),
        },
        {
            title: '',
            key: 'buttons',
            render: (_: string, record: Artist) => (
                <div className={styles.buttons}>
                    <div>
                        <AddAlbumIcon
                            src={'/icons/iconButton/addAlbum.svg'}
                            id={record.id}
                        />
                    </div>
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
        <Table
            columns={columns}
            dataSource={artists}
            pagination={false}
            rowClassName="rows"
            rowKey="id"
        />
    );
};

export default ArtistsTable;
