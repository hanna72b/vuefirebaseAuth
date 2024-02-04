<template>
  <nav class="navbar navbar-expand-lg bg-dark text-white">
    <div class="container-fluid align-items-center">
      <RouterLink class="navbar-brand text-white" to="/"
        >Welcome to Vue3</RouterLink
      >
      <button
        style="background-color: #fff"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse marginLeft justify-content-end"
        id="navbarText"
      >
        <ul class="d-flex align-items-center list-unstyled mb-2 mb-lg-0">
          <li v-if="isLoggedIn"  class="">
            <RouterLink
              class="mR12 nav-link"
              :class="$route.name == 'feed' ? 'active' : ''"
              to="/feed"
              >feed</RouterLink
            >
          </li>

          <li class="">
            <RouterLink
              class="mR12 nav-link"
              :class="$route.name == 'signIn' ? 'active' : ''"
              to="/"
              >signIn</RouterLink
            >
          </li>

          <li class="">
            <RouterLink
              class="mR12 nav-link"
              :class="$route.name == 'register' ? 'active' : ''"
              to="/register"
              >register</RouterLink
            >
          </li>

          <li v-if="isLoggedIn" class="">
            <button class="mR12 nav-link" @click="handleSignOut()">
              sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { confirmPasswordReset, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const userToken = ref("");

const isLoggedIn = ref(false);
let auth;
onMounted(async () => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });

  userToken.value = localStorage.getItem("token");
  console.log(userToken.value);
});

const handleSignOut = () => {
  if(confirm("do you want to log out of your account?")){
    signOut(auth).then(() => {
    router.push("/");
  });
  }

 
};
</script>

<style>
.active {
  color: #0d6efd !important;
}

.marginLeft {
  margin-left: 25px;
}
.mL12 {
  margin-left: 12px;
}

.mR12 {
  margin-right: 12px;
}
</style>
