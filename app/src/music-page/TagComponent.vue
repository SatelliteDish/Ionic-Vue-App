<template>
  <ion-item>
    <ion-chip :style="cssVars">{{ tag.name }}</ion-chip>
  </ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SongTag } from './song-tag';
import { IonItem, IonChip } from '@ionic/vue';

export default defineComponent({
   name: "TagComponent",
    components: {
      IonItem,
      IonChip,
    },
    props: {
      tag: {type: Object as () => SongTag, required: true},  
    },
    computed: {
      cssVars() {
        return {
          "--bg-color": this.tag.color,
        }
      }
    },
})
</script>

<style scoped>
  ion-chip {
    --background: var(--bg-color)
  }

</style>
