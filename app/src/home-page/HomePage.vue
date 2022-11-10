<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{pageName}}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{pageName}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-for="page in pages" :key="page.id">
        <ion-button :router-link="page.route" expand="block" size="large">
          <ion-icon :icon="page.icon" slot="start"></ion-icon>
          {{ page.name }} 
        </ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonButton,
    IonIcon,
  },
  setup() {
    const pages = ref([
      {
        route: "/music",
        name: "Music",
        icon: "https://unpkg.com/ionicons@5.5.2/dist/svg/musical-notes-sharp.svg",
        id: 0,
      },
    ]);

    return {
      pageName: "Home",
      pages,
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
