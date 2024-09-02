import Link from 'next/link';

interface Props {
    id: number;
}

const TransitionPlayList = (props: Props) => {
    return (
        <Link href={`/users/${props.id}`}>
            <img src="/icons/iconButton/toPlaylists.svg" />
        </Link>
    );
};

export default TransitionPlayList;
