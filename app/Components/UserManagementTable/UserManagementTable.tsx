'use client';

import styles from './UserManagementTable.module.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import BlockIcon from '../BlockIcon/BlockIcon';
import { useEffect, useState } from 'react';
import { Users } from '@/app/interfaces/interface';
import TransitionPlayList from '../TransitionPlaylist/TransitionPlayList';
import { format } from 'date-fns';
import PasswordIcon from '../PasswordIcon/PasswordIcon';
import apiInstance from '@/app/ApiInstance';

const UserManagementTable = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    useEffect(() => {
        apiInstance
            .get('/users')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, [token]);
    const formatDate = (dateString: string) =>
        format(new Date(dateString), 'dd.MM.yyyy');
    const columns: ColumnsType<Users> = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '40%',
            render: (email: string) => (
                <div className={styles.emailLink}>{email}</div>
            ),
        },
        {
            title: 'Added Date',
            dataIndex: 'createdAt',
            key: 'addedDate',
            render: (text: string) => formatDate(text),
        },
        {
            title: '',
            dataIndex: 'buttons',
            key: 'buttons',
            width: '20%',
            align: 'right',
            render: (text: string, record: Users) => (
                <div className={styles.buttons}>
                    <TransitionPlayList id={record.id} />
                    <BlockIcon id={record.id} />
                    <PasswordIcon id={record.id} />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={users} pagination={false} />
        </div>
    );
};

export default UserManagementTable;
