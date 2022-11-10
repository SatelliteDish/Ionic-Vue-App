<template>
    <ion-item>
        <ion-item :href="song.url">{{song.name}}</ion-item>
        <ion-list v-for="tag in song.tags" :key="tag.id">
            <ion-chip :color="tag.color">{{tag.name}} </ion-chip>
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

<style scoped>
ion-content {
    background-color: green;
}
h1 {
    color: yellow;
}
</style>