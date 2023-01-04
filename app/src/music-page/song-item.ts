// import { SongTag } from "./song-tag"

export class SongItem {
    url = '';
    name = '';
    artist = '';
    tags: string[] = [];
    constructor(url: string, name: string, artist: string ,tags: string[]) {
        this.url = url;
        this.name = name;
        this.artist = artist;
        this.tags = tags;
    }

    public containsTag = (tag: string) => this.tags.includes(tag); 
}