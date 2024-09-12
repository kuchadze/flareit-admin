import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilWrapper from './Components/RecoilWrapper/RecoilWrapper';
import '@/app/styles/ant.table.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FlareIt Admin',
    description: 'FlareIt Admin Panel',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/MusicLogo.svg" />
            </head>
            <body className={inter.className}>
                <RecoilWrapper>{children}</RecoilWrapper>
            </body>
        </html>
    );
}
