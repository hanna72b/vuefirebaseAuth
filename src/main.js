import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_jaiQHdvEDvs6Sd1tSSvXmjb4shPtrTU",
  authDomain: "vue3authfirebase.firebaseapp.com",
  projectId: "vue3authfirebase",
  storageBucket: "vue3authfirebase.appspot.com",
  messagingSenderId: "746008853432",
  appId: "1:746008853432:web:d5f65cb261754258b92d4d"
};

 initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
