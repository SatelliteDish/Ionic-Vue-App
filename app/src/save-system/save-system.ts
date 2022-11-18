import { SongItem } from "@/music-page/song-item";
import { Filesystem, Directory, WriteFileOptions, ReadFileOptions, ReadFileResult } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { ref} from "vue";

const SONG_STORAGE = "songs";

export async function loadSongs(): Promise<string[]>{
    console.log("Start get song names");
    const list = await Preferences.get({key: SONG_STORAGE});
    const songList: string[] = list.value ? JSON.parse(list.value) : [];
    console.log("sending song names");
    return songList;
}

//Buggy Function
function cacheSongs(path: string, songRegistry: string[]) {
  console.log("cached " + path );
  const count = songRegistry.push(path);
  console.log("count = " + count + " last added item = " + songRegistry[count])
  Preferences.set({
      key: SONG_STORAGE,
      value: JSON.stringify(songRegistry),
  })
}

export async function saveSong (song: SongItem, songRegistry: string[]): Promise<string> {
    const saveData: WriteFileOptions = {
        path: song.name + "song.json",
        data: btoa(JSON.stringify(song)),
        directory: Directory.Data,
    };
    const savedFile = await Filesystem.writeFile(saveData);
    cacheSongs(saveData.path, songRegistry);
    return saveData.path;
  }

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
    console.log("Got " + result.name + ", sending")
    return result;
}

export async function getAllSongs(songRegistry: string[]): Promise<SongItem[]> {
    const result: SongItem[] = [];

    for (const path of songRegistry) {
        console.log("Requesting " + path);
        const song = await getSong(path);
        console.log("Received " + song.name)
        result.push(song);
    }
    console.log(result.length)
    console.log("Sending song array");
    return result;
}
