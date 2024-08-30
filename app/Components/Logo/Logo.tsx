import Link from 'next/link';

const Logo = () => {
    return (
        <Link href={'/'}>
            <img src="/images/logo.svg" alt="Logo" />
        </Link>
    );
};

export default Logo;
