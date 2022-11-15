<template>
    <ion-item>
        <ion-item :href="song.url">{{song.name}}</ion-item>
        <ion-list v-for="(tag, index) in song.tags" :key="index">
            <ion-chip color="danger">{{tag}} </ion-chip>
        </ion-list>
    </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonItem, IonList, IonChip } from '@ionic/vue';
import { SongItem } from './song-item';

export default defineComponent({
    name: "SongComponent",
    props: {
        song: {type: Object as () => SongItem, required: true},
    },
    setup() {
        
    },
    components: {
        IonContent,
        IonItem,
        IonList,
        IonChip,
    },
})
</script>