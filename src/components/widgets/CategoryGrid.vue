<template>
  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button v-on:click="openModal">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <ion-text color="primary ion-text-center">
    <h2>Categories</h2>
  </ion-text>
  <ion-slides pager="true" :options="slideOpts">
    <ion-slide>
      <h1>Slide 1</h1>
    </ion-slide>
    <ion-slide>
      <h1>Slide 2</h1>
    </ion-slide>
    <ion-slide>
      <h1>Slide 3</h1>
    </ion-slide>
  </ion-slides>
  <ion-grid>
    <ion-row>
      <ion-col v-for="category in categories" :key="category.id">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{{ category.name }}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <img :src="category.image" />
          </IonCardContent>
        </IonCard>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script>
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonIcon,
  modalController,
  IonText,
  IonSlides,
  IonSlide,
} from "@ionic/vue";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import Modal from "../widgets/Modal";

export default {
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonText,
    IonSlides,
    IonSlide,
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: Modal,
        cssClass: "my-custom-class",
        componentProps: {
          title: "Add Category",
        },
      });
      return modal.present();
    },
  },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 1,
      speed: 400,
    };
    return { slideOpts };
  },
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    const db = firebase.firestore();
    const storage = firebase.storage();
    var storageRef = storage.ref();
    db.collection("categories").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          var dat = change.doc.data();
          var tangRef = storageRef.child(dat.image);
          tangRef.getDownloadURL().then((url) => {
            var newDat = {
              name: dat.name,
              desc: dat.desc,
              image: url,
            };
            this.categories.push(newDat);
          });
        }
      });
    });
  },
};
</script>
