export interface FormValues {
    artistName: string;
    lastName: string;
    releaseDate: number;
    biography: string;
    coverImgUrl: FileList;
    title: string;
    audio: FileList;
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
