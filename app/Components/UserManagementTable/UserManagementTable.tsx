'use client';

import styles from './UserManagementTable.module.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import IconButton from '../IconButton/IconButton';
import { User } from '@/app/interfaces/interface';
import Link from 'next/link';
import router from 'next/router';

const UserManagementTable = () => {
    const columns: ColumnsType<User> = [
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            width: '40%',
            render: (email: string, record: { key: string }) => (
                <Link
                    href="/playlists"
                    onClick={() => router.push(`/playlists/${record.key}`)}
                    className={styles.emailLink}
                >
                    {email}
                </Link>
            ),
        },
        {
            title: 'added date',
            dataIndex: 'addedDate',
            key: 'addedDate',
        },
        {
            title: '',
            dataIndex: 'buttons',
            key: 'buttons',
            width: '20%',
            align: 'right',
            render: () => (
                <div className={styles.buttons}>
                    <IconButton src={'/icons/iconButton/toPlaylists.svg'} />
                    <IconButton src={'/icons/iconButton/blockUser.svg'} />
                    <IconButton src={'/icons/iconButton/editButton.svg'} />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            email: 'g.sanikidze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '2',
            email: 'n.gventsadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '3',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '4',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '5',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '6',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '7',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '8',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '9',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '10',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
        {
            key: '11',
            email: 't.urushadze@gmail.com',
            addedDate: '03.07.2024',
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default UserManagementTable;
