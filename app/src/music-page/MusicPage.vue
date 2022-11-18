<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pageName }}</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar v-model="searchField" @keydown.enter="search"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list id="list"   v-for="(songItem, index) in songs" :key="index">
        <song-component :song="songItem" />
      </ion-list>
      <ion-fab horizontal="center" vertical="bottom" slot="fixed">
        <ion-fab-button id="open-modal">
          <ion-icon icon="https://unpkg.com/ionicons@5.5.2/dist/svg/add-circle-outline.svg" size="large" />
        </ion-fab-button>
      </ion-fab>
      <ion-modal trigger="open-modal">
        <add-song-modal :registry="songNames"></add-song-modal>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage,
         IonContent,
         IonList,
         IonModal,
         IonFab,
         IonFabButton,
         IonHeader,
         IonSearchbar,
         IonToolbar,
         IonTitle,
         IonIcon,
        } from '@ionic/vue';
import SongComponent from './SongComponent.vue';
import AddSongModal from './AddSongModal.vue';
import { loadSongs, getAllSongs } from "../save-system/save-system"
import { SongItem } from './song-item';


  export default defineComponent({
    name: "MusicPage",
    async beforeCreate() {
      const newSongsNames =  await loadSongs().then();
      console.log("Got song Names");
      this.songNames = this.songNames.concat(newSongsNames);
      const newSongs = await getAllSongs(this.songNames).then();
      console.log("Got songs!")
      newSongs.forEach((song) => {
          this.songs.push(song); 
        })
        this.loaded = true;
      console.log("Page Data Loaded");
    },

    setup() {
      let testsong: SongItem = {
        url: "test",
        name: "test",
        tags: ["none"],
      }
      let loaded: boolean = false;
      const songs = ref<SongItem[]>([]);
      let songNames: string[] = [];

      return {
        songNames,
        songs,
        pageName: "Music",
        searchField: "",
        testsong,
        loaded,
      };
    },
    components: {
        IonPage,
        IonContent,
        SongComponent,
        IonList,
        IonFab,
        IonFabButton,
        IonModal,
        AddSongModal,
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonTitle,
        IonIcon,
    },
    methods: {
      async search() {
        // const song = await getSong(this.searchField); 
        // console.log(song);
        // const val = this.songs.push(song);
        // console.log(val);
        
        // console.log(this.songs.length)
        const songs = await getAllSongs(this.songNames);
        console.log(songs.length);
        songs.forEach(function (song) {
          console.log(song);
        })
      },
    }
})
</script>
