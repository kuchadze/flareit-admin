import Image from 'next/image';
import styles from "./iconsButton.module.scss"

interface Props {
    src: string;
}

const IconButton = (props: Props) => {
    return (
        <div>
            <img className={styles.icon} src={props.src} alt="Icon" />
        </div>
    );
};

export default IconButton;
