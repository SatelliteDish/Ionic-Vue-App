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
import { IonItem, IonList, IonChip } from '@ionic/vue';
import { SongItem } from './song-item';

export default defineComponent({
    name: "SongComponent",
    props: {
        song: {type: Object as () => SongItem, required: true},
    },
    mounted() {
        console.log("MOUNTED COMPONENT OF TYPE " + this.song.name);
    },
    components: {
        IonItem,
        IonList,
        IonChip,
    },
})
</script>