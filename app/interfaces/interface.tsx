export interface FormValues {
    id: number;
    artistName: string;
    lastName: string;
    releaseDate: string;
    biography: string;
    coverImgUrl: File | null;
    albumTitle: string;
    title: string;
    audio: File | null;
    password: string;
    confirmPassword: string;
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

export interface Users {
    id: number;
    email: string;
    password: string;
    imgUrl: string;
}

export interface Music {
    title: string;
    artistName: string;
    id: number;
    coverImgUrl: string;
    audioUrl: string;
}
