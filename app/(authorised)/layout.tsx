import { ReactNode } from 'react';
import styles from './layout.module.scss';

interface Props {
    children: ReactNode;
}

const layout = (props: Props) => {
    return <div className={styles.wrapper}>
        {props.children}
    </div>;
};

export default layout;
