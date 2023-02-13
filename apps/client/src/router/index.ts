import { useUserStore } from "@/store/user.store";
import { AxiosError } from "axios";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "chat",
    component: () => import("../views/chat-page.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login-page.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/profile-page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.user.isLoggedIn && to.name !== "login") {
    return next("/login");
  }
  if (userStore.user.isLoggedIn && to.name == "login") return next("/");
  next();
});

export default router;
