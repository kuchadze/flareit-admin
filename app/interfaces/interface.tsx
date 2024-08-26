export interface FormValues {
    artistName: string;
    lastName: string;
    releaseDate: number;
    biography: string;
    coverImgUrl: FileList; // Should be FileList for file inputs
    title: string;
    audio: FileList; // Should be FileList for file inputs
}
