import Link from 'next/link';
import styles from './SearchList.module.scss';
import Image from 'next/image';

interface Item {
    id: number;
    word: string;
    search_count: number;
    last_searched: string;
    icon: string;
    type: 'album' | 'artist';
}

interface Props {
    item: Item;
}

const SearchList = (props: Props) => {
    return (
        <Link
            key={props.item.id}
            className={styles.mapContainer}
            href={`/${props.item.type}/${props.item.id}`}
        >
            <Image
                className={styles.square}
                src={props.item.icon}
                width={24}
                height={24}
                alt="Icon"
            />
            <span className={styles.searchAndMapText}>{props.item.word}</span>
        </Link>
    );
};

export default SearchList;
