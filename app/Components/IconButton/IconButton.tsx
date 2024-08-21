import Image from 'next/image';

interface Props {
    src: string;
}

const IconButton = (props: Props) => {
    return (
        <div>
            <Image src={props.src} width={32} height={32} alt="Icon" />
        </div>
    );
};

export default IconButton;
