<template>
    <ion-content>
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title>Add Song</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-item>
            <ion-input placeholder="Please Enter a URL" type="url" v-model="url"/>
        </ion-item>
        <ion-item>
            <ion-input placeholder="Please Enter a Name" v-model="name"/>
        </ion-item>
        <ion-item>
            <ion-input placeholder="Please Enter your Tags Seperated by Commas" v-model="tags"/>
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
            const tagArray = this.tags.split(',');
            if(tagArray.length < 1 || this.url === "" || this.name === "") {
                alert("failed");
            }
            else {
                const song: SongItem = {
                    url: this.url,
                    name: this.name,
                    tags: tagArray,
                    id: 0,
                }
                saveSong(song);
            }
        },
    }
})
</script>
