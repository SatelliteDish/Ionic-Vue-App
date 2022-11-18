import { SongTag } from "./song-tag"

export class SongItem {
    url: string = '';
    name: string = '';
    tags: string[] = [];
    constructor(url: string, name: string, tags: string[]) {
        this.url = url;
        this.name = name;
        this.tags = tags;
    }

    public containsTag = (tag: string) => this.tags.includes(tag); 
}