import { createRouter, createWebHistory } from "@ionic/vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/categories",
  },
  {
    path: "/categories",
    component: Home,
  },
  {
    path: "/:category/:id",
    component: () => import("../pages/CategoryDetails.vue"),
  },
  {
    path: "/:id",
    component: () => import("../pages/CategoryDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
