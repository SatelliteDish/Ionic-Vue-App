<template>
    <ion-item>
        <ion-item :href="song.url">{{song.name}}</ion-item>
        <ion-item v-if="song.artist !== ''" >{{song.artist}}</ion-item>
        <ion-list v-for="(tag, index) in song.tags" :key="index">
            <ion-chip color="danger">{{tag}} </ion-chip>
        </ion-list>
        <ion-button slot="end" fill="clear" size="small" @click="editSong" >
            <ion-icon :icon="editIcon" size="large" />
        </ion-button>
        <ion-button slot="end" fill="clear" color="danger" size="small" @click="removeSong">
            <ion-icon :icon="trashIcon" size="large" />
        </ion-button>
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonItem, IonList, IonChip, IonButton, IonIcon } from '@ionic/vue';
import { SongItem } from './song-item';

export default defineComponent({
    name: "SongComponent",
    setup() {
        const trashIcon = "https://unpkg.com/ionicons@5.5.2/dist/svg/trash-sharp.svg";
        const editIcon = "https://unpkg.com/ionicons@5.5.2/dist/svg/pencil-outline.svg";
        return {
            trashIcon,
            editIcon,
        }
    },
    props: {
        song: {type: Object as () => SongItem, required: true},
    },
    components: {
        IonItem,
        IonList,
        IonChip,
        IonButton,
        IonIcon,
    },
    methods: {
        removeSong() {
            this.$emit('removeSong', this.song);
        },
        editSong() {
            this.$emit('editSong', this.song);
        }
    },
})
</script>