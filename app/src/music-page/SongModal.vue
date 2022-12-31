<template>
    <ion-content>
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title>Add Song</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-item>
            <ion-item>URL</ion-item>
            <ion-input type="url" :value="url" v-model="url" @keydown.enter="submit"/>
        </ion-item>
        <ion-item>
            <ion-item>Name</ion-item> 
            <ion-input :value="name" v-model="name" @keydown.enter="submit"/>
        </ion-item>
        <ion-item>
            <ion-item>Artist</ion-item>
            <ion-input placeholder="Optional" :value="artist" v-model="artist" @keydown.enter="submit" />
        </ion-item>
        <ion-item v-for="(tag, index) in tags" :key="index" >
            <ion-item>Tag</ion-item>
            <ion-input placeholder="Optional" :value="tags[index]" :v-model="tag" :key="index" />
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
import { SaveSystem } from "../save-system/save-system";
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
    setup() {
        const icons = new Icons;
        const saveSystem = new SaveSystem();
        return {
            url: "",
            name: "",
            artist: "",
            tags: [""],
            icons,
            saveSystem,
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
        IonFabButton,
        IonButton,
        IonIcon,
    },
    created() {
        if(typeof this.song !== 'undefined') {
                this.url = this.song.url;
                this.name = this.song.name;
                this.artist = this.song.name;
                this.tags = this.song.tags;
            }
        },
    props: {
        song: {type: Object as () => SongItem, required: false},
        },
    methods: {
        addNewTag() {
            console.log("Adding Tag")
            this.tags.push("");
        },
        submit() {
            alert(this.tags[0] + " " + this.tags[1]);
            const protocol = "https://";
            if(this.tags.length < 1 || this.url === "" || this.name === "") {
                alert("failed");
                return;
            }
            if(this.url.slice(0, protocol.length) !== protocol) {
                this.url = protocol + this.url;
            }
            let song: SongItem = new SongItem(this.url,this.name,this.artist,this.tags);
            if(typeof this.song !== 'undefined') {
                song = this.song;
            }
            this.saveSystem.replaceSong(new SongItem(this.url,this.name,this.artist,this.tags),song);
            this.$emit('dismissed',song);
        },
    }
})
</script>
