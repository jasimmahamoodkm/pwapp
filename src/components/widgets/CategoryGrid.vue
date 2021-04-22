<template>
  <ion-fab vertical="top" horizontal="end">
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
        :router-link="`/${category.catid}`"
      >
        <IonCard v-if="category.parent == ''">
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
  modalController,
  IonText,
} from "@ionic/vue";

import { mapGetters, mapActions } from "vuex";
import addCategoryModal from "../modals/addCategoryModal";
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
    IonText,
    Slider,
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: addCategoryModal,
        cssClass: "my-custom-class",
      });
      return modal.present();
    },
    ...mapActions("category", {
      addCategory: "addCategory",
    }),
  },
  computed: {
    ...mapGetters("category", { categories: "allCategories" }),
  },
  mounted() {
    var storage = this.$fire_base.storage;
    var storageRef = storage.ref();
    this.$fire_base.db.collection("categories").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          var dat = change.doc.data();
          var catId = change.doc.id;
          var tangRef = storageRef.child(dat.image);
          tangRef.getDownloadURL().then((url) => {
            var newDat = {
              name: dat.name,
              desc: dat.desc,
              catid: catId,
              image: url,
              parent: dat.parent,
            };
            this.addCategory(newDat);
          });
        }
      });
    });
  },
};
</script>
