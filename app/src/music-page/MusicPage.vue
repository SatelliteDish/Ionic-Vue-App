<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pageName }}</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar v-model="searchField"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list id="list" v-for="(songItem, index) in songs" :key="index">
        <song-component :song="songItem" @removeSong="removeSong" />
      </ion-list>
      <ion-fab horizontal="center" vertical="bottom" slot="fixed">
        <ion-fab-button @click="addSongOpen">
          <ion-icon icon="https://unpkg.com/ionicons@5.5.2/dist/svg/add-circle-outline.svg" size="large" />
        </ion-fab-button>
      </ion-fab>
      <ion-modal trigger="addSong" :isOpen="modalOpen">
        <add-song-modal @dismissed="addSongDismiss" />
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
import { getAllSongs, removeSong } from "../save-system/save-system"
import { SongItem } from './song-item';


  export default defineComponent({
    name: "MusicPage",
    async beforeCreate() {
      this.songs = await getAllSongs();
    },

    setup() {
      const songs = ref<SongItem[]>([]);
      let modalOpen = ref<Boolean>(false);

      return {
        songs,
        pageName: "Music",
        searchField: "",
        modalOpen,
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
      addSongOpen() {
        this.modalOpen = true;
      },
      addSongDismiss(song: SongItem) {
        this.modalOpen = false;
        this.songs.push(song);
      },
      async removeSong(song: SongItem) {
        if(!this.songs.includes(song)) {
          throw new Error("Song Not Found, how did you do this?");
        }
        try {
          await removeSong(song);
        }
        catch(e: any) {
          console.log(e.message);
        }
        const index: number = this.songs.indexOf(song);
        console.log(index);
        this.songs.splice(index, 1);
        
      }
    }
})
</script>
