import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PruebaView from "../views/PruebaView.vue";
import BlogView from "../views/BlogView.vue";
import UserEdit from "@/components/UserEdit.vue";



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/prueba",
    name: "prueba",
    component: PruebaView,
  },
   {
    path: "/blog",
    name: "blog",
    component: BlogView,
  },
  {
  path: '/usuarios/editar/:id',
  name: 'UserEdit',
  component: () => import('@/components/UserEdit.vue'),
},
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
