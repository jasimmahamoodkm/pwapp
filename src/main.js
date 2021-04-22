import { createApp } from "vue";
import App from "./App.vue";
import BaseLayout from "./components/layouts/BaseLayout.vue";
import router from "./router";
import store from "./store";
import fire_base from "./fire_base";

import { IonicVue } from "@ionic/vue";

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

const formatString = (string) => {
  return string.includes("ios")
    ? string
        .replace(/ios/, "")
        .match(/[A-Z][a-z]+/g)
        .join("-")
        .toLowerCase()
    : string.includes("md")
    ? string
        .replace(/md/, "icons")
        .match(/[A-Z][a-z]+/g)
        .join("-")
        .toLowerCase()
    : "";
};

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";

const currentIcons = Object.keys(allIcons).map((i) => {
  return {
    ["ios-" + formatString(i)]: allIcons[i],
    ["md-" + formatString(i)]: allIcons[i],
  };
});
const iconsObject = Object.assign({}, ...currentIcons);
addIcons(iconsObject);

/* Theme variables */
import "./theme/variables.css";
import "./theme/style.css";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(fire_base)
  .use(store);

app.component("base-layout", BaseLayout);

router.isReady().then(() => {
  app.mount("#app");
});
