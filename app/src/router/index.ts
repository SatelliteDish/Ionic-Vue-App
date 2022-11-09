import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import  MusicPage  from '../music/MusicPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/music',
  },
  {
    path: '/music',
    component: MusicPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
