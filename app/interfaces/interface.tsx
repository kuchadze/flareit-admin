export interface FormValues {
    artistName: string;
    lastName: string;
    releaseDate: number;
    biography: string;
    coverImgUrl: File | null;
    albumTitle: string;
    title: string;
    audio: File | null;
    albumReleaseDate: string;
    albumArtistName: string;
    albumPicture: File | null;
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
