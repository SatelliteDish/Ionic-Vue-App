<template>
  <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title slot="primary">D&D App</ion-title> <ion-title> Test</ion-title>
        <ion-title slot="secondary"></ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
  export default defineComponent({
  name: "PageHeader",
  setup() {
    return {}
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
  },
})
</script>

<style scoped>
</style>