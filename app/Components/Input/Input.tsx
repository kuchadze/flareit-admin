import React from 'react';
import style from './Input.module.scss';

interface Props {
    placeholder: string;
    register: any;
    type: string | number;
}

const Input: React.FC<Props> = (props) => {
    return (
        <input
            className={
                props.placeholder === 'Add Biography'
                    ? style.biography
                    : style.input
            }
            {...props.register}
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default Input;
