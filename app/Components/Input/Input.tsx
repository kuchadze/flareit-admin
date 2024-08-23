import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface Props {
    placeholder: string;
    register: UseFormRegisterReturn;
}

const Input: React.FC<Props> = (props) => {
    return (
        <textarea
            className={
                props.placeholder === 'Add Biography'
                    ? styles.biography
                    : styles.input
            }
            {...props.register}
            placeholder={props.placeholder}
        />
    );
};

export default Input;
