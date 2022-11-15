import { SongItem } from "@/music-page/song-item";
import { Filesystem, Directory, WriteFileOptions, ReadFileOptions, ReadFileResult } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { ref} from "vue";

const SONG_STORAGE = "songs";

//Array I cant assign to
const songRegistry= ref<string[]>([]);

export async function loadSongs() {
    const list = await Preferences.get({key: SONG_STORAGE});
    const songList: string[] = list.value ? JSON.parse(list.value) : [];
    songRegistry.value = songList;
}

//Buggy Function
function cacheSongs(path: string) {
  console.log("cached " + path );
  songRegistry.value = [path, ...songRegistry.value];
  Preferences.set({
      key: SONG_STORAGE,
      value: JSON.stringify(songRegistry.value),
  })
}

export async function saveSong (song: SongItem): Promise<string> {
    const saveData: WriteFileOptions = {
        path: song.name + "song.json",
        data: btoa(JSON.stringify(song)),
        directory: Directory.Data,
    };
    const savedFile = await Filesystem.writeFile(saveData);
    cacheSongs(saveData.path);
    return saveData.path;
  };

export async function getSong(path: string): Promise<SongItem> {
    console.log("Start get song " + path);
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

export async function getAllSongs(): Promise<SongItem[]> {
    let result: SongItem[] = [];

    for(const path in songRegistry.value) {
        console.log(songRegistry.value.length);
        const song = await getSong(path);
        result.push(song);
    } 

    return result;
}
