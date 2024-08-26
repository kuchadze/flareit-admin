'use client';
import { Table } from 'antd';
import React from 'react';
import ArtistInfo from '../ArtistInfo/ArtistInfo';
import IconButton from '../IconButton/IconButton';
import styles from '@/app/Components/ArtistsTable/ArtistsTable.module.scss';

const ArtistsTable = () => {
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <ArtistInfo image={'/images/imany.jpeg'} artistName={text} />
            ),
        },
        {
            title: 'year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'songs',
            dataIndex: 'songs',
            key: 'songs',
        },
        {
            title: 'added Date',
            dataIndex: 'added date',
            key: 'added date',
        },
        {
            title: '',
            dataIndex: 'buttons',
            key: 'buttons',
            render: () => (
                <div className={styles.buttons}>
                    <IconButton src={'/icons/iconButton/addAlbum.svg'} />
                    <IconButton src={'/icons/iconButton/deleteButton.svg'} />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            year: 32,
            songs: 'Song 1',
            'added date': '2024-08-01',
        },
        {
            key: '2',
            name: 'Jim Green',
            year: 42,
            songs: 'Song 2',
            'added date': '2024-08-02',
        },
        {
            key: '3',
            name: 'Joe Black',
            year: 32,
            songs: 'Song 3',
            'added date': '2024-08-03',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName="rows"
        />
    );
};

export default ArtistsTable;
