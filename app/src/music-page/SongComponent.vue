<template>
    <ion-item>
        <ion-item :href="song.url">{{song.name}}</ion-item>
        <ion-list v-for="(tag, index) in song.tags" :key="index">
            <ion-chip color="danger">{{tag}} </ion-chip>
        </ion-list>
        <ion-button slot="end" fill="clear" color="danger" size="default" @click="removeSong">
            <ion-icon :icon="trashIcon"></ion-icon>
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
        const trashIcon: string = "https://unpkg.com/ionicons@5.5.2/dist/svg/trash-sharp.svg";

        return {
            trashIcon,
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
        }
    },
})
</script>