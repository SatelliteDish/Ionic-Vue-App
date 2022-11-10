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
            <ion-input placeholder="test" @ion-input="test" />
        </ion-item>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent,
         IonInput,
         IonItem,
         IonHeader,
         IonToolbar,
         IonTitle,
        } from '@ionic/vue';

export default defineComponent({ 
    name: "AddSongModal",
    setup() {
        return {
            url: "",
        }
    },
    components: {
        IonContent,
        IonInput,
        IonItem,
        IonHeader,
        IonToolbar,
        IonTitle,
    },
    methods: {
        test(event: Event) {
            alert(this.url);
        }
    }
})
</script>
