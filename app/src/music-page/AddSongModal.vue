<template>
    <ion-content>
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title>Add Song</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-item>
            <ion-input placeholder="Please Enter a URL" type="url" v-model="url" @keydown.enter="submit"/>
        </ion-item>
        <ion-item>
            <ion-input placeholder="Please Enter a Name" v-model="name" @keydown.enter="submit"/>
        </ion-item>
        <ion-item>
            <ion-input placeholder="Artist (Optional)" v-model="artist" @keydown.enter="submit" />
        </ion-item>
        <ion-item>
            <ion-input placeholder="Please Enter your Tags Seperated by Commas" v-model="tags" @keydown.enter="submit"/>
        </ion-item>

        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
            <ion-fab-button @click="submit">Submit</ion-fab-button>
        </ion-fab>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { saveSong } from "../save-system/save-system";
import { IonContent,
         IonInput,
         IonItem,
         IonHeader,
         IonToolbar,
         IonTitle,
         IonFab,
         IonFabButton,
        } from '@ionic/vue';
import { SongItem } from './song-item';

export default defineComponent({ 
    name: "AddSongModal",
    setup() {
        return {
            url: "",
            name: "",
            artist: "",
            tags: "",
        }
    },
    components: {
        IonContent,
        IonInput,
        IonItem,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonFab,
        IonFabButton
    },
    methods: {
        submit() {
            const protocol = "https://";
            const tagArray: string[] = this.tags.split(',');
            if(tagArray.length < 1 || this.url === "" || this.name === "") {
                alert("failed");
                return;
            }
            if(this.url.slice(0, protocol.length) !== protocol) {
                this.url = protocol + this.url;
            }
            
            const song: SongItem = new SongItem(this.url,this.name,this.artist,tagArray);
            saveSong(song);
            this.$emit('dismissed',song);
        },
    }
})
</script>
