'use client';

import { Table } from 'antd';
import styles from './PlaylistsTable.module.scss';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import IconButton from '../IconButton/IconButton';
import type { ColumnsType } from 'antd/es/table';
import { Playlist } from '@/app/interfaces/interface';

const PlaylistsTable = () => {
    const columns: ColumnsType<Playlist> = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (name: string, record: { imageSrc: string }) => (
                <PlaylistInfo
                    image={record.imageSrc || '/images/playlistImage.png'}
                    playlistName={name}
                />
            ),
        },
        {
            title: 'songs',
            dataIndex: 'songs',
            key: 'songs',
        },
        {
            title: '',
            dataIndex: 'buttons',
            key: 'buttons',
            align: 'right',
            render: () => (
                <div className={styles.buttons}>
                    <IconButton src={'/icons/iconButton/editButton.svg'} />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'car Songs',
            songs: 10,
            imageSrc: '/images/playlistCarSongs.png',
        },
        {
            key: '2',
            name: 'my everyday',
            songs: 8,
            imageSrc: '/images/playlistMyEveryday.png',
        },
        {
            key: '3',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '4',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '5',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '6',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '7',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '8',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '9',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '10',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '11',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
        {
            key: '12',
            name: 'party songs',
            songs: 15,
            imageSrc: '/images/playlistPartySongs.png',
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default PlaylistsTable;
