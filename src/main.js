import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import firebase from "firebase/app";
import "firebase/firestore";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/style.css";
import BaseLayout from "./components/layouts/BaseLayout.vue";

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.component("base-layout", BaseLayout);

router.isReady().then(() => {
  app.mount("#app");
});

var firebaseConfig = {
  apiKey: "AIzaSyD254h8MK7B1YFZfEYXzgfwhhOq5qMJLnM",
  authDomain: "marine-store.firebaseapp.com",
  projectId: "marine-store",
  storageBucket: "marine-store.appspot.com",
  messagingSenderId: "937230213786",
  appId: "1:937230213786:web:e6c2ab1938689c95f37523",
  measurementId: "G-RG2GQXG2W6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// db.collection("categories").onSnapshot((snapshot) => {
//   data = [];
//   snapshot.docChanges().forEach((change) => {
//     data.push(change.doc.data());
//     /*if (change.type === "added") {
//     } else if (change.type === "removed") {
//     }*/
//   });
// });
