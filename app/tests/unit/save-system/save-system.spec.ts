// import { SaveSystem } from "@/save-system/save-system";
// import { SongItem } from "@/music-page/song-item";
// import { assert } from "@vue/compiler-core";

// const testSong = new SongItem("this is test data","if seen, this is a bug");

// describe("saveSong is working", () => {
//     test("can't save duplicate song", () => {
//         const testSave = new SaveSystem();
//         let isSuccessful = true;
//             testSave.saveSong(testSong);
//         try{
//             testSave.saveSong(testSong);
//         }
//         catch {
//             isSuccessful = true;
//         }
//         testSave.removeSong(testSong);
//         assert(isSuccessful);
//     });
// });