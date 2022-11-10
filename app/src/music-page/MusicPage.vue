<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pageName }}</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab horizontal="center" vertical="bottom" slot="fixed">
        <ion-fab-button id="open-modal"></ion-fab-button>
      </ion-fab>
      <ion-modal trigger="open-modal">
        <add-song-modal></add-song-modal>
      </ion-modal>

      <div id="container">
        <ion-list v-for="song in songs" :key="song.id">
          <song-component :song="song"></song-component>
        </ion-list>
      </div>
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
        } from '@ionic/vue';
import { newSongItem  } from './song-item';
import { newSongTag  } from './song-tag';
import SongComponent from './SongComponent.vue';
import AddSongModal from './AddSongModal.vue';

  export default defineComponent({
    name: "MusicPage",
    setup() {
      const funny = ref(newSongTag("funny", "primary",0));
      const meme = ref(newSongTag("meme", "danger",1));
      const shrek = ref(newSongTag("shrek", "warning",2));
      const pop = ref(newSongTag("pop", "secondary",3));
      const rap = ref(newSongTag("rap", "tertiary",4));
      const classicRock = ref(newSongTag("classic rock", "green",5));
      const sad = ref(newSongTag("sad", "dark",6));
      const songs = ref([
      newSongItem("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Never Gonna Give You Up", [funny.value, meme.value, classicRock.value], 0),
      newSongItem("https://www.youtube.com/watch?v=L_jWHffIx5E", "All Star", [funny.value, pop.value, meme.value, shrek.value], 1),
      newSongItem("https://www.youtube.com/watch?v=SQCSxqScSVQ","Gangsters Paradise",[rap.value, sad.value, meme.value],2),
      ]);

      return {
        songs,
        pageName: "Music",
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
    },
})
</script>
