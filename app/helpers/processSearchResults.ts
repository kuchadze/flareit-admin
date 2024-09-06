import { SearchTypeEnum } from '../enums/searchTypes.enum';
import {
    Item,
    AuthorData,
    AlbumData,
    MusicData,
} from '../interfaces/searchInterfaces';

export const processAndSortSearchResults = (data: Item[]): Item[] => {
    const processedResults: Item[] = data.flatMap((item: Item) => {
        if (item.type === SearchTypeEnum.Author) {
            const authorData = item.data as AuthorData;
            const albums =
                authorData.albums?.flatMap((album) => [
                    { type: SearchTypeEnum.Album, data: album } as Item,
                    ...album.musics.map(
                        (music) =>
                            ({
                                type: SearchTypeEnum.Music,
                                data: music,
                            }) as Item,
                    ),
                ]) || [];
            return [
                { type: SearchTypeEnum.Author, data: authorData } as Item,
                ...albums,
            ];
        }

        if (item.type === SearchTypeEnum.Album) {
            const albumData = item.data as AlbumData;
            return [
                { type: SearchTypeEnum.Album, data: albumData } as Item,
                ...albumData.musics.map(
                    (music) =>
                        ({
                            type: SearchTypeEnum.Music,
                            data: music,
                        }) as Item,
                ),
            ];
        }

        if (item.type === SearchTypeEnum.Music) {
            return [
                {
                    type: SearchTypeEnum.Music,
                    data: item.data as MusicData,
                } as Item,
            ];
        }

        return [];
    });

    return processedResults.sort((a, b) => {
        const order = { music: 1, album: 2, author: 3 };
        return order[a.type] - order[b.type];
    });
};
