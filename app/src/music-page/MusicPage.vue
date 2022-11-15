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
      <ion-fab horizontal="center" vertical="bottom" slot="fixed">
        <ion-fab-button id="open-modal">
          <ion-icon icon="https://unpkg.com/ionicons@5.5.2/dist/svg/add-circle-outline.svg" size="large" />
        </ion-fab-button>
      </ion-fab>
      <ion-modal trigger="open-modal">
        <add-song-modal></add-song-modal>
      </ion-modal>

      <div id="container">
        <ion-list v-for="(songItem, index) in songs.values" :key="index">
           <song-component :song="songItem"></song-component>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
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
import { saveSong, getSong, getAllSongs } from "../save-system/save-system"
import { SongItem } from './song-item';


  export default defineComponent({
    name: "MusicPage",
    async mounted() {
      const songs = await getAllSongs();
      this.songs = songs;
      console.log("Mounted");
    },

    setup() {
      const songs: Ref<SongItem[]> = ref([]);

      return {
        songs,
        pageName: "Music",
        searchField: "",
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
        const songs = await getAllSongs();
        console.log(songs.length);
        for(const item in songs) {
          console.log(item);
        }
      },
    }
})
</script>
