import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import AddNurse from './components/AddNurse.vue';
import UpdateNurse from './components/UpdateNurse.vue';

const routes = [
  {
    name: 'Home',
    component: Home,
    path: '/',
  },
  {
    name: 'SignUp',
    component: SignUp,
    path: '/signup',
  },
  {
    name: 'Login',
    component: Login,
    path: '/login',
  },
  {
    name: 'AddNurse',
    component: AddNurse,
    path: '/addnurse',
  },
  {
    name: 'updateNurse',
    component: UpdateNurse,
    path: '/updatenurse/:id',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
