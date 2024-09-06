export interface ItemData {
    id: number;
    title?: string;
    coverImgUrl: string;
    artistName: string;
    lastName?: string;
    biography?: string;
    releaseDate?: string;
    audioUrl?: string;
    createdAt?: string;
    deletedAt?: string | null;
    playCount?: number;
    updatedAt?: string;
}

export interface AuthorData extends ItemData {
    albums?: AlbumData[];
    musicsCount?: number;
    totalPlayCount?: number;
}

export interface AlbumData extends ItemData {
    musics: MusicData[];
    totalPlayCount?: number;
}

export interface MusicData extends ItemData {
    playCount?: number;
    audioUrl?: string;
}

export interface Item {
    data: AuthorData | AlbumData | MusicData;
    type: 'author' | 'music' | 'album';
}
