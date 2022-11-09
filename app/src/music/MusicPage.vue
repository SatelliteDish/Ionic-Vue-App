<template>
  <ion-content>
    <ion-button @click="test" id="open-modal">
      <ion-icon icon="add-icon-outline"></ion-icon>
    </ion-button>
    <ion-modal trigger="open-modal">
    </ion-modal>
  </ion-content>
</template>

<script lang="ts">
import PageHeader from "../components/PageHeader.vue";
import { defineComponent } from "vue";
import { IonContent,
         IonFab,
         IonFabButton, 
         IonIcon, 
         IonModal, 
         IonButton
          } from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  "add-icon-outline": addCircleOutline,
});

export default defineComponent({
    name: "MusicPage",
    props: {
      theme: String,
    },
    setup() {
       return {
          
       } 
    },
    data() {
      return {};
    },
    components: {
        PageHeader,
        IonContent,
        IonFab,
        IonFabButton,
        IonIcon,
        IonModal,
        IonButton
    },
    methods: {
      test() {
        alert("success")
      }
    },
})
</script>