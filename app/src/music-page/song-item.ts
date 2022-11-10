import { SongTag } from "./song-tag"

export interface SongItem {
    url: string,
    name: string,
    tags: SongTag[],
    id: number,
}

export function newSongItem(url: string, name: string, tags: SongTag[], id: number): SongItem {
    return {
        url,
        name,
        tags,
        id,
    }
}