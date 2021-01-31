import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import viewClip from '../views/View_Clip.vue';

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component() {
      return import(/* webpackChunkName: "about" */ '../views/New_Clip.vue');
    },
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
