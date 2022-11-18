import { SongItem } from "@/music-page/song-item";
import { Filesystem, Directory, WriteFileOptions, ReadFileOptions, ReadFileResult } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { ref} from "vue";

const SONG_STORAGE = "songs";

const songRegistry = ref<string[]>([]);



async function loadSongs() {
    if(songRegistry.value.length !== 0) {
        return;
    }
    const list = await Preferences.get({key: SONG_STORAGE});
    songRegistry.value = list.value ? JSON.parse(list.value) : [];
}

function cacheSongs(path: string, songRegistry: string[]) {
  const count = songRegistry.push(path);
  Preferences.set({
      key: SONG_STORAGE,
      value: JSON.stringify(songRegistry),
  })
}

export async function saveSong (song: SongItem): Promise<string> {
    const saveData: WriteFileOptions = {
        path: song.name + "song.json",
        data: btoa(JSON.stringify(song)),
        directory: Directory.Data,
    };
    const savedFile = await Filesystem.writeFile(saveData);
    cacheSongs(saveData.path, songRegistry.value);
    return saveData.path;
  }

export async function getSong(path: string): Promise<SongItem> {
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
    await loadSongs();
    const result: SongItem[] = [];

    for (const path of songRegistry.value) {
        const song = await getSong(path);
        result.push(song);
    }
    return result;
}
