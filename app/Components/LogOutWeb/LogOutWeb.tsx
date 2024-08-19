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

    return (
        <div
            className={styles.profile}
            onClick={() => {
                setProfileWeb(!profileWeb);
            }}
        >
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
