import { SongItem } from "@/music-page/song-item";
import { Filesystem, Directory, WriteFileOptions, ReadFileOptions, ReadFileResult } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { ref} from "vue";
import { SongRegistry } from "./song-registry";

export class SaveSystem {    const SONG_STORAGE = "songs";
    const SONG_PATH_ADD = "song.json";

    const test = false;

    const log = (message: string) => {
        if(test){
            console.log(message)
        }};

    const SongPath = (song: SongItem) => song.name + SONG_PATH_ADD;

    const songRegistry = new SongRegistry([]);



    // async function loadSongs() {
    //     if(songRegistry.value.length !== 0) {
    //         return;
    //     }
    //     log("Start Load");
    //     await Preferences.get({key: SONG_STORAGE}).then((data) => {
    //         log("DATA = " + data.value);
    //         songRegistry.value = data.value ? JSON.parse(data.value) as string[] : new Array<string>;
    //     }).catch((error) => {
    //         console.error("ERROR!" + error);
    //     });
        
    //     log("End load");
    // }

    // async function cacheSongs() {
    //     await Preferences.set({
    //         key: SONG_STORAGE,
    //         value: JSON.stringify(songRegistry.value),
    //     });
    // }

    public async saveSong (song: SongItem): Promise<string> {
        const saveData: WriteFileOptions = {
            path: song.name + SONG_PATH_ADD,
            data: btoa(JSON.stringify(song)),
            directory: Directory.Data,
        };
        log("Save Path = " + saveData.path);
        log("Base 64 Encoded JSON = " + saveData.data);
        log("JSON = " + atob(saveData.data));
        await Filesystem.writeFile(saveData).then(() => log("Saved " + saveData.path));
        await songRegistry.push(saveData.path,);
        await Filesystem.readFile({path: saveData.path, directory: Directory.Data}).then(data => log(atob(data.data)));
        return saveData.path;
    }

    export async function getSong(path: string): Promise<SongItem> {
        log("Getting file at path " + path);
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

    export const getAllSongs = async (): Promise<SongItem[]> => {
        const registryItems = songRegistry.getRegistry();
        const result: SongItem[] = [];
        for (let i = 0; i < registryItems.length; i++) {
            const song = await getSong(registryItems[i]);
            result.push(song);
        }
        return result;
    }

    export async function removeSong(song: SongItem): Promise<void> {
        const songPath = SongPath(song);

        await songRegistry.remove(songPath);

        await Filesystem.deleteFile({
            path: songPath,
            directory: Directory.Data
        }).then(() => log("Finished Deleting " + songPath + "!"));
    }

    export async function replaceSong(origSong: SongItem, replaceWith: SongItem) {
        const currentPath = SongPath(origSong);
        await songRegistry.remove(currentPath);
        await Filesystem.deleteFile({path: currentPath});
        await saveSong(replaceWith);
    }
}