export interface FormValues {
    artistName: string;
    lastName: string;
    releaseDate: number;
    biography: string;
    musicPicture: File | null;
    musicTitle: string;
    url: File | null;
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
