<template>
    <ion-content>
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title>Add Song</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-item>
            <ion-item>URL</ion-item>
            <ion-input type="url" :value="song.url" v-model="newSong.url" @keydown.enter="submit"/>
        </ion-item>
        <ion-item>
            <ion-item>Name</ion-item> 
            <ion-input :value="song.name" v-model="newSong.name" @keydown.enter="submit"/>
        </ion-item>
        <ion-item>
            <ion-item>Artist</ion-item>
            <ion-input placeholder="Optional" :value="song.artist" v-model="newSong.artist" @keydown.enter="submit" />
        </ion-item>
        <ion-item v-for="(tag, index) in song.tags" :key="index" >
            <ion-item>Tag</ion-item>
            <ion-input placeholder="Optional" :value="song.tags[index]" :v-model="tag" :key="index" @keydown.enter="submit" />
        </ion-item>
                <ion-item lines="none" >
            <ion-button slot="end" @click="addNewTag">
                <ion-icon :icon="icons.plusWithCircle" />
            </ion-button>
            <ion-button slot="end">
                <ion-icon :icon="icons.minusWithCirlce" />
            </ion-button>
        </ion-item>
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
            <ion-fab-button @click="submit">Submit</ion-fab-button>
        </ion-fab>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icons } from "../common/icons"
import { IonContent,
         IonInput,
         IonItem,
         IonHeader,
         IonToolbar,
         IonTitle,
         IonFab,
         IonFabButton,
         IonButton,
         IonIcon,
        } from '@ionic/vue';
import { SongItem } from './song-item';

export default defineComponent({ 
    name: "SongModal",
    props: {
        song: {type: Object as () => SongItem, required: true},
        },
    setup() {
        const newSong = new SongItem("","","",[""]);
        const icons = new Icons;
        return {
            icons,
            newSong,
        }
    },
    mounted() {
        this.newSong.url = this.song.url;
        this.newSong.name = this.song.name;
        this.newSong.artist = this.song.artist;
        this.newSong.tags = this.song.tags;
    },
    components: {
        IonContent,
        IonInput,
        IonItem,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonFab,
        IonFabButton,
        IonButton,
        IonIcon,
    },
    methods: {
        addNewTag() {
            this.newSong.tags.push("");
        },
        submit() {
            //TODO: Break this out to be more reusable
            const protocol = "https://";
            try{
                if(this.newSong.tags.length < 1 || this.newSong.url === "" || this.newSong.name === "") {
                    alert("failed");
                    return;
                }
            } catch (e: any) {
                console.error(e);
            }
            if(this.newSong.url.slice(0, protocol.length) !== protocol) {
                this.newSong.url = protocol + this.newSong.url;
            }
            this.$emit('dismissed',this.newSong);
        },
    }
})
</script>
