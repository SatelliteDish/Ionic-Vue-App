import { SongTag } from "./song-tag"

export class SongItem {
    url: string = '';
    name: string = '';
    artist: string = '';
    tags: string[] = [];
    constructor(url: string, name: string, artist?: string ,tags?: string[]) {
        this.url = url;
        this.name = name;
        if(typeof artist !== 'undefined') {
            this.artist = artist;
        }
        if(typeof tags !== 'undefined') {
            this.tags = tags;
        }
    }

    public containsTag = (tag: string) => this.tags.includes(tag); 
}