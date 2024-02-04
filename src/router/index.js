import { createRouter, createWebHistory } from "vue-router";
import signIn from "../views/signIn.vue";
import register from "../views/register.vue";
import feed from "../views/feed.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "signIn",
      component: signIn,
    },
    {
      path: "/register",
      name: "register",
      component: register,
    },
    {
      path: "/feed",
      name: "feed",
      component: feed,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you dont have access");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
