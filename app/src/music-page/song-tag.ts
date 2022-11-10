export interface SongTag {
    name: String,
    color: string,
    id: number,
};

export function newSongTag (name: String, color: string, id: number): SongTag {
    return {
        name,
        color,
        id,
    };
}