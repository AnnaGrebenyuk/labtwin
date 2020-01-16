import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
