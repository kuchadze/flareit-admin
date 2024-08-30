export interface FormValues {
    artistName: string;
    lastName: string;
    releaseDate: number;
    biography: string;
    coverImgUrl: File | null;
    title: string;
    audio: File | null;
}

export interface User {
    key: string;
    email: string;
    addedDate: string;
}

export interface Playlist {
    key: string;
    name: string;
    songs: number;
    imageSrc: string;
}

export interface Album {
    id: number;
    title: string;
    releaseDate: string;
    artistName: string;
    coverImgUrl: string;
}
