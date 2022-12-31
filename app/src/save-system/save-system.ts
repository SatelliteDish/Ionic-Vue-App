import { SongItem } from "@/music-page/song-item";
import { Filesystem, Directory, WriteFileOptions, ReadFileOptions, ReadFileResult } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { ref} from "vue";
import { SongRegistry } from "./song-registry";

export class SaveSystem {
    SONG_PATH_ADD = "song.json";

    test = false;

    log = (message: string) => {
        if(this.test){
            console.log(message)
        }};

    SongPath = (song: SongItem) => song.name + this.SONG_PATH_ADD;

    songRegistry = new SongRegistry([]);

    public async setup(testMode = false) {
        if(testMode = true) {
            await this.testMode();
            return this;
        }
        await this.songRegistry.loadCachedSongs();
        return this;
    }

    public async testMode() {
        this.songRegistry.testMode();
        await this.songRegistry.loadCachedSongs();
        const testSongs = this.songRegistry.getRegistry();
        for(var songs of testSongs) {
            const song = await this.getSong(songs);
            await this.removeSong(song);
        }
        return this;
    }

    public async saveSong (song: SongItem): Promise<string> {
        const saveData: WriteFileOptions = {
            path: song.name + this.SONG_PATH_ADD,
            data: btoa(JSON.stringify(song)),
            directory: Directory.Data,
        };
        {
            this.log("Save Path = " + saveData.path);
            this.log("Base 64 Encoded JSON = " + saveData.data);
            this.log("JSON = " + atob(saveData.data));
        }
        try{
            await this.songRegistry.push(saveData.path,);
            await Filesystem.writeFile(saveData).then(() => this.log("Saved " + saveData.path));
            await Filesystem.readFile({path: saveData.path, directory: Directory.Data})
            .then(data => this.log(atob(data.data)));
        }
        catch (e) {
            throw e;
        }
        return saveData.path;
    }

    public async getSong(path: string): Promise<SongItem> {
        this.log("Getting file at path " + path);
        const saveData: ReadFileOptions = {
            path: path,
            directory: Directory.Data,
        }
        let value: ReadFileResult = {data:"ERROR"};
        try {
            value = await Filesystem.readFile(saveData)
        }
        catch(e) {
            console.log("Song " + path + " not found!");
            console.error(e);
        }
        const result: SongItem = JSON.parse(atob(value.data));
        return result;
    }

    public async getAllSongs (): Promise<SongItem[]> {
        const registryItems = this.songRegistry.getRegistry();
        const result: SongItem[] = [];
        for (let i = 0; i < registryItems.length; i++) {
            const song = await this.getSong(registryItems[i]);
            result.push(song);
        }
        return result;
    }

    public async removeSong(song: SongItem): Promise<void> {
        const songPath = this.SongPath(song);

        await this.songRegistry.remove(songPath);

        await Filesystem.deleteFile({
            path: songPath,
            directory: Directory.Data
        }).then(() => this.log("Finished Deleting " + songPath + "!"));
    }

    public  async replaceSong(origSong: SongItem, replaceWith: SongItem) {
        const currentPath = this.SongPath(origSong);
        await this.songRegistry.remove(currentPath);
        await Filesystem.deleteFile({path: currentPath});
        await this.saveSong(replaceWith);
    }
}