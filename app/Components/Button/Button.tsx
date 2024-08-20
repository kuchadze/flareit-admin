import styles from './Button.module.scss';

interface Props {
    primary: boolean;
    size?: 'large';
    text: string;
    width?: string;
    onClick?: () => void;
}

const Button = (props: Props) => {
    const classNames = [
        styles.btnCommon,
        props.primary ? styles.primary : styles.secondary,
        props.size === 'large' && styles.large,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            style={{ width: props.width }}
            onClick={props.onClick}
            className={classNames}
        >
            {props.text}
        </button>
    );
};

export default Button;
