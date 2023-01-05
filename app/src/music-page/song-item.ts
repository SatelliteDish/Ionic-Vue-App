import { SongTag } from "./song-tag"

export class SongItem {
    url = '';
    name = '';
    artist = '';
    tags: SongTag[] = [new SongTag('','')];
    constructor(url: string, name: string, artist: string ,tags?: SongTag[]) {
        this.url = url;
        this.name = name;
        this.artist = artist;
        if(typeof tags !== 'undefined') {
            this.tags = tags;
        }
    }

    public containsTag = (tag: SongTag) => this.tags.includes(tag); 
}