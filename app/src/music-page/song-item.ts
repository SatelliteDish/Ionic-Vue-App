import { SongTag } from "./song-tag"

export interface SongItem {
    url: string,
    name: string,
    tags: string[],
}

export function newSongItem(url: string, name: string, tags: string[], id: number): SongItem {
    return {
        url,
        name,
        tags,
    }
}