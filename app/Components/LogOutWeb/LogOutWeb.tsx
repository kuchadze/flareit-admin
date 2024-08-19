import { useState } from 'react';
import styles from './LogOutweb.module.scss';
import Image from 'next/image';

interface Props {
    src: string;
    width: number;
    height: number;
    title: string;
}

const LogOutWeb = (props: Props) => {
    const [profileWeb, setProfileWeb] = useState(false);

    const onClick = () => {
        setProfileWeb(!profileWeb);
    };
    return (
        <div className={styles.profile} onClick={onClick}>
            <Image
                className={styles.image}
                src={props.src}
                width={props.width}
                height={props.height}
                alt={'profile'}
            />
            {props.title && <span className={styles.title}>{props.title}</span>}
        </div>
    );
};

export default LogOutWeb;