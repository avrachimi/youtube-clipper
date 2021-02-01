import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import viewClip from '../views/View_Clip.vue';
import newClip from '../views/New_Clip.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/new-clip',
    name: 'New Clip',
    component: newClip,
  },
  {
    path: '/view-clip',
    name: 'View Clip',
    component: viewClip,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
