<template>
  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button v-on:click="openModal">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
  <ion-text color="primary ion-text-center">
    <h2>Categories</h2>
  </ion-text>
  <Slider />
  <ion-grid>
    <ion-row>
      <ion-col
        v-for="category in categories"
        :key="category.id"
        :router-link="`/categories/${category.name}`"
      >
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
} from "@ionic/vue";

import Modal from "../widgets/Modal";
import Slider from "../widgets/Slider";

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
    Slider,
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
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
  mounted() {
    var storage = this.$fire_base.storage;
    var storageRef = storage.ref();
    this.$fire_base.db.collection("categories").onSnapshot((snapshot) => {
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
            this.$store.commit("add", newDat);
          });
        }
      });
    });
  },
};
</script>
