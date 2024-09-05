import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './AuthInput.module.scss';

interface Props {
    placeholder: string;
    register: UseFormRegisterReturn;
    type?: string;
    error?: string;
    submitted: boolean;
}

const AuthInput = (props: Props) => {
    const classNames = [styles.inputWrapper];

    if (props.submitted) {
        classNames.push(props.error ? styles.error : styles.validate);
    }

    return (
        <div className={styles.container}>
            <div className={classNames.join(' ')}>
                <input
                    type={props.type === 'password' ? 'password' : ''}
                    placeholder={props.placeholder}
                    className={styles.input}
                    {...props.register}
                />
            </div>
            {props.error && <p className={styles.errorText}>{props.error}</p>}
        </div>
    );
};

export default AuthInput;
