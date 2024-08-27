'use client';

import styles from './UserManagementTable.module.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import IconButton from '../IconButton/IconButton';

interface User {
    key: string;
    email: string;
    addedDate: string;
}

const UserManagementTable = () => {
    const columns: ColumnsType<User> = [
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            width: '40%',
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
