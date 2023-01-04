import { ref} from "vue";
import { Preferences } from "@capacitor/preferences";

export class SongRegistry {
    STORAGE_KEY = "songs";
    songRegistry = ref<string[]>([]);

    constructor(registry: string[]){
        this.songRegistry.value = registry;
    }

    public testMode(): SongRegistry {
        this.STORAGE_KEY = "test";
        return this;
    }

    public push = async (path: string) =>  {
        if(this.contains(path)) {
            throw new Error("Error! Cannot push path " + path + ", path already exists.");
        }
        this.songRegistry.value.push(path);
        await this.cacheRegistry();
    }

    public async remove (path: string) {
        if(!this.contains(path)) {
            throw new Error("Error! Cannot remove path from registry, " + path + " does not exist in registry!");
        }
        const index = this.songRegistry.value.indexOf(path);
        this.songRegistry.value.splice(index,1);
        await this.cacheRegistry();
    }
    
    public async replace (orig: string, next: string) {
        if(!this.contains(orig)){
            throw new Error("Error! Cannot replace " + orig + " with " + next + ", " + orig + " does not exist!");
        }
        if(this.contains(next)) {
            throw new Error("Error! Cannot replace " + orig + " with " + next + ", " + orig + "is already in registry.");
        }
        const index = this.songRegistry.value.indexOf(orig);
        this.songRegistry.value.splice(index, 1, next);
        await this.cacheRegistry();
    }

    public getIndexOf(path: string): number {
        if(!this.contains(path)) {
            throw new Error("Error! Can't find index of " + path + ", path does not exist!");
        }
        return this.songRegistry.value.indexOf(path);
    }

    public contains (path: string): boolean {
        return this.songRegistry.value.includes(path);
    }

    public async moveUp (path: string) {
        if(!this.contains(path)) {
            throw new Error("Error! Can't move " + path + " up, path does not exist!");
        }
        const index = this.songRegistry.value.indexOf(path);
        if(index === 0) {
            throw new Error("Error! Cannot move up, entry is first in the registry!");
        }
        const nextPath = this.songRegistry.value[index - 1];
        this.songRegistry.value[index - 1] = path;
        this.songRegistry.value[index] = nextPath;
        await this.cacheRegistry();
    }
    public async moveDown (path: string) {
        if(!this.contains(path)) {
            throw new Error("Error, can't move " + path + "down, path does not exist!");
        }
        const index = this.songRegistry.value.indexOf(path);
        if(index === this.songRegistry.value.length - 1) {
            throw new Error("Error! Cannot move down, entry is the last in the registry!");
        }
        const nextPath = this.songRegistry.value[index + 1];
        this.songRegistry.value[index + 1] = path;
        this.songRegistry.value[index] = nextPath;
        await this.cacheRegistry();
    }
    public getRegistry(): string[] {
        return this.songRegistry.value.slice();
    }
    private async cacheRegistry() {
        await Preferences.set({
            key: this.STORAGE_KEY,
            value: JSON.stringify(this.songRegistry.value),
        });
    }
    public async loadCachedSongs() {
        await Preferences.get({key: this.STORAGE_KEY}).then((data) => {
            this.songRegistry.value = data.value ? JSON.parse(data.value) as string[] : new Array<string>;
        }).catch((error) => {
            console.error("ERROR!" + error);
        });
        
        console.log("End load");
    }

    //TODO: Add this
    // public async clearCachedSongs() {

    // }
}