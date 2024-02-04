<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <h2 class="mb-5">signIn Page__with VPN</h2>

    <form
      class="w-100 mt-4 d-flex flex-column justify-content-center align-items-center"
    >
      <div
        class="form-group mt-3 w-50 d-flex flex-column justify-content-center align-items-start"
      >
        <label>email:</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="email"
        />
      </div>

      <div
        class="form-group mt-3 w-50 d-flex flex-column justify-content-center align-items-start"
      >
        <label>Password:</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password "
        />
      </div>

      <p v-if="errorMsg">{{ errorMsg }}</p>

      <div
        class="w-50 d-flex flex-column justify-content-center align-items-start"
      >
        <button
          @click.prevent="signIn()"
          v-if="!loading"
          type="submit"
          class="btn btn-block btn-primary mt-3 w-100"
        >
          Submit
        </button>
        <div v-if="loading" class="mt-3">Loading . . .</div>
      </div>

      <div
        class="w-50 d-flex flex-column justify-content-center align-items-start"
      >
        <button
          @click.prevent="signInWithGoogle()"
          class="btn btn-block btn-primary mt-3 w-100"
        >
          sign in with google
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loading = ref(false);

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMsg = ref();

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successFully signed in!");
      router.push("/feed");
    })
    .catch((error) => {
      console.log("firebase error::", error);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMsg.value = "no account with that email was found";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Incorrect password";
          break;

        default:
          errorMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>
