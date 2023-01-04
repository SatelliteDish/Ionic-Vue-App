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
        <song-component :song="songItem" @removeSong="removeSong" @editSong="editSong" />
      </ion-list>
      <ion-fab horizontal="center" vertical="bottom" slot="fixed">
        <ion-fab-button @click="songModalOpen">
          <ion-icon icon="https://unpkg.com/ionicons@5.5.2/dist/svg/add-circle-outline.svg" size="large" />
        </ion-fab-button>
      </ion-fab>
      <ion-modal :isOpen="songModalisOpen" >
        <song-modal :song="songToEdit" @dismissed="songModalDismiss" @editSong="songModalOpen" />
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
import SongModal from './SongModal.vue';
import { SaveSystem } from "../save-system/save-system"
import { SongItem } from './song-item';


  export default defineComponent({
    name: "MusicPage",
    
    setup() {
      const saveSystem = new SaveSystem();
      const songs = ref<SongItem[]>([]);
      const songModalisOpen = ref<boolean>(false);
      let songToEdit = new SongItem("","","",[""]);

      
      return {
        saveSystem,
        songs,
        pageName: "Music",
        searchField: "",
        songModalisOpen,
        songToEdit,
      };
    },
    async mounted() {
      await this.saveSystem.setup();
      this.songs = await this.saveSystem.getAllSongs()
    },
    components: {
        IonPage,
        IonContent,
        SongComponent,
        IonList,
        IonFab,
        IonFabButton,
        IonModal,
        SongModal,
        IonHeader,
        IonToolbar,
        IonSearchbar,
        IonTitle,
        IonIcon,
    },
    methods: {
      songModalOpen(song?: SongItem) {
        if(song instanceof SongItem) {
          this.songToEdit = song;
        }
        this.songModalisOpen = true;
      },
      async songModalDismiss(song: SongItem) {
        this.songModalisOpen = false;
        if(!this.songIsValid(song)) {
          throw new Error("Error! Song "+ song + " is invalid!");
        }

        const wasEdit = this.songToEdit.name !== "";
        if(wasEdit) {
          await this.saveSystem.removeSong(this.songToEdit);
          this.songs = await this.saveSystem.getAllSongs();
        }
        //this.songToEdit = new SongItem("","","",[""]);
        await this.saveSystem.saveSong(song);
        this.songs.push(song);
      },
      async removeSong(song: SongItem) {
        if(!this.songs.includes(song)) {
          throw new Error("Song Not Found, how did you do this?");
        }
        try {
          await this.saveSystem.removeSong(song);
        }
        catch(e: any) {
          console.log(e.message);
        }
        const index: number = this.songs.indexOf(song);
        this.songs.splice(index, 1);
        
      },
      editSong(song: SongItem) {
        this.songToEdit = song;
        this.songModalisOpen = true;
      },
      async editSongDismiss(song: SongItem) {
        this.songModalisOpen = false;
        if(!this.songIsValid(song)) {
          throw new Error("Error, song modal returned invalid song");
        }
        console.log("saving " + song.name);
        await this.saveSystem.saveSong(song);
        console.log("pushed " + song.name);
      },
      songIsValid (song: SongItem): boolean {
        if(song.url.length === 0 || song.name.length === 0) {
          return false;
        }
        return true;
      }
    },
})
</script>
